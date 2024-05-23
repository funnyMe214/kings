const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Use your MongoDB connection string
const mongoURI = 'mongodb+srv://shelby4557:RahulCH@123.@king.uh8pcfn.mongodb.net/?retryWrites=true&w=majority&appName=King';

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected...'))
.catch(err => console.log(err));

// Define game schema and model
const gameSchema = new mongoose.Schema({
    title: String,
    description: String,
    image: String
});

const Game = mongoose.model('Game', gameSchema);

// API endpoint to get game details
app.get('/api/game/:title', async (req, res) => {
    try {
        const game = await Game.findOne({ title: req.params.title });
        if (!game) {
            return res.status(404).json({ message: 'Game not found' });
        }
        res.json(game);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
