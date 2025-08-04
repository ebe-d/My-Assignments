import { WebSocketServer, WebSocket } from "ws";
const ws = new WebSocketServer({ port: 8080 });
let UserCount = 0;
let allSockets = [];
ws.on("connection", function (socket) {
    UserCount += 1;
    console.log("user connected" + UserCount);
    socket.on("message", (message) => {
        const parsedMessage = JSON.parse(message);
        if (parsedMessage.type === "join") {
            console.log("user joined" + parsedMessage.payload.roomId);
            allSockets.push({
                socket: socket,
                room: parsedMessage.payload.roomId
            });
        }
        if (parsedMessage.type === "chat") {
            console.log(parsedMessage.payload.message);
            const currentUserRoom = allSockets.find((x) => x.socket == socket)?.room;
            console.log("this is current one" + currentUserRoom);
            allSockets.forEach(x => {
                if (x.room == currentUserRoom) {
                    console.log("x room" + x.room);
                    x.socket.send(parsedMessage.payload.message);
                }
                else {
                    socket.send(JSON.stringify(parsedMessage));
                }
            });
        }
    });
    socket.on("close", () => {
    });
});
//# sourceMappingURL=index.js.map