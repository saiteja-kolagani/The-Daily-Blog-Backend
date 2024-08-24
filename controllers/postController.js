const { getAllPosts, getPostById, createPost, updatePost, deletePost, getPostByUser } = require('../models/postModel');

const getPosts = (req, res) => {
  getAllPosts((err, posts) => {
    if (err) return res.status(500).json({ error: 'Server error' });
    res.json(posts);
  });
};

const getPost = (req, res) => {
  const { id } = req.params;
  getPostById(id, (err, post) => {
    if (err || !post) return res.status(404).json({ error: 'Post not found' });
    res.json(post);
  });
};

const getUserPosts = (req, res) => {
  const userId = req.user.id;

  getPostByUser(userId, (err, posts) => {
    if (err) {
      console.error('Error fetching posts for user:', err);
      return res.status(500).json({ error: 'Database error.' });
    }
    if (!posts.length) {
      console.log('No posts found for user ID:', userId);
      return res.status(404).json({ error: 'No posts found.' });
    }
    res.json(posts);
  });
};


const createNewPost = (req, res) => {
  const { title, content } = req.body;
  const userId = req.user.id;
  const username = req.user.username;

  createPost(title, content, userId, username, (err) => {
    if (err) return res.status(500).json({ error: 'Failed to create post' });
    res.status(201).json({ message: 'Post created successfully' });
  });
};

const updateExistingPost = (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;

  updatePost(id, title, content, (err) => {
    if (err) return res.status(500).json({ error: 'Failed to update post' });
    res.json({ message: 'Post updated successfully' });
  });
};

const deleteExistingPost = (req, res) => {
  const { id } = req.params;

  deletePost(id, (err) => {
    if (err) return res.status(500).json({ error: 'Failed to delete post' });
    res.json({ message: 'Post deleted successfully' });
  });
};

module.exports = {
  getPosts,
  getPost,
  createNewPost,
  updateExistingPost,
  deleteExistingPost,
  getUserPosts
};
