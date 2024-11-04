// routes/paper.js

const express = require('express');
const router = express.Router();

router.post('/upload', (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }

    const file = req.files.file;
    const uploadPath = __dirname + '/uploads/' + file.name;

    file.mv(uploadPath, (err) => {
        if (err) {
            console.error(err);
            return res.status(500).send(err);
        }

        res.json({ message: 'File uploaded successfully', filename: file.name });
    });
});

module.exports = router;