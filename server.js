'use strict';

const bGround = require('fcc-express-bground');
const app = require('./myApp'); // <- this now returns an Express app

const http = require('http');

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
