var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var mongoose = require('mongoose');
// var keys = require('./keys.js');

var app = new express();

//configure app
app.set('port', process.env.PORT || 3000);
app.use(express.static('app'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use('/api', require('cors')());


//Routes
var api = require('./routes/api.js')(app);
var routes = require('./routes/routes.js')(app);

/**START SERVER**/
app.listen(app.get('port'), function(){
	console.log('express server started');
});