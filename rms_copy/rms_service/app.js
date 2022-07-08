var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var bodyParser =require('body-parser');

//var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var commonRouter = require('./routes/common');
var uploadRouter = require('./routes/upload');


var app = express();
var cors = require('cors');
app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(session({
    secret: 'Zcx%cPa2#=_@H8G',
    resave: false,
    saveUninitialized: true,
  }))
  
  app.use(express.urlencoded({ extended: false }));
 
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'uploads')));
//app.use(express.static(path.join(__dirname, 'public')));

app.use( '/rms/',express.static(path.join(__dirname, 'dist')));
//app.use(express.static(path.join(__dirname, 'dist')));

app.use('/', commonRouter);
app.use('/users', usersRouter);
app.use('/upload', uploadRouter);
app.use((err,req,res,next) => {
res.status(500).send('Some Error Occured');
});

module.exports = app;
