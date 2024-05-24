const { Server } = require("ws");
const saveMessage = require('./save-message');

const server = new Server({ noServer: true });
const connections = new Set();

server.on("connection", (socket) => {
    connections.add(socket);

    socket.on("message", (message) => {
        const parsedMessage = JSON.parse(message);
        const { type, content, sender } = parsedMessage;

        // Broadcast to all connected clients except the sender
        connections.forEach((conn) => {
            if (conn !== socket && conn.readyState === WebSocket.OPEN) {
                conn.send(JSON.stringify({ type, content, sender }));
            }
        });

        // Save the message
        saveMessage(parsedMessage);
    });

    socket.on("close", () => {
        connections.delete(socket);
    });
});

module.exports = (req, res) => {
    if (res.socket.server.ws) {
        res.end();
        return;
    }

    res.socket.server.ws = server;

    res.socket.server.on("upgrade", (req, socket, head) => {
        server.handleUpgrade(req, socket, head, (ws) => {
            server.emit("connection", ws, req);
        });
    });

    res.end();
};
