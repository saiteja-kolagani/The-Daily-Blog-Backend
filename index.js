const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv')

const app = express();

dotenv.config()

app.use(bodyParser.json());

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});