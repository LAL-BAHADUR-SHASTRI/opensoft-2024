package main

import (
	"net/http"
	"opensoft_2024/routes"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {
	r := setupRouter()
	godotenv.Load()
	// Listen and Server in 0.0.0.0:8080
	// export PORT=8080
	r.Run(":8080")
}

func setupRouter() *gin.Engine {
	r := gin.New()

	// Middleware for CORS
	r.Use(corsMiddleware())

	routes.UserServiceRouter(r)
	routes.MovieServiceRouter(r)
	routes.PaymentServiceRouter(r)
	routes.SearchServiceRouter(r)
	r.GET("/ws", func(c *gin.Context) {
		routes.ServeWebSocket(c.Writer, c.Request)
	})

	return r
}

// corsMiddleware sets up CORS headers
func corsMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Origin, Content-Type, Authorization")
		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(http.StatusOK)
			return
		}
		c.Next()
	}
}
