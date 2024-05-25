const fs = require('fs');

function saveMessage(req, res, message) {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*'); // Allow all origins, adjust as needed
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }

    // Save the message to messages.json
    const messages = fs.readFileSync('./utils/messages.json');
    const parsedMessages = JSON.parse(messages);
    parsedMessages.push(message);
    fs.writeFileSync('./utils/messages.json', JSON.stringify(parsedMessages));

    res.writeHead(200);
    res.end(JSON.stringify({ success: true }));
}

module.exports = saveMessage;
