package utils

import (
	"context"
	"encoding/json"
	"os"

	// "fmt"

	openai "github.com/sashabaranov/go-openai"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

// getOpenAIClient returns a new client for OpenAI's API using the provided secret key.
func getOpenAIClient() *openai.Client {
	return openai.NewClient(os.Getenv("OPENAI_KEY"))
}

// AutocompleteSearch performs a MongoDB text search on the 'title' field.
func AutocompleteSearch(collection *mongo.Collection, searchTerm string) ([]bson.M, error) {
	searchStage := bson.D{{"$search", bson.D{{"autocomplete", bson.D{{"query", searchTerm}, {"path", "title"}}}}}}

	return runSearch(collection, searchStage)
}

// FuzzySearch performs a MongoDB fuzzy text search on the 'title' field.
func FuzzySearch(collection *mongo.Collection, searchTerm string) ([]bson.M, error) {
	searchStage := bson.D{
		{"$search", bson.D{
			{"text", bson.D{
				{"query", searchTerm},
				{"path", "title"},

				{"fuzzy", bson.D{
					{"maxEdits", 2},
					{"prefixLength", 3},
				}},
			}},
		}},
	}

	return runSearch(collection, searchStage)
}

func SemanticSearch(collection *mongo.Collection, searchTerm string) ([]bson.M, error) {
	embedding, err := generateEmbedding(searchTerm)
	if err != nil {
		return nil, err
	}

	// fmt.Println("Generated embedding:", embedding)
	// fmt.Println("Embedding length:", len(embedding))

	searchStage := bson.D{
		{"$vectorSearch", bson.D{
			{"queryVector", embedding},
			{"path", "plot_embedding"},
			{"numCandidates", 100},
			{"limit", 50},
			{"index", "PlotSemanticSeach"},
		}},
	}
	return runSearch(collection, searchStage)
}

var projectOpts = bson.D{{"title", 1}, {"imdb.rating", 1}, {"_id", 1}, {"poster", 1}, {"runtime", 1}}

// runSearch executes the MongoDB aggregation pipeline and returns the search results.
func runSearch(collection *mongo.Collection, searchStage bson.D) ([]bson.M, error) {
	projectStage := bson.D{{"$project", projectOpts}}
	limitStage := bson.D{{"$limit", 10}}

	cursor, err := collection.Aggregate(context.TODO(), mongo.Pipeline{searchStage, limitStage, projectStage})
	if err != nil {
		return nil, err
	}
	defer cursor.Close(context.Background())

	// var titles []string
	var movies []bson.M
	for cursor.Next(context.Background()) {
		var result bson.M
		if err := cursor.Decode(&result); err != nil {
			return nil, err
		}
		movies = append(movies, result)
	}

	if err := cursor.Err(); err != nil {
		return nil, err
	}

	return movies, nil
}

// generateEmbedding generates the embedding of the given text using OpenAI's API.
func generateEmbedding(text string) ([]float32, error) {
	client := getOpenAIClient()
	response, err := client.CreateEmbeddings(context.Background(), openai.EmbeddingRequest{
		Model: "text-embedding-ada-002",

		Input: text,
	})
	if err != nil {
		return nil, err
	}

	responseBytes, err := json.Marshal(response)
	if err != nil {
		return nil, err
	}

	var jsonResponse struct {
		Embeddings []struct {
			Embedding []float32 `json:"embedding"`
		} `json:"data"`
	}
	err = json.Unmarshal(responseBytes, &jsonResponse)
	if err != nil {
		return nil, err
	}

	if len(jsonResponse.Embeddings) == 0 {
		return nil, err
	}

	embedding := jsonResponse.Embeddings[0].Embedding
	return embedding, nil
}
