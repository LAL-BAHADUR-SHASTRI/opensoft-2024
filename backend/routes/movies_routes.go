package routes

import (
	"context"
	"net/http"
	"opensoft_2024/database"

	"github.com/gin-gonic/gin"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

// movieCollection is the MongoDB collection for movies
//var movieCollection *mongo.Collection = database.OpenCollection(database.Client, "movies")

// MovieServiceRouter sets up movie service routes on the provided Gin engine
func MovieServiceRouter(r *gin.Engine) {
	movie := r.Group("/movie")
	{
		movie.GET("/", getMovies)
		movie.GET("/:id", getMovieByID)
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

	// Find the movie by ID
	var result bson.M
	err := movieCollection.FindOne(database.Ctx, bson.M{"_id": id}).Decode(&result)
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
