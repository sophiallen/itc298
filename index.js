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
	var footer = '<a href="home.html">Return to home page.</a>'

	var searchResult = languageList.searchSupported(searchTerm);

	res.status(200).send(header + searchResult + footer);
});


app.post('/addLang', function(req, res){
	res.type('text/html');
	var langName = req.body.lang_name;
	var langEngine = req.body.engine;
	var success = languageList.addLang(langName, langEngine);
	var footer = '<a href="home.html">Return to home page.</a>'

	if (success){
		res.status(200).send('Successfully added ' + langName + ' to our list of supported languages. ' + footer);
	} else {
		res.status(200).send('An error occurred, unable to add language to our list. Check that the language you tried to add is not already on our list.' + footer);
	}
});

app.post('/deleteLang', function(req, res){
	res.type('text/html');
	var langName = req.body.lang_name;
	var success = languageList.deleteLang(langName);
	var footer = '<a href="home.html">Return to home page.</a>'

	if (success){
		res.status(200).send('Successfully deleted ' + langName + ' from our list of supported languges. ' + footer);
	} else {
		res.status(200).send('Unable to delete ' + langName + '. Check that the language exists in our list of languages. ' + footer);
	}
});

app.post('/updateLang', function(req, res) {
	res.type('text/html');
	var langName = req.body.lang_name;
	var newName = req.body.new_name;
	var newEngine = req.body.new_engine;

	var success = languageList.updateLang(langName, newName, newEngine);
	var footer = '<a href="home.html">Return to home page.</a>';

	if (success) {
	res.status(200).send("Successfully updated our records of " + newName + '.' + footer);
	} else {
		res.status(200).send("An error occurred. Check that " + langName + " exists in our records. " + footer);
	}
});

///handle 404 errors
app.use(function(req, res){
	res.type('text/plain');
	res.status(404).send('404 - file not found :(');
});


//start server
app.listen(app.get('port'), function(){
	console.log('express server started');
});




