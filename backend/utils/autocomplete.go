package utils

import (
	"context"
	"encoding/json"
	// "fmt"

	openai "github.com/sashabaranov/go-openai"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

// getOpenAIClient returns a new client for OpenAI's API using the provided secret key.
func getOpenAIClient() *openai.Client {
	return openai.NewClient("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")
}

// AutocompleteSearch performs a MongoDB text search on the 'title' field.
func AutocompleteSearch(collection *mongo.Collection, searchTerm string) ([]string, error) {
	searchStage := bson.D{
		{"$search", bson.D{
			{"text", bson.D{
				{"query", searchTerm},
				{"path", bson.A{"title"}},
			}},
		}},
	}

	return runSearch(collection, searchStage)
}

// FuzzySearch performs a MongoDB fuzzy text search on the 'title' field.
func FuzzySearch(collection *mongo.Collection, searchTerm string) ([]string, error) {
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

func SemanticSearch(collection *mongo.Collection, searchTerm string) ([]string, error) {
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
			{"numCandidates",100},
			{"limit", 100},
			{"index","PlotSemanticSeach"},
		}},
	}
    return runSearch(collection, searchStage)
}

// runSearch executes the MongoDB aggregation pipeline and returns the search results.
func runSearch(collection *mongo.Collection, searchStage bson.D) ([]string, error) {
	projectStage := bson.D{{"$project", bson.D{{"title", 1}, {"_id", 0}}}}

	cursor, err := collection.Aggregate(context.TODO(), mongo.Pipeline{searchStage, projectStage})
	if err != nil {
		return nil, err
	}
	defer cursor.Close(context.Background())

	var titles []string
	for cursor.Next(context.Background()) {
		var result bson.D
		if err := cursor.Decode(&result); err != nil {
			return nil, err
		}
		if title, ok := result.Map()["title"]; ok {
			titles = append(titles, title.(string))
		}
	}

	if err := cursor.Err(); err != nil {
		return nil, err
	}

	return titles, nil
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
