var languageList = require('./../lib/languageList.js');
var languagesCtrl = require('./../controller/transl8.server.controller.js');

module.exports = function(app){
	//Main page
	app.get('/', function(req, res){
		res.setHeader('Content-Type', 'text/html');
		var changeData = null;

		//format feedback message, if changes have occurred.
		if (req.session.feedback){
			var changeData = {
				'color' : req.session.feedback.success? 'lightgreen' : 'lightpink',
				'msg' : req.session.feedback.msg
			};

			//clear any feedback
			req.session.feedback = null;
		}

		//Get updated list of languages from database, render home page with updates. 
		languagesCtrl.getLangNames(req, res, changeData);
	});

	//Detail Page
	app.get('/languages/:lang', function(req, res){
		var lang = req.params.lang;
		var searchResult = languageList.getLangDetail(lang);
		if (req.session.feedback){
			var changeData = {
				'color': req.session.feedback.success ? 'lightgreen': 'lightpink',
				'msg': req.session.feedback.msg
			}
			req.session.feedback = null;
		}
		res.render('detail', {title: lang, language: searchResult, changes: changeData});
	});

	//Search requests, redirects to results or back to home page with and error message.
	app.post('/search', function(req, res){
		res.type('text/html');
		var searchTerm = req.body.search_term;
		var searchResult = languageList.getLangDetail(searchTerm);

		if (searchResult){
			res.redirect('/languages/' + searchResult.name);
		} else {
			req.session.feedback = {'success': false, 'msg' : 'Unable to find ' + searchTerm + ' in our records.'};
			res.redirect('/');
		}
	});

	//Create and save new language to databse, will redirect to home page. 
	app.post('/newLang', function(req, res){
		return languagesCtrl.create(req, res);
	});

	//Delete language requests, redirect to home page with success/error message.
	app.post('/languages/delete/:lang', function(req, res){
		res.type('text/html');
		var langName = req.params.lang;
		var success = languageList.deleteLang(langName);

		if (success){
			req.session.feedback = {'success': true, 'msg': 'Successfully deleted ' + langName + ' from our records.'};
		} else {
			req.session.feedback = {'success': false, 'msg': 'unable to delete ' + langName + ' from our records. Check to make sure that it is on our list of supported languages.'};
		}
		res.redirect('/');
	});

	//update requests redirect to referring page, or to newly updated language details page, with success/error message.
	app.post('/languages/update/:language', function(req, res) {
		res.type('text/html');
		var langName = req.params.language;
		console.log(langName);
		//var langName = req.body.lang_name;
		var newName = req.body.new_name;
		var newEngine = req.body.new_engine;
		var users = req.body.new_userNum;

		var success = languageList.updateLang(langName, newName, newEngine, users);

		if (success) {
			req.session.feedback = {'success': true, 'msg': "This language's information has been successfully updated."};
			res.redirect('/languages/' + newName);
		} else {
			req.session.feedback = {'success': false, 'msg': 'An error occurred, unable to update language details.'};
			res.redirect('back');
		}
	});

	//About the app page
	app.get('/about', function(req, res){
		res.render('about', {title: 'About'});
	});
}