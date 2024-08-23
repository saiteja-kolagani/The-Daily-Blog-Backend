const db = require('../db/database');

const createUser = (username, hashedPassword, callback) => {
  db.run(`INSERT INTO users (username, password) VALUES (?, ?)`, [username, hashedPassword], callback);
};

const findUserByUsername = (username, callback) => {
  db.get(`SELECT * FROM users WHERE username = ?`, [username], callback);
};

module.exports = {
  createUser,
  findUserByUsername
};
