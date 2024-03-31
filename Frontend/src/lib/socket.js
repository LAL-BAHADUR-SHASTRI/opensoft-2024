import { type } from "os";

const WebSocket = require("ws");



class SocketHandler {
     socket = null;
    constructor() {
      socket = new WebSocket("10.145.59.41:8080/ws");

       // Event handler for when the connection is established
       socket.onopen = function (event) {
         console.log("WebSocket connected");
       };

       // Event handler for when a message is received from the server
       socket.onmessage = function (event) {
         console.log("Received message:", event.data);
       };

       // Event handler for when an error occurs
       socket.onerror = function (error) {
         console.error("WebSocket error:", error);
       };

       // Event handler for when the connection is closed
       socket.onclose = function (event) {
         console.log("WebSocket closed:", event);
       };

    }

    send(message)   {
        socket.send(message);

    }

    close() {
      socket.close();
    }

}
var s = new SocketHandler();


export default SocketHandler;
