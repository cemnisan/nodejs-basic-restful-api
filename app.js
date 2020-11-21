const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const db = require('./db/db')()

const tokenRouter = require('./routes/token');
const indexRouter = require('./routes/index');
const movieRouter = require('./routes/movie');
const DirectorRouter = require('./routes/director');

// Config
const config = require('./config')

//Middleware
const VerifyToken = require('./middleware/verify-token')

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.set('api_secret_key',config.api_secret_key);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/api',VerifyToken);

app.use('/', indexRouter);
app.use('/',tokenRouter);
app.use('/api/movies', movieRouter);
app.use('/api/directors',DirectorRouter);

// catch 404 and forward to error handler
app.use((req, res, next) =>{
  next(createError(404));
});

// error handler
app.use((err, req, res, next) =>{
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
