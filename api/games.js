import { promises as fs } from 'fs';
import path from 'path';

export default async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // Allow all origins, adjust as needed
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    // Handle preflight requests
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    try {
        const filePath = path.join(process.cwd(), 'utils', 'games.json');
        const fileContents = await fs.readFile(filePath, 'utf8');
        const games = JSON.parse(fileContents);

        res.status(200).json(games);
    } catch (error) {
        res.status(500).json({ error: 'Failed to read games data' });
    }
};
