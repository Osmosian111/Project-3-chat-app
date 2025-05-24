import { WebSocket, WebSocketServer } from "ws"

const PORT_WS = 8080
const wss = new WebSocketServer({ port: PORT_WS })

interface msg {
    type: string
    payload: { message?: string, roomId?: string }
}

interface User {
    socket: WebSocket,
    room?: string
}
let allSocket: User[] = []

wss.on("connection", (socket) => {

    socket.on("message", (message) => {
        const parsedMessage: msg = JSON.parse(message as unknown as string)
        if (parsedMessage.type == "join") {
            console.log("user joined the room " + parsedMessage.payload.roomId)
            allSocket.push({
                socket, room: parsedMessage.payload.roomId
            })
        }

        if (parsedMessage.type == "chat") {
            console.log("User wants to chat")
            let currentUserRoom = null;
            for (let i = 0; i < allSocket.length; i++) {
                if (allSocket[i].socket == socket) {
                    currentUserRoom = allSocket[i].room
                }
            }
            for (let i = 0; i < allSocket.length; i++) {
                if (allSocket[i].room == currentUserRoom) {
                    console.log(parsedMessage.payload.message)
                    allSocket[i].socket.send(parsedMessage.payload.message ?? "null")
                }
            }
        }


    })

})
