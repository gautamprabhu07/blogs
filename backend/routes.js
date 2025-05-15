const express = require('express');
const router = express.Router();
const mongoType = require('mongoose').Types;
const Post = require('../backend/models/Post.js');

// Get all posts
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find();
        res.send(posts);
    } catch (err) {
        console.error('Error while fetching data:', err);
        res.status(500).send('Internal server error');
    }
});

// Create a new post
router.post('/', async (req, res) => {
    try {
        const post = new Post({
            title: req.body.title,
            content: req.body.content,
            username: req.body.username
        });
        
        const savedPost = await post.save();
        res.send(savedPost);
    } catch (err) {
        console.error('Error while saving post:', err);
        res.status(500).send('Internal server error');
    }
});

// Get a post by ID
router.get('/:id', async (req, res) => {
    const id = req.params.id;

    if (!mongoType.ObjectId.isValid(id)) {
        return res.status(400).send(`No record found with this ID: ${id}`);
    }

    try {
        const post = await Post.findById(id);
        res.send(post);
    } catch (err) {
        console.error('Error while fetching post:', err);
        res.status(500).send('Internal server error');
    }
});

// Delete a post by ID
router.delete('/:id', async (req, res) => {
    const id = req.params.id;

    if (!mongoType.ObjectId.isValid(id)) {
        return res.status(400).send(`No record found with this ID: ${id}`);
    }

    try {
        const deletedPost = await Post.findByIdAndRemove(id);
        res.send(deletedPost);
    } catch (err) {
        console.error('Error while deleting post:', err);
        res.status(500).send('Internal server error');
    }
});

// Update a post by ID
router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const post = {
        title: req.body.title,
        content: req.body.content,
        username: req.body.username
    };

    if (!mongoType.ObjectId.isValid(id)) {
        return res.status(400).send(`No record found with this ID: ${id}`);
    }

    try {
        const updatedPost = await Post.findByIdAndUpdate(id, { $set: post }, { new: true });
        res.send(updatedPost);
    } catch (err) {
        console.error('Error while updating post:', err);
        res.status(500).send('Internal server error');
    }
});

module.exports = router;
