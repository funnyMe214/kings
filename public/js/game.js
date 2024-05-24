document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const title = params.get('title');

    if (title) {
        fetch(`http://kingscasino.vercel.app/api/game/${title}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Network response was not ok: ${response.statusText}`);
                }
                return response.json();
            })
            .then(game => {
                // Check if the required properties exist in the response
                if (game.title && game.description && game.image) {
                    document.getElementById('game-title').innerText = game.title;
                    document.getElementById('game-description').innerText = game.description;
                    document.getElementById('game-image').src = game.image;
                } else {
                    console.error('Invalid game data:', game);
                }
            })
            .catch(error => {
                console.error('Error fetching game details:', error);
                // Optionally update the UI to inform the user of the error
                document.getElementById('game-title').innerText = 'Error loading game details';
                document.getElementById('game-description').innerText = '';
                document.getElementById('game-image').src = '';
            });
    }
});
