const mongoose = require('mongoose');

const paperSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  field: { type: String },
  yearOfPublishing: { type: Number },
  institution: { type: String },
  citationRate: { type: Number },
  fileUrl: { type: String }, 
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Paper', paperSchema);