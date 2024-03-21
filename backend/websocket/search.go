package websocket

import (
	"encoding/json"
	"log"
	"github.com/gin-gonic/gin"
	"github.com/gorilla/websocket"
	"go.mongodb.org/mongo-driver/mongo"
)

var hub *Hub
var collection *mongo.Collection
var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
}

// InitSearch initializes the WebSocket search handler and starts the Hub.
func InitSearch(c *mongo.Collection) {
	collection = c
	hub = NewHub()
	go hub.Run()
}

// HandleSearchWS is the WebSocket handler for search functionality.
func HandleSearchWS(c *gin.Context) {
	conn, err := upgrader.Upgrade(c.Writer, c.Request, nil)
	if err != nil {
		log.Println(err)
		return
	}

	client := &Client{hub: hub, conn: conn, send: make(chan []byte, 256)}
	client.hub.register <- client

	// Handle incoming messages and search queries
	go client.readMessages()
}

// Client represents a connected WebSocket client.
type Client struct {
	hub  *Hub
	conn *websocket.Conn
	send chan []byte
}

// readMessages reads messages from the WebSocket connection and handles search queries.
func (c *Client) readMessages() {
	defer func() {
		c.hub.unregister <- c
		c.conn.Close()
	}()

	for {
		_, message, err := c.conn.ReadMessage()
		if err != nil {
			if websocket.IsUnexpectedCloseError(err, websocket.CloseGoingAway, websocket.CloseAbnormalClosure) {
				log.Printf("error: %v", err)
			}
			break
		}

		// Handle search query and fetch results from MongoDB Atlas Search
		searchResults := handleSearchQuery(collection, string(message))

		// Broadcast search results to connected clients
		c.hub.broadcast <- searchResults
	}
}

// handleSearchQuery fetches search results from MongoDB Atlas Search based on the provided query.
func handleSearchQuery(collection *mongo.Collection, query string) []byte {
	// Implement your search logic here
	// Use MongoDB Atlas Search to fetch search results based on the provided query

	// Example: Simulate search results for demonstration purposes
	searchResults := []struct {
		Title string `json:"title"`
	}{
		{"Movie Title 1"},
		{"Movie Title 2"},
		// Add more search results as needed
	}

	jsonResults, _ := json.Marshal(searchResults)
	return jsonResults
}
