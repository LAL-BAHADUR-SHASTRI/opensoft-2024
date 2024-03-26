package main

import (
	"opensoft_2024/routes"
	"github.com/gin-gonic/gin"
)

func setupRouter() *gin.Engine {

	r := gin.New()

	routes.UserServiceRouter(r)
	routes.MovieServiceRouter(r)

	r.GET("/ws", func(c *gin.Context) {
		routes.ServeWebSocket(c.Writer, c.Request)
	})

	return r
}

func main() {
	r := setupRouter()

	// Listen and Server in 0.0.0.0:8080
	r.Run(":8080")
}
