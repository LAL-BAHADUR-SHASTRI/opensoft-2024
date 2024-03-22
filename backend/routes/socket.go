package routes

import (
	"log"
	"net/http"

	// "github.com/gin-gonic/gin"
	"github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
}

func ServeWebSocket(w http.ResponseWriter, r *http.Request) {
	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Println("Failed to set websocket upgrade: ", err)
		return
	}
	defer conn.Close()

	for {
		messageType, p, err := conn.ReadMessage()
		if err != nil {
			log.Println("Failed to read message: ", err)
			return
		}

		err = conn.WriteMessage(messageType, p)
		if err != nil {
			log.Println("Failed to write message: ", err)
			return
		}
	}
}
