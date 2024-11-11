const express = require('express');
const router = express.Router();
const Comment = require('../models/Comment');

router.post('/upload', async (req, res) => {
  const { authorId, authorName, paperId, content } = req.body;

  try {
    const newComment = new Comment({
      authorId,
      authorName,
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

// Delete a comment by ID
router.delete('/:id', async (req, res) => {
  try {
      const commentId = req.params.id;
      const deletedComment = await Comment.findByIdAndDelete(commentId);

      if (!deletedComment) {
          return res.status(404).json({ message: 'Comment not found' });
      }

      res.json({ message: 'Comment deleted successfully' });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});

module.exports = router;