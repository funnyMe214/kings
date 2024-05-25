const { Server } = require("ws");
const saveMessage = require('./save-message');
const { createServer } = require('http');

const connections = new Set();

const server = createServer((req, res) => {
    res.writeHead(404);
    res.end();
});

const wss = new Server({ server });

wss.on("connection", (socket) => {
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

module.exports = server;
