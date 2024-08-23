const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv')
const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');

const app = express();

dotenv.config()

app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api', postRoutes);

app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.use('/', (req, res) => {
  res.send("<h1>Welcome to THE DAILY BLOG Backend API</h1>");
})