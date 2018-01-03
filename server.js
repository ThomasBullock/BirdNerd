'use strict';

import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import apiRouter from './api';
import authRouter from './auth';

// import environmental variables from our variables.env file
require('dotenv').config({ path: 'variables.env' });
const path = require('path');

const app = express();
// console.log(process.env.NODE_ENV);
//set our port to either a predetermined port number if you have set it up, or 3001
const port = process.env.API_PORT || 3001;

// Connect to our Database 
mongoose.connect(process.env.DATABASE, { useMongoClient: true, });

// Express only serves static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('build'));
}

// converts raw requests into usable properties on req.body
// This object will contain key-value pairs, where the value can be a string or array (when extended is false), or any type (when extended is true).
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(morgan('dev')); 
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
  next();
});

app.use('/api', apiRouter);
app.use('/api/auth', authRouter);
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
});

//starts the server and listens for requests
app.listen(port, function() {
  console.log(`api running on port ${port} in ${process.env.NODE_ENV}`);
});