import express from 'express';
import jwt from 'jsonwebtoken';  
import crypto from 'crypto';

import User from '../models/user';
import { setUserInfo } from '../helpers';
import { requireLogin } from '../middleware/auth';

const router = express.Router();

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
          profile: { firstName: firstName, lastName: lastName }
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
    const userInfo = setUserInfo(req.user);
    
      res.status(200).json({
        token: `JWT ${generateToken(userInfo)}`,
        user: userInfo
      });
 });

 export default router;