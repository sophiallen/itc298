var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var languageList = require('./lib/languageList.js');
var handlebars = require('express-handlebars');
var session = require('express-session');

var app = new express();

//configure app
app.set('port', process.env.PORT || 3000);
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({secret: 'taco cat'}));

//set handlebars as templating engine
var viewsPath = __dirname + '/views';
var hbs = handlebars.create({
	defaultLayout: 'main', 
	layoutsDir: viewsPath + '/layouts',
	partialsDir: viewsPath + '/partials',
	extname: '.hbs'
});

app.engine('hbs', hbs.engine);
app.set('views', viewsPath );
app.set('view engine', 'hbs');

/** ROUTES **/
app.get('/', function(req, res){
	res.setHeader('Content-Type', 'text/html');

	if (req.session.feedback){
		var changeData = {
			'color' : req.session.feedback.success? 'lightgreen' : 'lightpink',
			'msg' : req.session.feedback.msg
		}

		//clear any feedback
		req.session.feedback = null;
	}
	res.render('home', {title: 'Main', langs: languageList.getAllLangs(), 'changes': changeData});
});

//Detail Page
app.get('/languages/:lang', function(req, res){
	var lang = req.params.lang;
	var searchResult = languageList.getLangDetail(lang);
	res.render('detail', {title: lang, language: searchResult});
});

//About the app page
// app.get('/about', function(req, res){
// 	res.type('text/html');
// 	var options = {root: __dirname + '/public'};
// 	res.status(200).sendFile('about.html', options);
// });


app.post('/search', function(req, res){
	res.type('text/html');
	var searchTerm = req.body.search_term;
	var searchResult = languageList.getLangDetail(searchTerm);
	if (searchResult){
		res.redirect('/languages/' + searchResult.name);
		req.session.feedback = false;
	} else {
		req.session.feedback = {'success': false, 'msg' : 'unable to find ' + searchTerm + ' in our records.'};
		res.redirect('/');
	}
});


app.post('/addLang', function(req, res){
	res.type('text/html');
	var langName = req.body.lang_name;
	var langEngine = req.body.engine;
	var success = languageList.addLang(langName, langEngine);
	var footer = '<a href="/">Return to home page.</a>'

	if (success){
		res.status(200).send('Successfully added ' + langName + ' to our list of supported languages. ' + footer);
	} else {
		res.status(200).send('An error occurred, unable to add language to our list. Check that the language you tried to add is not already on our list.' + footer);
	}
});

app.post('/languages/delete/:lang', function(req, res){
	res.type('text/html');
	var langName = req.params.lang;
	var success = languageList.deleteLang(langName);
	var footer = '<a href="/">Return to home page.</a>'

	if (success){
		console.log("successful deleted: " + langName);
		res.status(200).redirect('/');
	} else {
		res.status(200).send('Unable to delete ' + langName + '. Check that the language exists in our list of languages. ' + footer);
	}
});

app.post('languages/:language/updateLang', function(req, res) {
	res.type('text/html');
	var langName = req.params.language;
	console.log(langName);
	//var langName = req.body.lang_name;
	var newName = req.body.new_name;
	var newEngine = req.body.new_engine;
	var users = req.body.new_userNum;

	var success = languageList.updateLang(langName, newName, newEngine, users);
	var footer = '<a href="/">Return to home page.</a>';

	if (success) {
	res.status(200).send("Successfully updated our records of " + newName + '.' + footer);
	} else {
		res.status(200).send("An error occurred. Check that " + langName + " exists in our records. " + footer);
	}
});

///handle 404 errors
app.use(function(req, res){
	res.type('text/plain');
	console.log(req.params);
	res.status(404).send('404 - file not found :(');
});


/**START SERVER**/
app.listen(app.get('port'), function(){
	console.log('express server started');
});