package routes

import (
	"context"
	
	"github.com/gin-gonic/gin"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"

)

type MovieServiceRouter struct {
	Coll *mongo.Collection
	Ctx  context.Context
}

func (router MovieServiceRouter) Router(r *gin.Engine) {

	movie := r.Group("/movie")
	{
		movie.GET("/", router.GetMovies)		
		movie.GET("/:id", router.GetMovieByID)		
	}
}


func (router *MovieServiceRouter) GetMovies(c *gin.Context) {

	// var users []models.User

	cursor, err := router.Coll.Find(router.Ctx, bson.D{},options.Find().SetLimit(10))
	// check for errors in the finding
	if err != nil {
		panic(err)
	}

	// convert the cursor result to bson
	var results []bson.M
	// check for errors in the conversion
	if err = cursor.All(context.TODO(), &results); err != nil {
		panic(err)
	}

	c.JSON(200, results)
}


func (router *MovieServiceRouter) GetMovieByID(c *gin.Context) {
	// Retrieve the movie ID from the URL parameter
	id := c.Param("id")

	// Find the movie by ID
	var result bson.M
	err := router.Coll.FindOne(router.Ctx, bson.M{"_id": id}).Decode(&result)
	if err != nil {
		c.JSON(101, gin.H{"error": "Movie not found"})
		return
	}

	c.JSON(200, result)
}
