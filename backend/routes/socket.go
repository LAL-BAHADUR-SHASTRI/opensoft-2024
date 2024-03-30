package routes

import (
	"log"
	"net/http"
	"opensoft_2024/database"
	"opensoft_2024/utils"
	"sync"

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

func handleAutoComplete(conn *websocket.Conn, collection *mongo.Collection, searchTerm string) {
	autocompleteResults, err := utils.AutocompleteSearch(collection, searchTerm)
	if err != nil {
		log.Println("Error with autocomplete search:", err)
		// continue // Using continue to avoid breaking the WebSocket connection on error
		return
	}

	results := map[string]interface{}{
		"autocomplete": autocompleteResults,
	}

	jsonResults, err := json.Marshal(results)
	if err != nil {
		log.Println("Error marshalling results to JSON:", err)
		return
	}

	if err = SendResponse(conn, websocket.TextMessage, jsonResults); err != nil {
		log.Println("Error writing JSON response:", err)
		return
	}
}

func handleFuzzySearch(conn *websocket.Conn, collection *mongo.Collection, searchTerm string) {
	fuzzyResults, err := utils.FuzzySearch(collection, searchTerm)
	if err != nil {
		log.Println("Error with fuzzy search:", err)
		return
	}

	result := map[string]interface{}{
		"fuzzy": fuzzyResults,
	}

	jsonResults, err := json.Marshal(result)
	if err != nil {
		log.Println("Error marshalling results to JSON:", err)
		return
	}

	if err = SendResponse(conn, websocket.TextMessage, jsonResults); err != nil {
		log.Println("Error writing JSON response:", err)
		return
	}
}

func handleSemanticSearch(conn *websocket.Conn, collection *mongo.Collection, searchTerm string) {
	semanticResults, err := utils.SemanticSearch(collection, searchTerm)
	if err != nil {
		log.Println("Error with semantic search:", err)
		return
	}

	result := map[string]interface{}{
		"semantic": semanticResults,
	}

	jsonResults, err := json.Marshal(result)
	if err != nil {
		log.Println("Error marshalling results to JSON:", err)
		return
	}

	if err = SendResponse(conn, websocket.TextMessage, jsonResults); err != nil {
		log.Println("Error writing JSON response:", err)
		return
	}
}

func ServeWebSocket(w http.ResponseWriter, r *http.Request) {
	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Println("Failed to set websocket upgrade: ", err)
		return
	}
	defer conn.Close()

	log.Printf("Client connected to websocket %v\n", conn.RemoteAddr())

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

			var wg sync.WaitGroup
			wg.Add(2)
			funcs := []func(*websocket.Conn, *mongo.Collection, string){
				handleAutoComplete,
				handleFuzzySearch,
			}
			for i := 0; i < 2; i++ {
				go func(i int) {
					defer wg.Done()
					funcs[i](conn, movieCollection, sockData.Msg)
				}(i)
			}
			wg.Wait()

			// fmt.Println("\nFuzzy Search Results:")
			// for _, title := range fuzzyResults {
			// 	fmt.Println(title)
			// }

			// Perform search action
		case Click:
			fmt.Println("Received click message:", sockData.Msg)
			// Perform click action

			var wg sync.WaitGroup
			wg.Add(3)

			funcs := []func(*websocket.Conn, *mongo.Collection, string){
				handleAutoComplete,
				handleFuzzySearch,
				handleSemanticSearch,
			}

			for i := 0; i < 3; i++ {
				go func(i int) {
					defer wg.Done()
					funcs[i](conn, embedded_movieCollection, sockData.Msg)
				}(i)
			}

			wg.Wait()

		default:
			fmt.Println("Unknown message type:", sockData.Type)
		}
	}
}
