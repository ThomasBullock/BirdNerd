'use strict';

import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import apiRouter from './api';

// import environmental variables from our variables.env file
require('dotenv').config({ path: 'variables.env' });

const app = express();

//set our port to either a predetermined port number if you have set it up, or 3001
const port = process.env.API_PORT || 3001;

// Connect to our Database 
mongoose.connect(process.env.DATABASE);

// converts raw requests into usable properties on req.body
// This object will contain key-value pairs, where the value can be a string or array (when extended is false), or any type (when extended is true).
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true})); 
//app.use('/api', apiRouter);
app.get('/', (req, res) => {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello World\n');
});

//starts the server and listens for requests
app.listen(port, function() {
  console.log(`api running on port ${port}`);
});