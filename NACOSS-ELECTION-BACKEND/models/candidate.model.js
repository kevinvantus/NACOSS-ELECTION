const { Schema, model } = require('mongoose');

const candidateSchema = new Schema({
  candidateMatNo: {
    type: String,
    required: [1, 'Matric number is required']
  },
  post: {
    type: String,
    required: [1, 'Candidate post is required']
  },
  votes: {
    type: Number,
    required: [1, 'Votes is required']
  }
});

const Candidate = model('Candidate', candidateSchema);

module.exports = { Candidate };