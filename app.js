var createError = require('http-errors');
var express = require('express');
const expressEdge = require('express-edge');


var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require("mongoose");
const cors = require('cors');
const port = process.env.PORT || 3000

var indexController = require('./controllers/index');
var transferMoneyController = require('./controllers/transferMoney');
var sendmoneyController = require('./controllers/sendmoney');
var transferhistoryController = require('./controllers/transferhistory')


mongoose
    .connect("mongodb+srv://admin:aditya@004@sparksinternshipbank.jbegy.mongodb.net/bank?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB..."))
    .catch(err => console.error("Could not connect to MongoDB...", err));


var app = express();

app.set('views', path.join(__dirname, 'views'));
app.use(expressEdge.engine);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());


app.use('/', indexController);
app.use('/transfermoney', transferMoneyController);
app.post('/transaction/activity', sendmoneyController);
app.get('/history', transferhistoryController);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});
app.listen(port, () => console.log(`Listening on port ${port}`)) // error handler
app.use(function(err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;