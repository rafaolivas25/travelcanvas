var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/usersroutes');
var labelsRouter = require('./routes/Labelsroutes');
var countryRouter = require('./routes/countryroutes');
var blogRouter = require('./routes/blogroutes');
var subRouter = require('./routes/subroutes');
var catgRouter = require('./routes/catgroutes');
var tagsRouter = require('./routes/tagsroutes');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/labels', labelsRouter);
app.use('/api/country', countryRouter);
app.use('/api/blog', blogRouter);
app.use('/api/sub', subRouter);
app.use('/api/catg',catgRouter);
app.use('/api/tags',tagsRouter);

module.exports = app;
