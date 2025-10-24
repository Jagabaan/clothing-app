
const express = require('express');
const cookieparser = require('cookie-parser');
const cors = require('cors')

const connectToDb = require('./utils/connectToDb')

connectToDb();

const app = express();

const PORT = process.env.PORT || 3000;

const corsOptions = {
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'Cache-Control',
    'Expires',
    'Pragma'
  ],
  credentials: true
};

app.use(cors(corsOptions));


app.use(cookieparser());
app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});