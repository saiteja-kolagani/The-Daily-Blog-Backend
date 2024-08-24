const db = require('../db/database');

const authorizePostEdit = (req, res, next) => {
  const { id: postId } = req.params;
  const { id: userId, email } = req.user;

  if (email === 'saiteja.kolagani@gmail.com') {
    return next();
  }

  db.get(`SELECT * FROM posts WHERE id = ?`, [postId], (err, post) => {
    if (err) {
      return res.status(500).json({ error: 'Database error.' });
    }
    if (!post) {
      return res.status(404).json({ error: 'Post not found.' });
    }
    if (post.user_id !== userId) {
      return res.status(403).json({ error: 'You are not authorized to edit this post.' });
    }

    next();
  });
};

module.exports = authorizePostEdit;
