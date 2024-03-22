package middlewares

import (
	"opensoft_2024/models"
	"strconv"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt"
)

func JwtMiddleware(c *gin.Context) {
	//get the token from the header
	token := c.GetHeader("Authorization")
	if token == "" {
		c.JSON(401, gin.H{"error": "Authorization header is required"})
		c.Abort()
		return

	}
	//validate the token
	claims, err := ValidateJwtToken(token)
	if err != nil {

		c.JSON(401, gin.H{"error": "Invalid token"})
		c.Abort()
		return
	}

	//set the user in the context
	c.Set("user", claims)
	c.Next()
}

func ValidateJwtToken(token string) (map[string]interface{}, error) {
	claims := jwt.MapClaims{}
	_, err := jwt.ParseWithClaims(token, claims, func(token *jwt.Token) (interface{}, error) {
		return []byte("secret"), nil
	})
	if err != nil {
		return nil, err
	}
	return claims, nil
}

type UserAuth struct {
	Email    string      `json:"email"`
	Tier     models.Tier `json:"tier"`
	UserId   int         `json:"user_id"`
	Password string      `json:"password"`
}

func CreateJwtToken(userAuth UserAuth) (string, error) {
	claims := jwt.MapClaims{}

	claims["authorized"] = true
	claims["user_email"] = userAuth.Email
	// claims["password"] = userAuth.Password

	claims["tier"] = userAuth.Tier
	claims["user_id"] = strconv.Itoa(userAuth.UserId)
	claims["exp"] = time.Now().Add(time.Hour * 24).Unix()

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	tokenString, err := token.SignedString([]byte("secret"))
	if err != nil {
		return "", err
	}

	return tokenString, nil
}

// func (router *UserServiceRouter) GetUserWithToken(c *gin.Context) {

// 	_user := c.MustGet("user").(map[string]interface{})

// 	var user models.User

// 	router.DB.Find(&user, "email = ?", _user["user_email"])
// 	if user.ID == 0 {
// 		c.JSON(404, gin.H{"error": "user not found"})
// 		return
// 	}

// 	c.JSON(200, user)
// }
