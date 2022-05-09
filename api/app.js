var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var expressValidator = require('express-validator');
var flash = require('express-flash');
var session = require('express-session');
var bodyParser = require('body-parser');
var Sequelize = require('sequelize');
var app = express();
const cors = require('cors');
var mysql = require('mysql');
var connection = require('./connections/database');
var indexRouter = require('./routes/index');
var homeRouter = require('./routes/home');
var usersRouter = require('./routes/users');
var bacRouter = require('./routes/bac');
var diplomesRouter = require('./routes/diplomes');
var curDateRouter = require('./routes/date');
var filsCRouter = require('./routes/filsC');
var filsPostulerRouter=require('./routes/filApostuler');
var userFormRouter=require('./routes/form');
//database connection
connection
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(cors({ origin: '*' }));
app.use(logger('dev'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: '123456cat',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }
}))

app.use(flash());
app.use(expressValidator());

app.use('/', indexRouter);
app.use('/fils', homeRouter);
app.use('/user', usersRouter);
app.use('/bacs', bacRouter);
app.use('/diplomes', diplomesRouter);
app.use('/curDate', curDateRouter);
app.use('/filsC', filsCRouter);
app.use('/filspourpostuler', filsPostulerRouter);
app.use('/candidatData', userFormRouter);





// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
app.listen(3000, () => console.log("server is Up"));
module.exports = app;