package utils

import (
	"context"
	"encoding/json"
	"fmt"

	"opensoft_2024/database"

	openai "github.com/sashabaranov/go-openai"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)
var movieCollection *mongo.Collection = database.OpenCollection(database.Client, "embedded_movies")

func getOpenAIClient() *openai.Client {
	return openai.NewClient("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")
}


func AutocompleteSearch(collection *mongo.Collection, searchTerm string) ([]string, error) {
    searchStage := bson.D{
        {"$search", bson.D{
            {"text", bson.D{
                {"query", searchTerm},
                {"path", bson.A{"title"}},
            }},
        }},
    }

    return runSearch(collection, searchStage, searchTerm)
}

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

    return runSearch(collection, searchStage, searchTerm)
}

func runSearch(collection *mongo.Collection, searchStage bson.D, searchTerm string) ([]string, error) {
    limitStage := bson.D{{"$limit", 10}}
    projectStage := bson.D{{"$project", bson.D{{"title", 1}, {"_id", 0}}}}

    cursor, err := collection.Aggregate(context.TODO(), mongo.Pipeline{searchStage, limitStage, projectStage})
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



func generateEmbedding(text string) ([]float32, error) {
	client := getOpenAIClient()
	response, err := client.CreateEmbeddings(context.Background(), openai.EmbeddingRequest{
		Model: "text-embedding-ada-002",
		Input: text,
	})
	if err != nil {
		return nil, err
	}

	// Convert the response to JSON to inspect its structure
	responseBytes, err := json.Marshal(response)
	if err != nil {
		return nil, err
	}

	// Output the JSON for inspection
	// You can print or log the JSON response for debugging purposes
	// fmt.Println(string(responseBytes))

	// Unmarshal the JSON back to a struct to access the embedding
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



// SemanticSearch performs a semantic search in the MongoDB collection using the generated embedding.
func SemanticSearch(collection *mongo.Collection, query string) ([]bson.M, error) {
	embedding, err := generateEmbedding(query)
	if err != nil {
		return nil, err
	}
    fmt.Println(embedding)
    fmt.Println(len(embedding))
	// Prepare the $vectorSearch aggregation stage
	vectorSearchStage := bson.D{{
		"$vectorSearch", bson.D{
			{"queryVector", embedding},
			{"path", "plot_embedding"},
			{"numCandidates", 100},
			{"limit", 4},
			{"index", "PlotSemanticSearch"},
		},
	}}

	// Execute the aggregation pipeline
	cursor, err := collection.Aggregate(context.Background(), mongo.Pipeline{vectorSearchStage})
	if err != nil {
		return nil, fmt.Errorf("error executing vector search: %w", err)
	}
	defer cursor.Close(context.Background())

	var results []bson.M
	if err = cursor.All(context.Background(), &results); err != nil {
		return nil, fmt.Errorf("error fetching search results: %w", err)
	}

	return results, nil
}


// func SemanticSearch(collection *mongo.Collection, userQuery string) ([]string, error) {
// 	client := getOpenAIClient()

// 	// Generate embeddings for the user query
// 	queryReq := openai.EmbeddingRequest{
// 		Input: []string{userQuery},
// 		Model: openai.AdaEmbeddingV2,
// 	}
// 	queryResponse, err := client.CreateEmbeddings(context.Background(), queryReq)
// 	if err != nil {
// 		return nil, err
// 	}

// 	// Perform text search to get initial set of documents
// 	initialResults, err := FuzzySearch(collection, userQuery)
// 	if err != nil {
// 		return nil, err
// 	}

// 	// Generate embeddings for the documents returned from the initial search
// 	targetReq := openai.EmbeddingRequest{
// 		Input: initialResults,
// 		Model: openai.AdaEmbeddingV2,
// 	}
// 	targetResponse, err := client.CreateEmbeddings(context.Background(), targetReq)
// 	if err != nil {
// 		return nil, err
// 	}

// 	// Compute similarity scores between user query and each document
// 	queryEmbedding := queryResponse.Data[0]
// 	var scoredResults []struct {
// 		Title     string
// 		Similarity float64
// 	}
// 	for i, embedding := range targetResponse.Data {
// 		similarity, err := queryEmbedding.DotProduct(&embedding)
// 		if err != nil {
// 			return nil, err
// 		}
// 		scoredResults = append(scoredResults, struct {
// 			Title     string
// 			Similarity float64
// 		}{
// 			Title:     initialResults[i],
// 			Similarity: float64(similarity),
// 		})
// 	}

// 	// Sort results by similarity score
// 	sort.Slice(scoredResults, func(i, j int) bool {
// 		return scoredResults[i].Similarity > scoredResults[j].Similarity
// 	})

// 	// Extract and return sorted titles
// 	var sortedTitles []string
// 	for _, result := range scoredResults {
// 		sortedTitles = append(sortedTitles, result.Title)
// 	}

// 	return sortedTitles, nil
// }
