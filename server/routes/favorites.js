const express = require('express');
const router = express.Router();
const Favorite = require('../models/Favorite');
const authenticateUser = require('../middleware/authenticateUser');

router.post('/add', authenticateUser, async (req, res) => {
    try {
        const { paperId } = req.body;
        const userId = req.user.id;

        const exists = await Favorite.findOne({ userId, paperId });
        if (exists) return res.status(400).json({ message: 'Already in favorites' });

        const favorite = new Favorite({ userId, paperId });
        await favorite.save();
        res.status(201).json({ message: 'Added to favorites successfully' });
    } catch (error) {
        console.error('Error adding to favorites:', error);
        res.status(500).json({ message: 'Failed to add to favorites' });
    }
});

module.exports = router;