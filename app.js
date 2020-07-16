var express = require('express');
const mongoose = require('mongoose');
var url = 'mongodb://localhost:27017/student'

var homepage = require('./routes/home');
var studentRouter = require('./routes/student');
var courseRouter = require('./routes/course');
var enrolmentRouter = require('./routes/enrolment');
// var reportRouter = require('./routes/student')


var app = express();
mongoose.connect(url , {useNewUrlParser: true, useUnifiedTopology: true});
const connection = mongoose.connection;
connection.once('open', ()=>{
    console.log('mongodb connected !')
})

// view engine setup
app.set('views', 'views');
app.set('view engine', 'jade');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

app.use('/', homepage);
app.use('/students', studentRouter);
app.use('/courses', courseRouter);
app.use('/enrolments', enrolmentRouter);

module.exports = app;
