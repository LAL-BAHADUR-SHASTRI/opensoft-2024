package middlewares

import (
	"opensoft_2024/models"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt"
	"go.mongodb.org/mongo-driver/bson/primitive"
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
	claims, err := ValidateJwtToken(removeBearer(token))
	if err != nil {

		c.JSON(401, gin.H{"error": "Invalid token"})
		c.Abort()
		return
	}

	//set the user in the context
	c.Set("user", claims)
	c.Next()
}

func removeBearer(token string) string {

	if len(token) > 7 && token[:7] == "Bearer " {
		return token[7:]
	}
	return token
}

// update to validate time in the below function
func ValidateJwtToken(token string) (map[string]interface{}, error) {
	claims := jwt.MapClaims{}
	_, err := jwt.ParseWithClaims(token, claims, func(token *jwt.Token) (interface{}, error) {
		return []byte("secret"), nil
	})
	if err != nil {
		return nil, err
	}
	if claims["exp"].(float64) < float64(time.Now().Unix()) {
		return nil, err
	}
	return claims, nil
}

type UserAuth struct {
	Email string      `json:"email"`
	Tier  models.Tier `json:"tier"`

	Password string `json:"password"`
}

func CreateJwtToken(userAuth UserAuth, id primitive.ObjectID) (string, error) {
	claims := jwt.MapClaims{}

	claims["authorized"] = true
	// claims["user_email"] = userAuth.Email
	claims["user_id"] = id
	// claims["password"] = userAuth.Password

	claims["tier"] = userAuth.Tier
	// claims["user_id"] = strconv.Itoa(userAuth.UserId)
	claims["exp"] = time.Now().Add(time.Hour * 24).Unix()

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	tokenString, err := token.SignedString([]byte("secret"))
	if err != nil {
		return "", err
	}

	return "Bearer " + tokenString, nil
}
