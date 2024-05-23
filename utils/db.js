import mongoose from 'mongoose';

const connectToDatabase = async () => {
    if (mongoose.connection.readyState >= 1) return;

    return mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
};

const gameSchema = new mongoose.Schema({
    title: String,
    description: String,
    image: String,
});

const Game = mongoose.models.Game || mongoose.model('Game', gameSchema);

export { connectToDatabase, Game };
