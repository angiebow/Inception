// routes/papers.js
const express = require('express');
const multer = require('multer');
const Paper = require('../models/Paper'); // Import Paper model

const router = express.Router();

// Set up multer storage configuration for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Adjust if necessary
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Paper upload endpoint
router.post('/upload', upload.single('file'), async (req, res) => {
  try {
    const { title, description, field, yearOfPublishing, institution, citationRate } = req.body;
    const filePath = req.file ? req.file.path : null;

    // Create a new paper document
    const paper = new Paper({
      title,
      description,
      field,
      yearOfPublishing,
      institution,
      citationRate,
      filePath,
    });

    // Save paper document to the database
    await paper.save();
    res.status(200).json({ message: 'Paper submitted successfully' });
  } catch (error) {
    console.error('Error saving paper:', error);
    res.status(500).json({ message: 'Failed to submit paper' });
  }
});

module.exports = router;