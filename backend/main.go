package main

import (
	"github.com/gin-gonic/gin"
	"net/http"
	"opensoft_2024/routes"
)

func enableCors(w *http.ResponseWriter) {
	(*w).Header().Set("Access-Control-Allow-Origin", "*")
}

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
	// export PORT=8080
	r.Run(":8080")
}
