import connectToDatabase from '../utils/db';

export default async function handler(req, res) {
    const { title } = req.query;

    if (!title) {
        return res.status(400).json({ message: 'Title is required' });
    }

    try {
        await connectToDatabase();
        const game = await Game.findOne({ title });
        if (!game) {
            return res.status(404).json({ message: 'Game not found' });
        }
        res.status(200).json(game);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
