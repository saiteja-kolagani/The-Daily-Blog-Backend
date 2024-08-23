const db = require('../db/database');

const createUser = (username, email, hashedPassword, callback) => {
  db.run(
    `INSERT INTO users (username, email, password) VALUES (?, ?, ?)`,
    [username, email, hashedPassword],
    (err) => {
      if (err) {
        console.error('Error creating user:', err.message);
      }
      callback(err);
    }
  );
};

const findUserByEmail = (email, callback) => {
  db.get(`SELECT * FROM users WHERE email = ?`, [email], (err, user) => {
    if (err) {
      console.error('Error finding user by email:', err.message);
    }
    callback(err, user);
  });
};

module.exports = {
  createUser,
  findUserByEmail
};
