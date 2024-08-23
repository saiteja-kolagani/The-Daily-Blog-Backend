const db = require('../db/database');

const getAllPosts = (callback) => {
  db.all(`SELECT * FROM posts`, callback);
};

const getPostById = (id, callback) => {
  db.get(`SELECT * FROM posts WHERE id = ?`, [id], callback);
};

const createPost = (title, content, userId, callback) => {
  db.run(`INSERT INTO posts (title, content, created_at, user_id) VALUES (?, ?, datetime('now'), ?)`,
    [title, content, userId], callback);
};

const updatePost = (id, title, content, callback) => {
  db.run(`UPDATE posts SET title = ?, content = ? WHERE id = ?`, [title, content, id], callback);
};

const deletePost = (id, callback) => {
  db.run(`DELETE FROM posts WHERE id = ?`, [id], callback);
};

module.exports = {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost
};
