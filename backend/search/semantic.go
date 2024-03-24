package search

import (
	"fmt"
	"os"

	openai "github.com/openai/openai-go/v1"
)

func main() {
	apiKey := os.Getenv("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")
	openai.SetAuth(apiKey)

	params := &openai.EmbeddingCreateRequest{
		Input: "Educative answers section is helpful",
		// can be letter changed according to the recieved string
		Model: "text-embedding-ada-002",
	}

	response, err := openai.CreateEmbedding(params)
	if err != nil {
		fmt.Println("Error:", err)
		return
	}

	fmt.Println(response)
}
