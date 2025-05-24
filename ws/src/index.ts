import { WebSocketServer } from "ws"

const PORT_WS = 8080
const wss = new WebSocketServer({ port: PORT_WS })

let userCount = 0;

wss.on("connection", (socket) => {
    userCount = ++userCount;
    console.log("connected #" + userCount)

    socket.on("message",(msg)=>{
        console.log("message recived " + msg.toString())
    })
})
