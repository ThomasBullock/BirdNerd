'use strict';

import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import apiRouter from './api';
import authRouter from './auth';

import Bird from './models/bird';

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

app.get('/', function(request, response) {
  console.log('Home page visited!');
  const filePath = path.resolve(__dirname, './build', 'index.html');

  // read in the index.html file
  fs.readFile(filePath, 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }
    
    // replace the special strings with server generated strings
    data = data.replace(/\$OG_TITLE/g, 'Bird Nerd App');
    data = data.replace(/\$OG_DESCRIPTION/g, "BirdNerd is a free photo sharing site for Birdwatchers. Within this site you can view photos, sighting locations and general bird information.");
    result = data.replace(/\$OG_IMAGE/g, 'https://cdn.dribbble.com/users/224707/screenshots/1966613/birdnerd.jpg');
    response.send(result);
  });
});

app.get('/bird/:birdSlug', function(request, response) {
  const birdSlug = request.params.birdSlug;
  const filePath = path.resolve(__dirname, './build', 'index.html')
  fs.readFile(filePath, 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }
    data = data.replace(/\$OG_TITLE/g, `Bird: ${birdSlug}`);

    Bird.findOne( { slug: birdSlug } ) 
        .exec()
        .then(data => {
          data = data.replace(/\$OG_DESCRIPTION/g, `${data.comments}`);
          result = data.replace(/\$OG_IMAGE/g, `${data.imageUrl}`);
          response.send(result);
        })
        .catch(err => {
            console.log(err);
            res.json(err);
        });
  });
});

// app.get('/contact', function(request, response) {
//   console.log('Contact page visited!');
//   const filePath = path.resolve(__dirname, './build', 'index.html')
//   fs.readFile(filePath, 'utf8', function (err,data) {
//     if (err) {
//       return console.log(err);
//     }
//     data = data.replace(/\$OG_TITLE/g, 'Contact Page');
//     data = data.replace(/\$OG_DESCRIPTION/g, "Contact page description");
//     result = data.replace(/\$OG_IMAGE/g, 'https://i.imgur.com/V7irMl8.png');
//     response.send(result);
//   });
// });

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
});

//starts the server and listens for requests
app.listen(port, function() {
  console.log(`api running on port ${port} in ${process.env.NODE_ENV}`);
});