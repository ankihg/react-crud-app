'use strict';
const express = require('express');
const bodyParser = require('body-parser');

let app = express();
let router = new express.Router();

let models = require(__dirname + '/models');

// const mongoose = require('mongoose');
// let DB_PORT = process.env.MONGOLAB_URI || 'mongodb://localhost/db';
// mongoose.connect(DB_PORT);

app.use(bodyParser.json());

const reactClientPath = 'http://127.0.0.1:8080';
const angularClientPath = 'http://localhost:8080';
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', reactClientPath);
  // res.header('Access-Control-Allow-Origin', angularClientPath);
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  next();
});

app.use((req, res, next) => {
  console.log(`${req.method} request for ${req.url}`);
  next();
});

require(__dirname + '/routes/speciess-router.js')(router, models);
require(__dirname + '/routes/trees-router.js')(router, models);

app.use(router);

// app.use('/speciess', require(__dirname + '/routes/speciess-router.js'));

// app.use('/trees', require(__dirname + '/routes/trees-router.js'));

app.listen(3000, () => console.log('server speaking.'));
