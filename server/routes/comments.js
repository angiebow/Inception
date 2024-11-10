const express = require('express');
const router = express.Router();
const Comment = require('../models/Comment');

router.post('/upload', async (req, res) => {
  const { authorId, paperId, content } = req.body;

  try {
    const newComment = new Comment({
      authorId,
      paperId,
      content,
    });
    await newComment.save();
    res.status(200).json({ message: 'Comment added successfully' });
  } catch (error) {
    console.error('Error adding comment:', error);
    res.status(500).json({ message: 'Failed to add comment' });
  }
});

// Route to get comments for a specific post
router.get('/:paperId', async (req, res) => {
  try {
      const comments = await Comment.find({ paperId: req.params.paperId });
      res.json(comments);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});

module.exports = router;