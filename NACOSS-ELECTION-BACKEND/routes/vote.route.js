const voteRouter = require('express').Router();
const voteController = require('../controllers/vote.controller');

const routes = () => {
  const {
    getIndex,
    postVote,
    middleware
  } = voteController;

  voteRouter.use(middleware);
  voteRouter.route('/')
    .get(getIndex)
    .post(postVote);

  return voteRouter;
};

module.exports = routes;