package routes

import (
	"context"
	"log"

	"opensoft_2024/middlewares"
	"opensoft_2024/models"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

type UserServiceRouter struct {
	Coll *mongo.Collection
	Ctx  context.Context
}

func (router UserServiceRouter) Router(r *gin.Engine) {

	user := r.Group("/user")
	{
		user.POST("/sign_in", router.sign_in)
		user.GET("/", router.GetUsers)

		user.POST("/", router.CreateUser)
		user.Use(middlewares.JwtMiddleware)

		user.GET("/with_token", router.GetUserWithToken)

	}
}

func (router *UserServiceRouter) GetUsers(c *gin.Context) {

	// var users []models.User

	cursor, err := router.Coll.Find(router.Ctx, bson.D{})
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

func (router *UserServiceRouter) GetUserWithToken(c *gin.Context) {

	_user := c.MustGet("user").(map[string]interface{})

	var user models.User

	filter := bson.D{{"email", _user["user_email"]}}
	// var result bson.M
	err := router.Coll.FindOne(context.TODO(), filter).Decode(&user)
	log.Println(user)

	if err != nil {
		c.JSON(500, gin.H{"error": "error fetching user"})
		return
	}

	c.JSON(200, user)

}

func (router *UserServiceRouter) sign_in(c *gin.Context) {
	var userAuth middlewares.UserAuth
	var user models.User
	c.BindJSON(&userAuth)

	//check if the user exists
	filter := bson.D{{"email", userAuth.Email}}
	err := router.Coll.FindOne(context.TODO(), filter).Decode(&user)
	if err != nil {
		c.JSON(404, gin.H{"error": "user not found"})
		return
	} else if user.Password != userAuth.Password {
		c.JSON(401, gin.H{"error": "invalid password"})
		return
	}

	//if the user exists, create a jwt token and send it to the user
	// userAuth.UserId = int(user.ID)
	token, err := middlewares.CreateJwtToken(userAuth)
	if err != nil {
		c.JSON(500, gin.H{"error": "error signing in"})
		return
	}
	c.JSON(200, gin.H{"token": token})

}

func (router *UserServiceRouter) CreateUser(c *gin.Context) {
	var user models.User
	c.BindJSON(&user)

	_, err := router.Coll.InsertOne(router.Ctx, bson.D{
		{"email", user.Email},
		{"password", user.Password},
		{"tier", int(user.Tier)}, // Store Tier as an integer
	})
	if err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}

	c.JSON(200, user)
}
