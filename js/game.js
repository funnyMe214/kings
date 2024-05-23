document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const title = params.get('title');

    if (title) {
        fetch(`http://localhost:3000/api/game/${title}`)
            .then(response => response.json())
            .then(game => {
                document.getElementById('game-title').innerText = game.title;
                document.getElementById('game-description').innerText = game.description;
                document.getElementById('game-image').src = game.image;
            })
            .catch(error => {
                console.error('Error fetching game details:', error);
            });
    }
});
