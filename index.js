var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var languageList = require('./components/languageList.js');

var app = new express();

//use environment port or default to port 3000
app.set('port', process.env.PORT || 3000);

//use public folder to serve static files
app.use(express.static('public'));

//body parser for url query strings
app.use(bodyParser.urlencoded({extended: true}));

//home page
app.get('/', function(req, res){
	res.setHeader('Content-Type', 'text/html');
	var options = {root: __dirname + '/public'};
	res.status(200).sendFile('home.html', options);
});

//about page
app.get('/about', function(req, res){
	res.type('text/html');
	var options = {root: __dirname + '/public'};
	res.status(200).sendFile('about.html', options);
});

app.post('/search', function(req, res){
	res.type('text/html');
	var searchTerm = req.body.search_term;
	
	var header = 'Searching for: ' + searchTerm + '<br/>';

	//test new languagelist methods, print results in console...
	var success = languageList.addLang('english', 'yandex');
	console.log(success, 'languages: ' + languageList.getAllLangs());

	var searchResult = languageList.searchSupported(searchTerm);

	res.status(200).send(header + searchResult);
});

//handle 404 errors
app.use(function(req, res){
	res.type('text/plain');
	res.status(404).send('404 - file not found :(');
});


//start server
app.listen(app.get('port'), function(){
	console.log('express server started');
});




