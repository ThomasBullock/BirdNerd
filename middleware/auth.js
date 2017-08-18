// Middleware to require login/auth
import passport from 'passport';
require('../config/passport');
export const requireAuth = passport.authenticate('jwt', { session: false });  
export const requireLogin = passport.authenticate('local', { session: false }); 