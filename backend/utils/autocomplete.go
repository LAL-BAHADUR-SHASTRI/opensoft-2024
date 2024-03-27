package utils

import (
	"context"
	"sort"

	openai "github.com/sashabaranov/go-openai"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

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



func SemanticSearch(collection *mongo.Collection, userQuery string) ([]string, error) {
	client := getOpenAIClient()

	// Generate embeddings for the user query
	queryReq := openai.EmbeddingRequest{
		Input: []string{userQuery},
		Model: openai.AdaEmbeddingV2,
	}
	queryResponse, err := client.CreateEmbeddings(context.Background(), queryReq)
	if err != nil {
		return nil, err
	}

	// Perform text search to get initial set of documents
	initialResults, err := FuzzySearch(collection, userQuery)
	if err != nil {
		return nil, err
	}

	// Generate embeddings for the documents returned from the initial search
	targetReq := openai.EmbeddingRequest{
		Input: initialResults,
		Model: openai.AdaEmbeddingV2,
	}
	targetResponse, err := client.CreateEmbeddings(context.Background(), targetReq)
	if err != nil {
		return nil, err
	}

	// Compute similarity scores between user query and each document
	queryEmbedding := queryResponse.Data[0]
	var scoredResults []struct {
		Title     string
		Similarity float64
	}
	for i, embedding := range targetResponse.Data {
		similarity, err := queryEmbedding.DotProduct(&embedding)
		if err != nil {
			return nil, err
		}
		scoredResults = append(scoredResults, struct {
			Title     string
			Similarity float64
		}{
			Title:     initialResults[i],
			Similarity: float64(similarity),
		})
	}

	// Sort results by similarity score
	sort.Slice(scoredResults, func(i, j int) bool {
		return scoredResults[i].Similarity > scoredResults[j].Similarity
	})

	// Extract and return sorted titles
	var sortedTitles []string
	for _, result := range scoredResults {
		sortedTitles = append(sortedTitles, result.Title)
	}

	return sortedTitles, nil
}

// func SemanticSearch(collection *mongo.Collection, userQuery string) ([]string, error) {
// 	client := getOpenAIClient()

// 	// Generate an embedding for the user query
// 	queryReq := openai.EmbeddingRequest{
// 		Input: []string{userQuery},
// 		Model: openai.AdaEmbeddingV2,
// 	}
// 	queryResponse, err := client.CreateEmbeddings(context.Background(), queryReq)
// 	if err != nil {
// 		log.Fatal("Error creating query embedding:", err)
// 		return nil, err
// 	}

// 	// Assuming queryResponse.Data[0].Embedding contains the embedding vector
// 	queryEmbedding := queryResponse.Data[0].Embedding

// 	// Construct the MongoDB aggregation pipeline using $search with the vector operator
// 	searchStage := bson.D{
// 		{"$search", bson.D{
// 			{"vector", bson.D{
// 				{"query", bson.D{{"vector", queryEmbedding}}},
// 				{"path", "plot_embedding"},
// 				{"numCandidates", 100},
// 				{"limit", 5},
// 				{"score", bson.M{"boost": bson.M{"value": 1}}},
// 			}},
// 		}},
// 	}

// 	// Execute the search
// 	cursor, err := collection.Aggregate(context.Background(), mongo.Pipeline{searchStage})
// 	if err != nil {
// 		log.Fatal("Error executing search:", err)
// 		return nil, err
// 	}
// 	defer cursor.Close(context.Background())

// 	// Process the search results
// 	var results []string
// 	for cursor.Next(context.Background()) {
// 		var doc bson.M
// 		err := cursor.Decode(&doc)
// 		if err != nil {
// 			log.Fatal("Error decoding document:", err)
// 			return nil, err
// 		}

// 		// Assuming the document contains a "title" field that you want to return
// 		if title, ok := doc["title"].(string); ok {
// 			results = append(results, title)
// 		}
// 	}

// 	if err := cursor.Err(); err != nil {
// 		log.Fatal("Error with cursor:", err)
// 		return nil, err
// 	}

// 	return results, nil
// }

// // func generateEmbedding(text string) ([]float32, error) {
// // 	client := getOpenAIClient()
// // 	response, err := client.CreateEmbeddings(context.Background(), openai.EmbeddingRequest{
// // 		Model: "text-embedding-ada-002",
// // 		Input: text,
// // 	})
// // 	if err != nil {
// // 		return nil, err
// // 	}
// // 	// Adjust this line according to the actual structure of the response
// // 	embedding, ok := response.Data[0]["embedding"].([]float32)
// // 	if !ok {
// // 		return nil, fmt.Errorf("embedding format is incorrect or missing in the response")
// // 	}

// // 	return embedding, nil
// // }

// // func SemanticSearch(collection *mongo.Collection, userQuery string) ([]bson.M, error) {
// // 	// Generate embeddings for the user query
// // 	queryEmbedding, err := generateEmbedding(userQuery)
// // 	if err != nil {
// // 		return nil, fmt.Errorf("error generating query embedding: %w", err)
// // 	}

// // 	// Perform the search using MongoDB's $vectorSearch
// // 	pipeline := mongo.Pipeline{
// // 		{"$vectorSearch", bson.M{
// // 			"queryVector": queryEmbedding,
// // 			"path":        "plot_embedding",
// // 			"numCandidates": 100,
// // 			"limit":         4,
// // 			"index":         "PlotSemanticSearch",
// // 		}},
// // 	}

// // 	cursor, err := collection.Aggregate(context.Background(), pipeline)
// // 	if err != nil {
// // 		return nil, fmt.Errorf("error executing search: %w", err)
// // 	}
// // 	defer cursor.Close(context.Background())

// // 	var results []bson.M
// // 	if err = cursor.All(context.Background(), &results); err != nil {
// // 		return nil, fmt.Errorf("error fetching search results: %w", err)
// // 	}

// // 	return results, nil
// // }