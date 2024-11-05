// models/Paper.js
const mongoose = require('mongoose');

const paperSchema = new mongoose.Schema({
  title: String,
  description: String,
  field: String,
  yearOfPublishing: Number,
  institution: String,
  citationRate: Number,
  filePath: String, 
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Paper', paperSchema);