var createError  = require('http-errors');
var express      = require('express');
var path         = require('path');
var cookieParser = require('cookie-parser');
var logger       = require('morgan');
var mongoose     = require("mongoose");

var indexRouter   = require('./routes/index');
var usersRouter   = require('./routes/users');
var queryRouter   = require("./routes/query");
var querydirector = require("./routes/director");

const Schema_Director = require('./models/nedirecmodel');



var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

mongoose.connect('mongodb://localhost:27017/movie',);

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('connected', function() {
  console.log("oppense")
});



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/query', queryRouter);
app.use('/director', querydirector);
app.use('/check', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  console.log(err)

  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
