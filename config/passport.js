import passport from 'passport';  
import User from '../models/user';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import LocalStrategy  from 'passport-local';
require('dotenv').config({ path: 'variables.env' })

const localOptions = { usernameField: 'email' }; 

// Setting up local login strategy
const localLogin = new LocalStrategy(localOptions, function(email, password, done) {  
    User.findOne({ email: email }, function(err, user) {
      if(err) { return done(err); }
      if(!user) { return done(null, false, { error: 'Your login details could not be verified. Please try again.' }); }
  
      user.comparePassword(password, function(err, isMatch) {
        if (err) { return done(err); }
        if (!isMatch) { return done(null, false, { error: "Your login details could not be verified. Please try again." }); }
  
        return done(null, user);
      });
    });
  });

const jwtOptions = {  
  // Telling Passport to check authorization headers for JWT
  jwtFromRequest: ExtractJwt.fromAuthHeader(),
  // Telling Passport where to find the secret
  secretOrKey: process.env.SECRET
};

// Setting up JWT login strategy
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
  User.findById(payload._id, function(err, user) {
    if (err) { return done(err, false); }

    if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  });
});

passport.use(jwtLogin);  
passport.use(localLogin); 