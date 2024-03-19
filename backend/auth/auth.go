package auth

// import (
// 	"fmt"
// 	"github.com/joho/godotenv"
// 	"os"

// 	"github.com/dgrijalva/jwt-go"
// )

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
