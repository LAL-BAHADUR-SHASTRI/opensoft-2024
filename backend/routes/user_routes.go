package routes

import (
	"context"
	"log"
	"net/http"
	"opensoft_2024/database"
	"opensoft_2024/middlewares"
	"opensoft_2024/models"
	"opensoft_2024/utils"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var userCollection *mongo.Collection = database.OpenCollection(database.Client, "users")

func UserServiceRouter(r *gin.Engine) {
	user := r.Group("/user")
	{
		user.DELETE("/", DeleteAllUsers)
		user.POST("/sign_in", sign_in)
		user.GET("/", GetUsers)
		user.POST("/sign_up", CreateUser)
		user.Use(middlewares.JwtMiddleware)
		user.PUT("/", UpdateUser)
		user.GET("/with_token", GetUserWithToken)
		user.POST("/bookmark", AddBookmark)
		user.GET("/watchlist", GetWatchlist)
	}
}

func GetWatchlist(c *gin.Context) {
	_user := c.MustGet("user").(map[string]interface{})

	var user models.User

	log.Println(_user["user_id"])

	objID, err := primitive.ObjectIDFromHex(_user["user_id"].(string)) // Type assertion added
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid movie ID format"})
		return
	}

	filter := bson.M{"_id": objID}
	err = userCollection.FindOne(database.Ctx, filter).Decode(&user) // Variable name changed to avoid redeclaration
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch user"})
		return
	}
	log.Println(user.BookMarks)
	var results []bson.M
	projectOpts := bson.D{{"title", 1}, {"imdb.rating", 1}, {"_id", 1}, {"poster", 1}, {"runtime", 1}}
	movieCollection := database.OpenCollection(database.Client, "movies")
	for _, movieID := range user.BookMarks {
		var movie bson.M
		filter := bson.M{"_id": movieID}
		err := movieCollection.FindOne(database.Ctx, filter,
			options.FindOne().SetProjection(projectOpts),
		).Decode(&movie)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch movie"})
			return
		}
		results = append(results, movie)
	}

	c.JSON(http.StatusOK, results)
}

type Bookmark struct {
	UserId  string `json:"user_id"`
	MovieId string `json:"movie_id"`
}

func AddBookmark(c *gin.Context) {
	var bookmark Bookmark
	if err := c.BindJSON(&bookmark); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid JSON format"})
		return
	}
	userID, _ := primitive.ObjectIDFromHex(bookmark.UserId) // Type assertion added
	// Find the user by email
	filter := bson.M{"_id": userID}
	var user models.User
	err := userCollection.FindOne(context.TODO(), filter).Decode(&user)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
		return
	}

	movieID, _ := primitive.ObjectIDFromHex(bookmark.MovieId) // Type assertion added

	// Insert the user into the database
	_, err = userCollection.UpdateOne(database.Ctx, bson.M{"_id": userID}, bson.M{
		"$push": bson.M{
			"bookmarks": movieID,
		},
	})
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Bookmark added successfully"})
}

func GetUsers(c *gin.Context) {
	cursor, err := userCollection.Find(database.Ctx, bson.D{})
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to retrieve users"})
		return
	}

	var results []bson.M
	if err = cursor.All(context.TODO(), &results); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to decode users"})
		return
	}

	c.JSON(http.StatusOK, results)
}

func GetUserWithToken(c *gin.Context) {
	_user := c.MustGet("user").(map[string]interface{})

	var user models.User

	log.Println(_user["user_id"])

	objID, err := primitive.ObjectIDFromHex(_user["user_id"].(string)) // Type assertion added
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid movie ID format"})
		return
	}

	filter := bson.M{"_id": objID}
	err = userCollection.FindOne(database.Ctx, filter).Decode(&user) // Variable name changed to avoid redeclaration
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch user"})
		return
	}

	c.JSON(http.StatusOK, user)
}

func sign_in(c *gin.Context) {
	var userAuth middlewares.UserAuth
	var user models.User
	if err := c.BindJSON(&userAuth); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid JSON format"})
		return
	}

	if err := utils.ValidateEmail(userAuth.Email); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Find the user by email
	filter := bson.M{"email": userAuth.Email}
	err := userCollection.FindOne(context.TODO(), filter).Decode(&user)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
		return
	}

	// Compare the hashed password with the provided password
	if err := utils.CheckPasswordHash(userAuth.Password, user.Password); err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid password"})
		return
	}

	// Generate JWT token for the user
	token, err := middlewares.CreateJwtToken(userAuth, user.ID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error signing in"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"token": token})
}

func CreateUser(c *gin.Context) {
	var user models.User
	if err := c.BindJSON(&user); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid JSON format"})
		return
	}

	if err := utils.ValidateEmail(user.Email); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Hash the password before storing
	hashedPassword, err := utils.HashPassword(user.Password)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error hashing password"})
		return
	}
	user.Password = hashedPassword

	// Insert the user into the database
	_, err = userCollection.InsertOne(database.Ctx, bson.M{
		"email":    user.Email,
		"password": user.Password,
		"tier":     int(user.Tier),
	})
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error creating user"})
		return
	}

	var userAuth middlewares.UserAuth
	userAuth.Email = user.Email

	filter := bson.M{"email": userAuth.Email}
	err = userCollection.FindOne(context.TODO(), filter).Decode(&user)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
		return
	}

	userAuth.Password = user.Password
	userAuth.Tier = user.Tier

	token, err := middlewares.CreateJwtToken(userAuth, user.ID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error signing in"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"token": token, "user": user})

}

func UpdateUser(c *gin.Context) {
	var user models.User
	if err := c.BindJSON(&user); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid JSON format"})
		return
	}

	_, err := userCollection.UpdateOne(database.Ctx, bson.M{"email": user.Email}, bson.M{
		"$set": bson.M{
			"password": user.Password,
			"tier":     int(user.Tier),
		},
	})
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, user)
}

func DeleteAllUsers(c *gin.Context) {
	// Delete all documents from the user collection
	_, err := userCollection.DeleteMany(context.TODO(), bson.D{})
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete users"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "All users deleted successfully"})
}
