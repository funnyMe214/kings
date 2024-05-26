const fs = require('fs');


function saveMessage(req, res) {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*'); // Allow all origins, adjust as needed
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }

    let body = '';
    req.on('data', chunk => {
        body += chunk.toString();
    });

    req.on('end', () => {
        try {
            const message = JSON.parse(body);

            // Save the message to messages.json
            const messages = fs.readFileSync('./utils/messages.json');
            const parsedMessages = JSON.parse(messages);
            parsedMessages.push(message);
            fs.writeFileSync('./utils/messages.json', JSON.stringify(parsedMessages));

            res.writeHead(200);
            res.end(JSON.stringify({ success: true }));
        } catch (error) {
            console.error('Error saving message:', error);
            res.writeHead(500);
            res.end(JSON.stringify({ success: false, error: 'Internal server error' }));
        }
    });
}

module.exports = saveMessage;
