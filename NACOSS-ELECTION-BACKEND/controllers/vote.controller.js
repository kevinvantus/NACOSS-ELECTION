// jshint esversion:8
const debug = require('debug')('app:authController');
const { Candidate } = require('../models/candidate.model');

const voteController = () => {
  const getIndex = async (req, res) => {
    try {
      const candidates = await Candidate.find({});
      debug(candidates);
      return res.json({
        status: 'success',
        message: 'candidates fetch successful',
        candidates
      });
    } catch (error) {
      return res.json({
        status: 'failed',
        message: 'candidates fetch unsuccessful',
        error
      });
    }
  };

  const postVote = (req, res) => {
    debug(req.body);
    res.json({
      message: 'You\'ve reached the post vote endpoint'
    });
  };

  const middleware = (req, res, next) => {
    if (req.session.passport.user) {
      debug(req.session.passport.user);
      return next();
    } else {
      return res.status(401).json({
        status: 'failed',
        message: 'Unauthorized'
      });
    }
  };

  return {
    getIndex,
    postVote,
    middleware
  };
};

module.exports = voteController();