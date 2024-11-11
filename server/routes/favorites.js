const express = require('express');
const router = express.Router();
const authenticateUser = require('../middleware/authenticateUser');
const Favorite = require('../models/Favorite');

router.post('/add', authenticateUser, async (req, res) => {
  try {
    const { paperId } = req.body;
    const userId = req.user.id;
    
    const favorite = new Favorite({
      userId,  
      paperId,
    });
    await favorite.save();

    res.status(201).json({ message: 'Added to favorites successfully' });
  } catch (error) {
    console.error('Error adding to favorites:', error);
    res.status(500).json({ message: 'Failed to add to favorites' });
  }
});

router.get('/user-favorites', authenticateUser, async (req, res) => {
  try {
    const favorites = await Favorite.find({ userId: req.user.id }).populate('paperId');
    res.json(favorites);
  } catch (error) {
    console.error('Error fetching favorites:', error);
    res.status(500).json({ message: 'Failed to retrieve favorites.' });
  }
});

module.exports = router;