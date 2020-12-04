const { User } = require('../../models/user.model');
const debug = require('debug')('app:passport-local');
const bcrypt = require('bcrypt');
const createError = require('http-errors');
const passport = require('passport'),
  { Strategy } = require('passport-local');


passport.use(new Strategy(
  {
    usernameField: 'matNo',
    passwordField: 'password',
    session: true,
    passReqToCallback: true
  },
  async function (req, matNo, password, done) {
    debug(matNo);
    debug(password);
    if(!matNo || !password) {
      const error = createError(400, 'One or more fields missing');
      return done(error, false);
    }
    User.findOne({ matNo }, async (err, user) => {
      if(err) {
        return done(err, false, { message: 'Incorrect matric number or password' });
      }
      if (!user) {
        return done(null, false, { message: 'Incorrect matric number or password' });
      }
      if (user && user.isFirstLogin) {
        debug(user);
        if (user.password === password) {
          req.session.cookie.path = '/';
          req.session.cookie.maxAge = 300000;
          return req.logIn(user, (err) => {
            if (!err) {
              return done(null, user, { message: 'Login Successful!' });
            }
            return done(err, user, { message: 'An error occured' });
          });
        } else {
          return done(null, false, { message: 'Incorrect matric number or password' });
        }
      }
  
      if (user && !user.isFirstLogin) {
        try {
          if (await bcrypt.compare(password, user.password)) {
            req.session.cookie.path = '/';
            req.session.cookie.maxAge = 300000;
            return req.logIn(user, (err) => {
              if (!err) {
                return done(null, user, { message: 'Login Successful!' })
              }
              return done(err, user, { message: 'An error occured' });
            });
          } else {
            return done(null, false, { message: 'Incorrect matric number or password' });
          }
        } catch (error) {
          debug(error);
          return done(error, false, { message: 'An error occured' });
        }
      }
    });
  }
));