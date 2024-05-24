// api/games.js

module.exports = async (req, res) => {
    try {
      const gamesData = require('./utils/games.json');
      res.status(200).json(gamesData);
    } catch (error) {
      console.error('Error fetching games data:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  