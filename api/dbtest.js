import connectToDatabase from '../utils/db';

export default async function handler(req, res) {
  try {
    await connectToDatabase();
    res.status(200).json({ message: 'Connected to MongoDB' });
  } catch (error) {
    res.status(500).json({ error: 'Database connection failed' });
  }
}
