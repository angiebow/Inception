const mongoose = require('mongoose');

const favoriteSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  paperId: { type: mongoose.Schema.Types.ObjectId, ref: 'Paper', required: true },
});

const Favorite = mongoose.model('Favorite', favoriteSchema);

module.exports = Favorite;