var express  = require('express');
var app      = express();
var port     = process.env.PORT || 8080;
var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');

var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');

var configDB = require('./config/database.js');

//database connection
mongoose.connect(configDB.url); 

require('./config/passport')(passport); // pass passport

//express app
app.use(morgan('dev')); //log request 
app.use(cookieParser()); //read cookies 
app.use(bodyParser.json()); //get info
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs'); //ejs view engine

//passport
//app.use(session({ secret: 'Tonygamer' })); //session secret
app.use(session({
  secret: 'Tonygamer',
  resave: true,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session()); 
app.use(flash()); 

//routes 
require('./app/routes.js')(app, passport); 

//port
app.listen(port);
console.log('Listen ' + port);
