import express from 'express';
import jwt from 'jsonwebtoken';  
import crypto from 'crypto';

import User from '../models/user';
import { setUserInfo } from '../helpers';
import { requireLogin } from '../middleware/auth';
import bcrypt from 'bcrypt-nodejs';

// console.log(process.env.NODE_ENV)
// import  mail } from '../config/mail'; 
const postmark = require("postmark");
const nodemailer = require('nodemailer');
const router = express.Router();
const md5 = require('md5'); // for gravatar

const transport = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  }
});    

function generateToken(user) {  
    return jwt.sign(user, process.env.SECRET, {
        expiresIn: 10080 // in seconds
    });
}

router.post('/register', (req, res, next) => {
    const email = req.body.email;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const password = req.body.password;
    const gravatar =`https://gravatar.com/avatar/${md5(email)}?s=200`;
  
    // Return error if no email provided
    if (!email) {
      return res.status(422).send({ error: 'You must enter an email address.'});
    }
  
    // Return error if full name not provided
    if (!firstName || !lastName) {
      return res.status(422).send({ error: 'You must enter your full name.'});
    }
  
    // Return error if no password provided
    if (!password) {
      return res.status(422).send({ error: 'You must enter a password.' });
    }
  
    User.findOne({ email: email }, function(err, existingUser) {
        if (err) { return next(err); }
  
        // If user is not unique, return error
        if (existingUser) {
          return res.status(422).send({ error: 'That email address is already in use.' });
        }
  
        // If email is unique and password was provided, create account
        let user = new User({
          email: email,
          password: password,
          profile: { firstName: firstName, lastName: lastName, gravatar: gravatar }
        });
  
        user.save(function(err, user) {
          if (err) { return next(err); }
  
          // Subscribe member to Mailchimp list
          // mailchimp.subscribeToNewsletter(user.email);
  
          // Respond with JWT if user was created
  
          let userInfo = setUserInfo(user);
  
          res.status(201).json({
            token: 'JWT ' + generateToken(userInfo),
            user: userInfo
          });
        });
    });
  
});

 // Login route
 router.post('/login', requireLogin, (req, res, next) => {
    console.log(req.body)
    const userInfo = setUserInfo(req.user);
    
      res.status(200).json({
        token: `JWT ${generateToken(userInfo)}`,
        user: userInfo
      });
 });
 
router.post('/forgot', (req, res) => {
  console.log(req.body)
  const email = req.body.email;
  User.findOne({ email: email }, function(err, user) {
    if (err) { return next(err); } 
    
    if(user) {
      console.log(user)
      user.resetPasswordToken = crypto.randomBytes(20).toString('hex');
      user.resetPasswordExpires = Date.now() + 3600000; // 1 hour from now
      user.save();
      // const baseUrl = 'localhost:3000' // ${req.headers.host}
      const baseUrl = (process.env.NODE_ENV === 'production') ? 'http://birdnerd.club' : 'http://localhost:3000';      
      const resetURL = `${baseUrl}/account/reset/${user.resetPasswordToken}`
            
      const mailOptions = {
        from: 'BirdNerd <talk@tbullock.net>', 
        to: user.email,
        subject: 'Reset your BirdNerd password',
        text: resetURL  
      }
      
      transport.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: ', info.messageId);        
      })      
      
      console.log(resetURL)
      res.status(200).end()
    }   
  })
});
 
router.post('/reset', (req, res) => {
  console.log('the token is =====',  req.body.token)

  const token = req.body.token;

  User.findOne({ 
    resetPasswordToken: token,
    resetPasswordExpires: {$gt: Date.now() } 
  }, function(err, user) {
    if (err) { return next(err); } 
    console.log(user)
    if(!user && typeof user === 'object') {
      console.log('we are in the null catch')
      return res.status(404).end();
    } else {
      console.log('user is ===', user)
      return res.status(200).json({ user: user })      
    }
    

  })    
});

router.post('/changepassword', (req, res, next) => {
  
  console.log(req.body.password.password)
  // const encryptPassword = bcrypt.hashSync(req.body.password.password, 5);
  const updates = {
    password: req.body.password.password,
    resetPasswordToken: undefined,
    resetPasswordExpires: undefined
  }
  
  User.findOne( { _id: req.body.user._id }, function(err, user) {
    if (err) { return next(err); }
    
    if(user) {
      user.password = req.body.password.password;
      user.resetPasswordToken = undefined;
      user.resetPasswordExpires = undefined;
      user.save()      
      return res.status(200).end();
    }
  })
  
})

 export default router;