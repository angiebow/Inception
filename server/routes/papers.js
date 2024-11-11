const express = require('express');
const router = express.Router();
const multer = require('multer');
const Paper = require('../models/Paper');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage });

router.post('/upload', upload.single('file'), async (req, res) => {
  const { authorId, title, description, field, yearOfPublishing, institution, citationRate } = req.body;

  try {
    const newPaper = new Paper({
      authorId,
      title,
      description,
      field,
      yearOfPublishing,
      institution,
      citationRate,
      fileUrl: 'http://localhost:5001/' + req.file.path, 
    });

    await newPaper.save();
    res.status(200).json({ message: 'Paper uploaded successfully' });
  } catch (error) {
    console.error('Error saving paper:', error);
    res.status(500).json({ message: 'Failed to save paper' });
  }
});

router.get('/', async (req, res) => {
    try {
      const papers = await Paper.find().sort({ createdAt: -1 });
      res.json(papers);
    } catch (error) {
      console.error('Error fetching papers:', error);
      res.status(500).json({ message: 'Failed to fetch papers' });
    }
  });

module.exports = router;