package routes

import (
	"log"
	"net/http"
	"opensoft_2024/database"
	"opensoft_2024/utils"

	// "github.com/gin-gonic/gin"
	"encoding/json"
	"fmt"

	"github.com/gorilla/websocket"
	"go.mongodb.org/mongo-driver/mongo"
)

var embedded_movieCollection *mongo.Collection = database.OpenCollection(database.Client, "embedded_movies")
var movieCollection *mongo.Collection = database.OpenCollection(database.Client, "movies")
var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
	CheckOrigin: func(r *http.Request) bool {
		return true
	},	
}

type SockDataType string

const (
	Search SockDataType = "search"
	Click  SockDataType = "click"
)

type SockData struct {
	Type SockDataType `json:"type"`
	Msg  string       `json:"msg"`
}

func ServeWebSocket(w http.ResponseWriter, r *http.Request) {
	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Println("Failed to set websocket upgrade: ", err)
		return
	}
	defer conn.Close()

	for {
		// Read message from the client
		_, msg, err := conn.ReadMessage()
		if err != nil {
			log.Println("Error reading message:", err)
			break
		}

		// Unmarshal the received JSON message into SockData struct
		var sockData SockData
		err = json.Unmarshal(msg, &sockData)
		if err != nil {
			log.Println("Error unmarshalling JSON:", err)
			continue
		}

		// Perform actions based on the type of message
		switch sockData.Type {
		case Search:
			fmt.Println("Received search message:", sockData.Msg)

			autocompleteResults, err := utils.AutocompleteSearch(movieCollection, sockData.Msg)
			if err != nil {
				log.Println("Error with autocomplete search:", err)
				continue // Using continue to avoid breaking the WebSocket connection on error
			}

			// fmt.Println("Autocomplete Search Results:")
			// for _, title := range autocompleteResults {
			// 	fmt.Println(title)
			// }

			// Perform fuzzy search
			fuzzyResults, err := utils.FuzzySearch(movieCollection, sockData.Msg)
			if err != nil {
				log.Println("Error with fuzzy search:", err)
				continue // Using continue to avoid breaking the WebSocket connection on error
			}

			results := map[string]interface{}{
				"autocomplete": autocompleteResults,
				"fuzzy":        fuzzyResults,
			}
			jsonResults, err := json.Marshal(results)
			if err != nil {
				log.Println("Error marshalling results to JSON:", err)
				continue
			}

			if err = conn.WriteMessage(websocket.TextMessage, jsonResults); err != nil {
				log.Println("Error writing JSON response:", err)
				continue
			}

			// fmt.Println("\nFuzzy Search Results:")
			// for _, title := range fuzzyResults {
			// 	fmt.Println(title)
			// }

			// Perform search action
		case Click:
			fmt.Println("Received click message:", sockData.Msg)
			// Perform click action
			autocompleteResults, err := utils.AutocompleteSearch(movieCollection, sockData.Msg)
			if err != nil {
				log.Println("Error with autocomplete search:", err)
				continue // Using continue to avoid breaking the WebSocket connection on error
			}

			fuzzyResults, err := utils.FuzzySearch(movieCollection, sockData.Msg)
			if err != nil {
				log.Println("Error with fuzzy search:", err)
				continue // Using continue to avoid breaking the WebSocket connection on error
			}

			semanticResults, err := utils.SemanticSearch(embedded_movieCollection, sockData.Msg)
			if err != nil {
				log.Println("Error with semantic search:", err)
				continue
			}

			results := map[string]interface{}{
				"autocomplete": autocompleteResults,
				"fuzzy":        fuzzyResults,
				"semantic":     semanticResults,
			}
			jsonResults, err := json.Marshal(results)
			if err != nil {
				log.Println("Error marshalling results to JSON:", err)
				continue
			}

			if err = conn.WriteMessage(websocket.TextMessage, jsonResults); err != nil {
				log.Println("Error writing JSON response:", err)
				continue
			}
		default:
			fmt.Println("Unknown message type:", sockData.Type)
		}
	}
}
