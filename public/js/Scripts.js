// Initialize variables
let cashoutsToday = 0;
let playersCount = 1000; // Starting number of players
let totalCashouts = 0;

// Function to update counters
function updateCounters() {
    // Increment counters
    cashoutsToday += Math.floor(Math.random() * 10);
    playersCount += Math.floor(Math.random() * 5);
    totalCashouts += cashoutsToday;

    // Update the HTML
    document.getElementById('cashouts-today').innerText = cashoutsToday;
    document.getElementById('players-count').innerText = playersCount;
    document.getElementById('total-cashouts').innerText = totalCashouts;
}

// Update counters every 10 seconds
setInterval(updateCounters, 10000);

// Initial call to display initial values
updateCounters();
