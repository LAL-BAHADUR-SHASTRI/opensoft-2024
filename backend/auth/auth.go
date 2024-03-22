package auth

// import (
// 	"fmt"
// 	"github.com/joho/godotenv"
// 	"os"

// 	"github.com/dgrijalva/jwt-go"
// )

// func  Sign_in(c *gin.Context) {
// 	var userAuth UserAuth
// 	var user models.User
// 	c.BindJSON(&userAuth)

// 	//check if the user exists
// 	router.DB.Find(&user, "email = ?", userAuth.Email)
// 	if user.ID == 0 {
// 		c.JSON(404, gin.H{"error": "user not found"})
// 		return
// 	} else if user.Password != userAuth.Password {
// 		c.JSON(401, gin.H{"error": "invalid password"})
// 		return
// 	}

// 	//if the user exists, create a jwt token and send it to the user
// 	userAuth.UserId = int(user.ID)
// 	token, err := CreateJwtToken(userAuth)
// 	if err != nil {
// 		c.JSON(500, gin.H{"error": "error signing in"})
// 		return
// 	}
// 	c.JSON(200, gin.H{"token": token})

// }



// // ValidateToken checks if the provided JWT token string is valid.
// func ValidateToken(tokenStr string) bool {
// 	err := godotenv.Load(".env")
// 	// Get the JWT secret key from the environment variable.
// 	signingKey := []byte(os.Getenv("JWT_SECRET_KEY"))
// 	if len(signingKey) == 0 {
// 		fmt.Println("JWT secret key is missing")
// 		return false
// 	}

// 	// Parse the token.
// 	token, err := jwt.Parse(tokenStr, func(token *jwt.Token) (interface{}, error) {
// 		// Validate the signing algorithm.
// 		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
// 			return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
// 		}
// 		return signingKey, nil
// 	})

// 	// Check if the parsing of the token resulted in an error.
// 	if err != nil {
// 		fmt.Printf("Error parsing token: %v\n", err)
// 		return false
// 	}

// 	// Validate the claims and check if the token is valid.
// 	if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
// 		// Extract user information from claims if needed.
// 		userID := claims["id"]
// 		fmt.Printf("User ID from token: %v\n", userID)

// 		// Token is valid.
// 		return true
// 	}

// 	// Token is invalid.
// 	fmt.Println("Invalid token")
// 	return false
// }
