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
var movieCollection *mongo.Collection = database.OpenCollection(database.Client, "movies")
var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
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

			utils.AutocompleteSearch(movieCollection, sockData.Msg)
			utils.FuzzySearch(movieCollection,sockData.Msg)
			// Perform search action
		case Click:
			fmt.Println("Received click message:", sockData.Msg)
			// Perform click action
		default:
			fmt.Println("Unknown message type:", sockData.Type)
		}
	}
}
