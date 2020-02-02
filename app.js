var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var postRouter = require('./routes/posts');

var session = require('express-session');

// restful api route
var apiUsersRouter = require('./api/routes/users');
var apiPostsRouter = require('./api/routes/posts');
var apiAdminRouter = require('./api/routes/admin');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret:'Nodet76tgy767%^&*&YINB',
  resave:false,
  saveuninitialized:true

}))
// mongoose.connect('mongodb://127.0.0.1/mynodejs007');
mongoose.connect('mongodb+srv://maythaw:maythaw123@nodejs007-kplii.mongodb.net/test?retryWrites=true&w=majority');

var db= mongoose.connection;
db.on('error',console.error.bind(console,'MongoDB connection error:'));

app.use(function(req,res,next){
  res.locals.user = req.session.user;
  next();
});
app.use('/', indexRouter);
app.use('/api',apiAdminRouter);
app.use('/api/users',apiUsersRouter);
app.use('/api/posts',apiPostsRouter);
app.use(function(req,res,next){
  if(req.session.user){
    next();
  }else{
    res.redirect('/signin');
  }
})
app.use('/users', usersRouter);
app.use('/posts',postRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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

module.exports = app;
