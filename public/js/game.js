document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const gameId = params.get('id');

    if (gameId) {
        fetch('/api/games')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(games => {
                const game = games.find(game => game.id === gameId);
                if (game) {
                    document.getElementById('game-title').innerText = game.title;
                    document.getElementById('game-description').innerText = game.description;
                    document.getElementById('game-image').src = game.image;
                    document.getElementById('game-download').href = game.downloadLink;
                    document.getElementById('offers-image').src = game.offersImage;
                    document.getElementById('cashout-rules-image').src = game.cashoutRulesImage;
                } else {
                    console.error('Game not found');
                    displayErrorMessage('Game not found');
                }
            })
            .catch(error => {
                console.error('Error fetching game details:', error);
                displayErrorMessage('Error fetching game details');
            });
    } else {
        displayErrorMessage('Game ID not provided');
    }
});

function displayErrorMessage(message) {
    document.getElementById('game-title').innerText = message;
    document.getElementById('game-description').innerText = '';
    document.getElementById('game-image').src = '';
    document.getElementById('offers-image').src = '';
    document.getElementById('cashout-rules-image').src = '';
}



// WebSocket setup
const socket = new WebSocket('wss://kingscasino.vercel.app/api/websocket.js');

socket.addEventListener('open', () => {
    console.log('WebSocket connection established');
});

socket.addEventListener('message', event => {
    const message = JSON.parse(event.data);
    displayMessage('admin', message.message);
});

document.getElementById('sendButton').addEventListener('click', () => {
    const messageInput = document.getElementById('messageInput');
    const message = messageInput.value.trim();
    
    if (message) {
        // Display the message in the chat
        displayMessage('user', message);

        // Clear the input field
        messageInput.value = '';

        // Send the message to the WebSocket server
        socket.send(JSON.stringify({ message }));

        // Save the message to the server
        sendMessageToServer(message);
        
    }
});

function displayMessage(sender, message) {
    const chatMessages = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.classList.add(sender === 'user' ? 'user-message' : 'admin-message');
    messageDiv.textContent = message;
    messageDiv.style.cssText = "border: 3px solid blue; border-radius: 10px; padding: 3px; margin: 5px;";

    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight; // Scroll to the bottom
}

function sendMessageToServer(message) {
    fetch('/api/save-message.js', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Message saved:', data);
    })
    .catch(error => {
        console.error('Error saving message:', error);
    });
}

function presetMessage(message) {
    toggleChat();
    document.getElementById('messageInput').value = message;
}

document.getElementById('deposit').addEventListener('click', () => presetMessage('I want to deposit...for the game'));
document.getElementById('cashout').addEventListener('click', () => presetMessage('I want to cashout'));
document.getElementById('create-account').addEventListener('click', () => presetMessage('I want to create/know my account'));

document.getElementById('closeChat').addEventListener('click', toggleChat);

function toggleChat() {
    var chatContainer = document.getElementById('chatContainer');
    chatContainer.style.display = chatContainer.style.display === 'none' ? 'block' : 'none';
}
