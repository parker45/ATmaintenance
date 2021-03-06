var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var adminRouter = require('./routes/admin');
var adminFormRouter = require('./routes/admin_form');
var newTaskRouter = require('./routes/new_task');
var reviewTaskRouter = require('./routes/review_task');

var tasksRouter = require('./routes/tasks');
var taskDetailRouter = require('./routes/task_detail');

var reportRouter = require('./routes/report');

var databaseRouter = require('./routes/database');
var compression = require('compression');
var helmet = require('helmet')

var app = express();
//Set up mongoose connection
var mongoose = require('mongoose');
var dev_db_url = 'mongodb+srv://admin:admin@cluster0-f6biw.mongodb.net/test?retryWrites=true';
var mongoDB = process.env.MONGODB_URK || dev_db_url;
mongoose.connect(mongoDB, { useNewUrlParser: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(compression());
app.use(helmet())
app.use(express.static(__dirname + "/public"));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/database', databaseRouter);

app.use('/admin', adminRouter);
app.use('/admin_form', adminFormRouter);
app.use('/new_task', newTaskRouter);
app.use('/review_task', reviewTaskRouter);

app.use('/tasks', tasksRouter);
app.use('/task_detail', taskDetailRouter);

app.use('/report', reportRouter);


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
