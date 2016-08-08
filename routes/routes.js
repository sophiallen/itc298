var languageList = require('./../lib/languageList.js');
var languagesCtrl = require('./../controller/transl8.server.controller.js');


/*Function to format feedback div 
depending on the success of the action requested.*/
function formatFeedback(feedback){
	return  {
		'color': feedback.success ? 'lightgreen': 'lightpink',
		'msg': feedback.msg
	}
}


module.exports = function(app){
	//Main page
	app.get('/', function(req, res){
		res.setHeader('Content-Type', 'text/html');

		//format feedback message, if changes have occurred.
		var changeData = req.session.feedback ? formatFeedback(req.session.feedback) : null;

		//clear feedback
		req.session.feedback = null;

		//Get updated list of languages from database, render home page with updates. 
		languagesCtrl.getLangNames(req, res, changeData);
	});

	//Detail Page
	app.get('/languages/:lang', function(req, res){
		//format feedback if any was given.
		var changeData = req.session.feedback ? formatFeedback(req.session.feedback) : null;
		
		//clear feedback 
		req.session.feedback = null;

		//Get details from db, render detail view. 
		languagesCtrl.getDetail(req, res, req.params.lang, changeData);
	});

	//Search requests, redirects to detail view or back to home page with and error message.
	app.post('/search', function(req, res){
		languagesCtrl.getDetail(req, res, req.body.search_term, null);
	});

	//Create and save new language to databse, will redirect to home page. 
	app.post('/newLang', function(req, res){
		return languagesCtrl.create(req, res);
	});

	//Delete language requests, redirect to home page. Note: error/success message not working yet.
	app.post('/languages/delete/:lang', function(req, res){
		return languagesCtrl.removeLang(req, res);
	});

	//Update language, redirects to updated info with error/success message.
	app.post('/languages/update/:language', function(req, res) {
		return languagesCtrl.update(req, res);
	});

	//About the app page
	app.get('/about', function(req, res){
		res.render('about', {title: 'About'});
	});
}