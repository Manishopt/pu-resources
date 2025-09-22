const express = require('express');
require("dotenv").config();
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
const db = require('./mongoose');

const allowedOrigins = [
  'http://localhost:3000',
  'https://pu-resources-frontend.onrender.com',
  'https://pu-resources-c539f.web.app',
  'https://pu-resources-backend.onrender.com'
];

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (mobile apps, etc.)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  optionsSuccessStatus: 200 // Some legacy browsers choke on 204
};

app.use(cors(corsOptions));

// Handle preflight requests
app.options('*', cors(corsOptions));

app.get('/', (req, res) => {
  res.send('hello world');
});

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('build'));
}

app.use(express.json());
app.use('/api', require('./CreateUser'));
app.use('/api', require('./DisplayData'));

app.listen(port, () => {
  console.log(`listening to the port ${port}`);
});
