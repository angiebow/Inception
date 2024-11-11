const mongoose = require('mongoose');

const paperSchema = new mongoose.Schema({
  authorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  authorName: { type: String },
  paperId: { type: mongoose.Schema.Types.ObjectId, ref: 'Paper' },
  content: { type: String },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Comment', paperSchema);