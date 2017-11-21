import mongoose, { Schema } from 'mongoose';    
import bcrypt from 'bcrypt-nodejs';
const md5 = require('md5'); // for gravatar

const UserSchema = new Schema({  
    email: {
      type: String,
      lowercase: true,
      unique: true,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    profile: {
      firstName: { type: String },
      lastName: { type: String },
      role: { type: String, default: 'user' }
    },
    resetPasswordToken: { type: String },
    resetPasswordExpires: { type: Date }
  },
  {
    timestamps: true
  });

// Pre-save of user to database, hash password if password is modified or new
UserSchema.pre('save', function(next) {  
    const user = this,
          SALT_FACTOR = 5;
  
    if (!user.isModified('password')) {
      return next(); 
    } else
  
    bcrypt.genSalt(SALT_FACTOR, function(err, salt) {
      if (err) return next(err);
  
      bcrypt.hash(user.password, salt, null, function(err, hash) {
        if (err) return next(err);
        user.password = hash;
        console.log(user.password)
        next();
      });
    });
  });


  // Method to compare password for login
UserSchema.methods.comparePassword = function(candidatePassword, cb) {  
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
      if (err) { return cb(err); }
  
      cb(null, isMatch);
    });
}

UserSchema.virtual('gravatar').get(function(){
  
  const hash = md5(this.email);
  console.log(`https://gravatar.com/avatar/${hash}?s=200`);
  return `https://gravatar.com/avatar/${hash}?s=200`;
})

export default mongoose.model('User', UserSchema);