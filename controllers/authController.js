const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { createUser, findUserByEmail } = require('../models/userModel');

const register = (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  findUserByEmail(email, (err, user) => {
    if (err) {
      return res.status(500).json({ error: 'Server error' });
    }

    if (user) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) {
        console.error('Error hashing password:', err.message);
        return res.status(500).json({ error: 'Server error' });
      }

      createUser(username, email, hashedPassword, (err) => {
        if (err) {
          return res.status(500).json({ error: 'Error registering user' });
        }
        res.status(201).json({ message: 'User registered successfully' });
      });
    });
  });
};

const login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  findUserByEmail(email, (err, user) => {
    if (err) {
      return res.status(500).json({ error: 'Server error' });
    }

    if (!user) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        console.error('Error comparing password:', err.message);
        return res.status(500).json({ error: 'Server error' });
      }

      if (!isMatch) {
        return res.status(400).json({ error: 'Invalid email or password' });
      }

      const token = jwt.sign(
        { id: user.id, email: user.email, username: user.username },
        process.env.SECRET_KEY,
        { expiresIn: '1h' }
      );
      res.json({ message: 'Login successful', token, user  });
    });
  });
};

module.exports = {
  register,
  login
};
