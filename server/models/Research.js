const mongoose = require('mongoose');

const researchSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Research', researchSchema);