// package main

// import (
// 	"context"
// 	"fmt"
// 	openai "github.com/sashabaranov/go-openai"
// )

// func main() {
// 	client := openai.NewClient("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")
// 	resp, err := client.CreateChatCompletion(
// 		context.Background(),
// 		openai.ChatCompletionRequest{
// 			Model: openai.GPT3Dot5Turbo,
// 			Messages: []openai.ChatCompletionMessage{
// 				{
// 					Role:    openai.ChatMessageRoleUser,
// 					Content: "how to take input of a sentence in golang",
// 				},
// 			},
// 		},
// 	)

// 	if err != nil {
// 		fmt.Printf("ChatCompletion error: %v\n", err)
// 		return
// 	}

// 	fmt.Println(resp.Choices[0].Message.Content)
// }

package search

import (
	"context"
	openai "github.com/sashabaranov/go-openai"
	"log"
)

func main() {
	client := openai.NewClient("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")

	// Create an EmbeddingRequest for the user query
	queryReq := openai.EmbeddingRequest{
		Input: []string{"How many chucks would a woodchuck chuck"},
		Model: openai.AdaEmbeddingV2,
	}

	// Create an embedding for the user query
	queryResponse, err := client.CreateEmbeddings(context.Background(), queryReq)
	if err != nil {
		log.Fatal("Error creating query embedding:", err)
	}
	// Create an EmbeddingRequest for the target text
	targetReq := openai.EmbeddingRequest{
		Input: []string{"How many chucks would a woodchuck chuck if the woodchuck could chuck wood"},
		Model: openai.AdaEmbeddingV2,
	}

	// Create an embedding for the target text
	targetResponse, err := client.CreateEmbeddings(context.Background(), targetReq)
	if err != nil {
		log.Fatal("Error creating target embedding:", err)
	}

	// Now that we have the embeddings for the user query and the target text, we
	// can calculate their similarity.
	queryEmbedding := queryResponse.Data[0]
	targetEmbedding := targetResponse.Data[0]
	log.Println(queryEmbedding)
	similarity, err := queryEmbedding.DotProduct(&targetEmbedding)
	if err != nil {
		log.Fatal("Error calculating dot product:", err)
	}

	log.Printf("The similarity score between the query and the target is %f", similarity)
}
