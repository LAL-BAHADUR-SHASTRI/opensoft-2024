package routes

import (
	"opensoft_2024/models"

	"opensoft_2024/middlewares"

	"github.com/gin-gonic/gin"

	"gorm.io/gorm"
)

type UserServiceRouter struct {
	DB *gorm.DB
}

func (router UserServiceRouter) Router(r *gin.Engine) {

	user := r.Group("/user")
	{
		user.POST("/sign_in", router.sign_in)
		user.GET("/", router.GetUsers)
		user.GET("/:id", router.GetUser)
		user.POST("/", router.CreateUser)
		user.Use(middlewares.JwtMiddleware)
		user.PUT("/:id", router.UpdateUser)

		user.DELETE("/:id", router.DeleteUser)

		user.GET("/with_token", router.GetUserWithToken)

	}
}

func (router *UserServiceRouter) GetUsers(c *gin.Context) {

	var users []models.User

	router.DB.Find(&users)
	c.JSON(200, users)
}

func (router *UserServiceRouter) GetUserWithToken(c *gin.Context) {

	_user := c.MustGet("user").(map[string]interface{})

	var user models.User

	router.DB.Find(&user, "email = ?", _user["user_email"])
	if user.ID == 0 {
		c.JSON(404, gin.H{"error": "user not found"})
		return
	}

	c.JSON(200, user)
}

func (router *UserServiceRouter) sign_in(c *gin.Context) {
	var userAuth middlewares.UserAuth
	var user models.User
	c.BindJSON(&userAuth)

	//check if the user exists
	router.DB.Find(&user, "email = ?", userAuth.Email)
	if user.ID == 0 {
		c.JSON(404, gin.H{"error": "user not found"})
		return
	} else if user.Password != userAuth.Password {
		c.JSON(401, gin.H{"error": "invalid password"})
		return
	}

	//if the user exists, create a jwt token and send it to the user
	userAuth.UserId = int(user.ID)
	token, err := middlewares.CreateJwtToken(userAuth)
	if err != nil {
		c.JSON(500, gin.H{"error": "error signing in"})
		return
	}
	c.JSON(200, gin.H{"token": token})

}

func (router *UserServiceRouter) GetUser(c *gin.Context) {
	id := c.Param("id")
	var user models.User
	router.DB.First(&user, id)
	c.JSON(200, user)
}

func (router *UserServiceRouter) CreateUser(c *gin.Context) {
	var user models.User
	// c.ShouldBindJSON(&user)
	c.BindJSON(&user)

	router.DB.Create(&user)

	c.JSON(200, user)
}

func (router *UserServiceRouter) UpdateUser(c *gin.Context) {
	id := c.Param("id")
	var user models.User
	router.DB.First(&user, id)
	c.BindJSON(&user)
	router.DB.Save(&user)
	c.JSON(200, user)
}

func (router *UserServiceRouter) DeleteUser(c *gin.Context) {
	id := c.Param("id")
	var user models.User
	router.DB.First(&user, id)
	router.DB.Delete(&user)
	c.JSON(200, user)
}
