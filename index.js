var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var languageList = require('./lib/languageList.js');
var handlebars = require('express-handlebars');
var session = require('express-session');
var mongoose = require('mongoose');

var app = new express();

//configure app
app.set('port', process.env.PORT || 3000);
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({secret: 'taco cat'}));
app.use('/api', require('cors')());

//connect to mongodb
var connectionString = 'mongodb://<username>:<password>@ds145245.mlab.com:45245/itc298';
mongoose.connect(connectionString);

//set handlebars as templating engine
var viewsPath = __dirname + '/views';
var hbs = handlebars.create({ defaultLayout: 'main', layoutsDir: viewsPath + '/layouts', partialsDir: viewsPath + '/partials', extname: '.hbs'});
app.engine('hbs', hbs.engine);
app.set('views', viewsPath );
app.set('view engine', 'hbs');

var routes = require('./routes/routes.js')(app);
var api = require('./routes/api.js')(app);

///handle 404 errors
app.use(function(req, res){
	res.type('text/plain');
	res.status(404).send('404 - file not found :(');
});


/**START SERVER**/
app.listen(app.get('port'), function(){
	console.log('express server started');
});