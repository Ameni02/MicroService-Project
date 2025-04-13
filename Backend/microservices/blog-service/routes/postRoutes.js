const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

// Create a post
router.post('/', async (req, res) => {
    try {
        const post = new Post(req.body);
        const saved = await post.save();
        res.status(201).json(saved);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Get all posts
router.get('/', async (req, res) => {
    const posts = await Post.find();
    res.json(posts);
});

// Get one post
router.get('/:id', async (req, res) => {
    const post = await Post.findById(req.params.id);
    if (post) res.json(post);
    else res.status(404).json({ message: "Not found" });
});

// Update post
router.put('/:id', async (req, res) => {
    try {
        const updated = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updated);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Delete post
router.delete('/:id', async (req, res) => {
    await Post.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
});

module.exports = router;
