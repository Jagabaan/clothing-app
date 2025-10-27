
const express = require('express');
const cookieparser = require('cookie-parser');
const cors = require('cors')

const connectToDb = require('./utils/connectToDb')
const authenticationRouter = require('./routes/authentication/auth-routes.js')


connectToDb();

const app = express();

const PORT = process.env.PORT || 3000;

const corsOptions = {
  origin: 'http://localhost:5173',
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
app.use('/api/auth', authenticationRouter);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});