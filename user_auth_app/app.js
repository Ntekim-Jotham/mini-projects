var createError = require('http-errors');
var express = require('express');
// var favicon = require('serve-favicon');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


var session = require('express-session');
var flash = require('connect');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const todoRouter = require("./routes/todo"); 


var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/auth-users', { useNewUrlParser: true }, { useUnifiedTopology: true });
require("./models/Users");

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'aSASFEZVBSRDFGGJDTRYTUKLIUKDJDSAds',
  resave: true,
  saveUninitialized: false
}));

// app.use(userModel());
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/todo', todoRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


app.listen(3000, function () {
  console.log('App listening on port 3000!')
});

module.exports = app;
