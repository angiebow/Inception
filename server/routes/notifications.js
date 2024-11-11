const express = require('express');
const router = express.Router();
const Notification = require('../models/Notification');

router.post('/upload', async (req, res) => {
  const { userId, message, isRead, createdAt } = req.body;

  try {
    const newNotification = new Notification({
      userId,
      message,
      isRead,
      createdAt,
    });
    await newNotification.save();
    res.status(200).json({ message: 'Notification added successfully' });
  } catch (error) {
    console.error('Error adding Notification:', error);
    res.status(500).json({ message: 'Failed to add notification' });
  }
});

// Route to get comments for a specific post
router.get('/:userId', async (req, res) => {
  try {
      const notifications = await Notification.find({ userId: req.params.userId });
      res.json(notifications);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});

// Mark notification as read
router.put('/:id', async (req, res) => {
  try {
    const notification = await Notification.findByIdAndUpdate(req.params.id, { isRead: true }, { new: true });
    res.status(200).json(notification);
  } catch (error) {
    res.status(500).json({ error: 'Failed to mark notification as read' });
  }
});

module.exports = router;