// jshint esversion:8
// Initialize variables
const http = require('http');
const express = require('express');
const mongoose = require('mongoose');
const debug = require('debug')('app:app.js');
const path = require('path');
const session = require('express-session');
const authRoutes = require('./routes/auth.route');
const voteRoutes = require('./routes/vote.route');
const { nanoid } = require('nanoid');
const PDFDocument = require('pdfkit');
const passport = require('passport');
const fs = require('fs');

const users = [
  {
    id: 1,
    matNo: '2017/5766',
    department: '',
    gender: '',
    phone: '',
    password: 'backend',
    firstLogin: true,
    hasVoted: false
  },
  {
    id: 2,
    matNo: '2017/5746',
    department: '',
    gender: '',
    phone: '',
    password: 'android',
    firstLogin: true,
    hasVoted: false
  },
  {
    id: 1,
    matNo: '2018/6333',
    department: '',
    gender: '',
    phone: '',
    password: 'frontend',
    firstLogin: true,
    hasVoted: false
  }
];

function generatePasswords(users) {
  const pdfDoc = new PDFDocument();
  pdfDoc.pipe(fs.createWriteStream('users.pdf'));
  let fileContent = '';
  for(let user of users) {
    user.password = nanoid(10);
    fileContent += `Matric Number: ${user.matNo} | Password: ${user.password}\n\n`;
  }

  pdfDoc.text(fileContent);
  pdfDoc.end();
  return users;
}

const app = express();

const sess = {
  secret: 'LOL',
  resave: false,
  saveUninitialized: false,
  cookie: {}
};

if (app.get('env') === 'production') {
  app.set('trust proxy', 1); // trust first proxy
  sess.cookie.secure = true; // serve secure cookies
}

// App configuration
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
mongoose.connect('mongodb://localhost:27017/nacossDB', { useFindAndModify: true, useNewUrlParser: true, useUnifiedTopology: true });
app.use(session(sess));
app.use(passport.initialize());
app.use(passport.session());
require('./controllers/passport')();
app.set('view engine', 'ejs');
app.use('/auth', authRoutes());
app.use('/vote', voteRoutes());



app.get('/', (req, res) => {
  debug(req.ip);

  generatePasswords(users);
  res.render('index');
});

app.get('**', (req, res) => {
  res.redirect('/');
});

const server = http.createServer(app);

server.listen(8080, () => {
  debug('App started on port 8080');
});


