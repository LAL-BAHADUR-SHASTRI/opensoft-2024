package main

import (
	"net/http"
	"opensoft_2024/database"
	"opensoft_2024/routes"

	"github.com/gin-gonic/gin"
	"github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
}

func setupRouter() *gin.Engine {

	r := gin.Default()

	// Ping test
	r.GET("/ping", func(c *gin.Context) {
		c.String(http.StatusOK, "pong")
	})

	db := database.InitDB()
	routes.UserServiceRouter{
		DB: db,
	}.Router(r)

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
