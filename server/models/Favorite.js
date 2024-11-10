// server/models/Favorite.js
const mongoose = require('mongoose');

const favoriteSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  paperId: { type: mongoose.Schema.Types.ObjectId, ref: 'Paper', required: true },
}, { timestamps: true });

module.exports = mongoose.model('Favorite', favoriteSchema);