var _ = require('underscore');
var $ = require('jquery');
var express = require('express');
var app = express();
var path = require('path');
var expressLayouts = require('express-ejs-layouts');
app.set('port', (process.env.PORT || 5000));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.use(express.static(__dirname + '/'));
app.get('/', function (request, response) {
response.render('index', { title: 'Analizador lexico' });
});

app.get('/test/', function (request, response) {
response.render('test', { title: 'Analizador lexico' });
});

app.listen(app.get('port'), function () {
console.log("Node app is running at localhost:" + app.get('port'));
});