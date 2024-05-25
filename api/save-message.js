const fs = require('fs');

function saveMessage(message) {
    const messages = fs.readFileSync('./utils/messages.json');
    const parsedMessages = JSON.parse(messages);
    parsedMessages.push(message);
    fs.writeFileSync('./utils/messages.json', JSON.stringify(parsedMessages));
}

module.exports = saveMessage;
