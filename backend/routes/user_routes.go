package routes

import (
	"context"
	"net/http"
	"opensoft_2024/database"
	"opensoft_2024/middlewares"
	"opensoft_2024/models"
	"opensoft_2024/utils"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
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
	}
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

	filter := bson.D{{"email", _user["user_email"]}}
	err := userCollection.FindOne(context.TODO(), filter).Decode(&user)
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
	filter := bson.D{{"email", userAuth.Email}}
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
	_, err = userCollection.InsertOne(database.Ctx, bson.D{
		{"email", user.Email},
		{"password", user.Password},
		{"tier", int(user.Tier)},
	})
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error creating user"})
		return
	}

	c.JSON(http.StatusOK, user)
}

func UpdateUser(c *gin.Context) {
	var user models.User
	if err := c.BindJSON(&user); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid JSON format"})
		return
	}

	_, err := userCollection.UpdateOne(database.Ctx, bson.D{{"email", user.Email}}, bson.D{
		{"$set", bson.D{
			{"password", user.Password},
			{"tier", int(user.Tier)},
		}},
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
