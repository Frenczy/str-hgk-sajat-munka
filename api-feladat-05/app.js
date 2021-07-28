var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const swaggerUi = require('swagger-ui-express')
const YAML = require('yamljs')
const swaggerDocument = YAML.load('./docs/swagger.yaml')


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var personRouter = require('./routes/person');

var app = express();

const mongoose = require('mongoose')
mongoose.Promise = global.Promise

var mongoDB = 'mongodb://localhost:27017/na'
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true})
var database = mongoose.connection
database.on('error', console.error.bind(console, 'MongoDB connection error:'))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/person', personRouter);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// hibakezelés
app.use(function(err, req, res, next) {
  res.status(err.statusCode);
  res.json({hasError:true, message: err.message})

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
