package routes

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"opensoft_2024/database"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/gorilla/websocket"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

// movieCollection is the MongoDB collection for movies
//var movieCollection *mongo.Collection = database.OpenCollection(database.Client, "movies")

// / MovieServiceRouter sets up movie service routes on the provided Gin engine
func MovieServiceRouter(r *gin.Engine) {
	movie := r.Group("/movie")
	{
		movie.GET("/:id", getMovieByID)
		movie.GET("/", getMovies)
		movie.GET("/socket", MySocketHandler)
	}
}

// getMovies handles the GET request for retrieving all movies
func getMovies(c *gin.Context) {
	// Find the movies
	cursor, err := movieCollection.Find(database.Ctx, bson.D{}, options.Find().SetLimit(10))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to retrieve movies"})
		return
	}
	defer cursor.Close(context.TODO())

	var results []bson.M
	if err := cursor.All(context.TODO(), &results); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to decode movies"})
		return
	}

	c.JSON(http.StatusOK, results)
}

// getMovieByID handles the GET request for retrieving a movie by ID
func getMovieByID(c *gin.Context) {
	// Retrieve the movie ID from the URL parameter
	id := c.Param("id")

	// Convert the id parameter to an ObjectId
	objID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid movie ID format"})
		return
	}

	// Find the movie by ID
	var result bson.M
	err = movieCollection.FindOne(database.Ctx, bson.M{"_id": objID}).Decode(&result)
	if err != nil {
		if err == mongo.ErrNoDocuments {
			c.JSON(http.StatusNotFound, gin.H{"error": "Movie not found"})
			return
		}
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to retrieve movie"})
		return
	}

	c.JSON(http.StatusOK, result)
}

// MySocketHandler handles the WebSocket connection
func MySocketHandler(c *gin.Context) {
	conn, err := upgrader.Upgrade(c.Writer, c.Request, nil)
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
			{
				// define pipeline
				searchStage := bson.D{{"$search", bson.D{{"text", bson.D{{"path", "title"}, {"query", sockData.Msg}, {"tokenOrder", "any"}}}}}}
				limitStage := bson.D{{"$limit", 5}}
				projectStage := bson.D{{"$project", bson.D{{"title", 1}, {"plot", 1}, {"_id", 0}}}}
				// specify the amount of time the operation can run on the server
				opts := options.Aggregate().SetMaxTime(5 * time.Second)
				// run pipeline
				cursor, err := movieCollection.Aggregate(database.Ctx, mongo.Pipeline{searchStage, limitStage, projectStage}, opts)
				if err != nil {
					log.Println("Error running aggregation:", err)
					continue
				}
				defer cursor.Close(context.Background())

				var results []bson.D
				if err = cursor.All(context.TODO(), &results); err != nil {
					log.Println("Error decoding results:", err)
					continue
				}

				// Encode the search results as JSON
				response, err := json.Marshal(results)
				if err != nil {
					log.Println("Error encoding search results:", err)
					continue
				}

				// Write the JSON response to the WebSocket connection
				err = conn.WriteMessage(websocket.TextMessage, response)
				if err != nil {
					log.Println("Error writing response to WebSocket:", err)
					continue
				}
			}
			// Perform search action
		case Click:
			fmt.Println("Received click message:", sockData.Msg)
			// Perform click action
		default:
			fmt.Println("Unknown message type:", sockData.Type)
		}
	}
}
