require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');

// Enable body parsing middleware for POST requests
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Root-level logger middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
});

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the Express app!');
});

// Echo route with route parameter
app.get('/:word/echo', (req, res) => {
  const word = req.params.word;
  res.json({ echo: word });
});

// Route: GET /json with MESSAGE_STYLE from .env
app.get('/json', (req, res) => {
  const message = process.env.MESSAGE_STYLE === 'uppercase'
    ? 'HELLO JSON'
    : 'Hello json';
  res.json({ message });
});

// Route: GET /now with chained middleware
app.get('/now', (req, res, next) => {
  req.time = new Date().toString();
  next();
}, (req, res) => {
  res.json({ time: req.time });
});

// Route: GET and POST /name
app.route('/name')
  .get((req, res) => {
    const firstName = req.query.first;
    const lastName = req.query.last;
    res.json({ name: `${firstName} ${lastName}` });
  })
  .post((req, res) => {
    const firstName = req.body.first;
    const lastName = req.body.last;
    res.json({ name: `${firstName} ${lastName}` });
  });

module.exports = app;

