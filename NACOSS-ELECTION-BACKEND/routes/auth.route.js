const authRouter = require('express').Router();
const authController = require('../controllers/auth.controller');
const passport = require('passport');
const debug = require('debug')('app:auth-route');

const routes = () => {
  const {
    getIndex,
    changePassword
  } = authController;

  authRouter.route('/login')
    .get(getIndex)
    .post(passport.authenticate('local'), (req, res) => {
      return res.json({
        status: 'success',
        message: 'Login successful'
      });
    });

  authRouter.route('/change-pwd')
    .post(changePassword);

  authRouter.route('/logout')
    .get((req, res) => {
      req.logOut();
      return res.redirect('/auth/login');
    });

  return authRouter;
};

module.exports = routes;