const { User } = require('../models/user.model');
const passport = require('passport');
require('./strategies/passport-local');

const passportInit = () => {
  passport.serializeUser(function(user, done) {
    done(null, user.matNo);
  });

  passport.deserializeUser(function(matNo, done) {
    User.findOne({ matNo }, (err, user) => {
      if(err) {
        return done(err, false);
      }
      return done(null, user);
    });
  });
};

module.exports = passportInit;