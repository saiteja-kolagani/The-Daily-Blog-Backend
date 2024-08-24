const express = require('express');
const { getPosts, getPost, createNewPost, updateExistingPost, deleteExistingPost, getUserPosts } = require('../controllers/postController');
const authenticateToken = require('../middleware/authMiddleware');
const authorizePostEdit = require('../middleware/authorizePostEdit');
const { route } = require('./authRoutes');
const router = express.Router();

router.get('/posts', getPosts);
router.get('/posts/:id', getPost);
router.post('/posts', authenticateToken, createNewPost);
router.put('/posts/:id', authenticateToken, authorizePostEdit, updateExistingPost);
router.delete('/posts/:id', authenticateToken, authorizePostEdit, deleteExistingPost);

router.get('/user/posts', authenticateToken, getUserPosts);

module.exports = router;
