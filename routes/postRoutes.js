const express = require('express');
const { getPosts, getPost, createNewPost, updateExistingPost, deleteExistingPost } = require('../controllers/postController');
const authenticateToken = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/posts', getPosts);
router.get('/posts/:id', getPost);
router.post('/posts', authenticateToken, createNewPost);
router.put('/posts/:id', authenticateToken, updateExistingPost);
router.delete('/posts/:id', authenticateToken, deleteExistingPost);

module.exports = router;
