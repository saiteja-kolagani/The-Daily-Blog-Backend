const db = require('../db/database');
const { format } = require('date-fns');

const getAllPosts = (callback) => {
  db.all(`SELECT * FROM posts`, callback);
};

const getPostById = (id, callback) => {
  db.get(`SELECT * FROM posts WHERE id = ?`, [id], callback);
};

const createPost = (title, content, userId, username, callback) => {
  const now = new Date();
  const createdAt = format(now, 'yyyy-MM-dd HH:mm:ss');
  
  db.run(`INSERT INTO posts (title, content, created_at, user_id, user_name) VALUES (?, ?, ?, ?, ?)`,
    [title, content, createdAt, userId, username], callback);
};

const updatePost = (id, title, content, callback) => {
  db.run(`UPDATE posts SET title = ?, content = ? WHERE id = ?`, [title, content, id], callback);
};

const deletePost = (id, callback) => {
  db.run(`DELETE FROM posts WHERE id = ?`, [id], callback);
};

const getPostByUser = (id, callback) => {
  db.all(`SELECT posts.*, users.username FROM posts JOIN users ON posts.user_id = users.id WHERE posts.user_id = ?`,
  [id], callback);
}

module.exports = {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
  getPostByUser
};
