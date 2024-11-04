const express = require('express');
const router = express.Router();
const Paper = require('../models/Paper'); // Assuming you have a Paper model

// Route to get all papers
router.get('/', async (req, res) => {
  try {
    const papers = await Paper.find().sort({ createdAt: -1 });
    res.json(papers);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch papers' });
  }
});

module.exports = router;