// routes/paper.js

const express = require('express');
const router = express.Router();
const path = require('path');
const fileupload = require('express-fileupload');
const fs = require('fs');

router.use(fileupload());

router.post('/upload', (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        console.log(req.files);
        return res.status(400).send('No files were uploaded.');
    }

    const file = req.files.file;
    const uploadDir = path.join(__dirname + '../../../client/inception-client/public/uploads');
    const uploadPath = path.join(uploadDir + '/' + file.name);

    // Ensure the `uploads` directory exists
    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
    }

    file.mv(uploadPath, (err) => {
        if (err) {
            console.error(err);
            return res.status(500).send(err);
        }

        res.json({ message: 'File uploaded successfully', filename: file.name });
    });
});

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