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
		movie.GET("/id/:id", getMovieByID)
		movie.GET("/", getMovies)
		movie.GET("/topimdb", getTopImdbMovies)
		movie.GET("/genre/:genre", getMoviesByGenre)
		movie.GET("/language/:language", getMoviesByLanguage)
		movie.GET("/country/:country", getMoviesByCountry)
		movie.GET("/latest", getLatestMovies)
		movie.GET("/genres", getListofGenres)
		movie.GET("/languages", getListofLanguages)
		movie.GET("/countries", getListofCountries)
		movie.GET("/socket", MySocketHandler)
	}
}

var projectOpts = bson.D{{"title", 1}, {"imdb.rating", 1}, {"_id", 1}, {"poster", 1}, {"runtime", 1}}
var projectStage = bson.D{{"$project", projectOpts}}

// getMovies handles the GET request for retrieving all movies
func getMovies(c *gin.Context) {
	// Find the movies
	opts := options.Find()
	opts.SetProjection(projectOpts)
	opts.SetLimit(10)

	cursor, err := movieCollection.Find(database.Ctx, bson.D{}, opts)
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

func getTopImdbMovies(c *gin.Context) {
	// removing movies with blank imdb rating
	matchStage := bson.D{{"$match", bson.D{{"imdb.rating", bson.D{{"$ne", ""}}}}}}
	sortStage := bson.D{{"$sort", bson.D{{"imdb.rating", -1}}}}
	limitStage := bson.D{{"$limit", 100}}
	// opts := options.Find().SetProjection(bson.D{{"_id", 0}})
	projectStage := bson.D{{"$project", bson.D{{"title", 1}, {"imdb.rating", 1}, {"_id", 1}, {"poster", 1}, {"runtime", 1}}}}
	cursor, err := movieCollection.Aggregate(database.Ctx, mongo.Pipeline{matchStage, sortStage, limitStage, projectStage})

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

func getMoviesByGenre(c *gin.Context) {
	genre := c.Param("genre")

	opts := options.Find()
	opts.SetLimit(100)
	opts.SetProjection(projectOpts)
	// Find the movies by genre
	cursor, err := movieCollection.Find(database.Ctx, bson.D{{"genres", genre}}, opts)
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

func getMoviesByLanguage(c *gin.Context) {
	language := c.Param("language")

	opts := options.Find()
	opts.SetLimit(100)
	opts.SetProjection(projectOpts)
	// Find the movies by language
	cursor, err := movieCollection.Find(database.Ctx, bson.D{{"languages", language}}, opts)
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

func getMoviesByCountry(c *gin.Context) {
	country := c.Param("country")

	opts := options.Find()
	opts.SetLimit(100)
	opts.SetProjection(projectStage)
	// Find the movies by country
	cursor, err := movieCollection.Find(database.Ctx, bson.D{{"countries", country}}, opts)
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

func getLatestMovies(c *gin.Context) {
	opts := options.Find()
	opts.SetLimit(100)
	opts.SetProjection(projectOpts)
	opts.SetSort(bson.D{{"released", -1}})
	// Find the movies
	cursor, err := movieCollection.Find(database.Ctx, bson.D{}, opts)
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

func getListofGenres(c *gin.Context) {
	// Find the movies
	cursor, err := movieCollection.Distinct(database.Ctx, "genres", bson.D{})
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to retrieve genres"})
		return
	}

	c.JSON(http.StatusOK, cursor)
}

func getListofLanguages(c *gin.Context) {
	// Find the movies
	cursor, err := movieCollection.Distinct(database.Ctx, "languages", bson.D{})
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to retrieve languages"})
		return
	}

	c.JSON(http.StatusOK, cursor)
}

func getListofCountries(c *gin.Context) {
	// Find the movies
	cursor, err := movieCollection.Distinct(database.Ctx, "countries", bson.D{})
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to retrieve countries"})
		return
	}

	c.JSON(http.StatusOK, cursor)
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
				searchStage := bson.D{{"$search", bson.D{{"text", bson.D{{"path", "title"}, {"query", sockData.Msg}}}}}}
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
