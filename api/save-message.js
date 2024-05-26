const fs = require('fs');
const path = require('path');

module.exports = (req, res) => {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
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

            const filePath = path.resolve('./utils/messages.json');
            let messages = [];
            if (fs.existsSync(filePath)) {
                const messagesData = fs.readFileSync(filePath, 'utf8');
                messages = JSON.parse(messagesData);
            }

            messages.push(message);
            fs.writeFileSync(filePath, JSON.stringify(messages, null, 2));

            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: true }));
        } catch (error) {
            console.error('Error saving message:', error);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: false, error: 'Internal server error' }));
        }
    });
};
