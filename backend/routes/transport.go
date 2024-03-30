package routes

import (
	"log"
	"sync"

	"github.com/gorilla/websocket"
)

var mu sync.Mutex = sync.Mutex{}

func SendResponse(conn *websocket.Conn, msgType int, data []byte) error {
	log.Printf("sending data : %v\n", string(data))

	mu.Lock()
	defer mu.Unlock()

	err := conn.WriteMessage(msgType, data)
	if err != nil {
		log.Println("error sending message:", err)
		return err
	}

	return nil
}
