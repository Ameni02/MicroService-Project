const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: String,
    author: String,
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Post', postSchema);
