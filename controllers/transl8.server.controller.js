var Language = require('../models/language.server.models.js');

exports.getAll = function(req, res){
	Language.find({}, '-_id -__v', function(err, results){
		if (err){
			res.status(500).send('Error: a database error occurred.');
		} else {
			res.json(results);
		}
	});
}

exports.create = function(req, res){

	var entry = new Language({
		//id and users are auto-generated...
		name: req.body.lang_name.toLowerCase(),
		engine: req.body.engine
	});

	entry.save(function(err, entry){
		//Save feedback to session
		if (err){
			res.json({
				'type': 'info',
				'msg': 'An error occurred: unable to add ' + capitalize(entry.name) + 'to our database.',
				'display': true
			});
		} else {
			res.json({
				'type': 'success',
				'msg': 'Successfully added ' + capitalize(entry.name) + ' to our list of languages',
				'display': true
			});
		}

	});
};

exports.removeLang = function(req, res){
	langName = req.body.lang.toLowerCase();
	var capsLang = capitalize(langName);

	Language.findOneAndRemove({name: langName}, function(err){
		if(err){
			res.json({
				'type': 'danger',
				'msg': 'Error: unable to delete ' + capsLang + ' from our database.',
				'link': true,
				'display': true
			});
		} else {
			res.json({
				'type': 'success',
				'msg': 'Successfully deleted ' + capsLang + ' from our database.',
				'link':true,
				'display': true
			});
		}
	});
}


exports.update = function(req, res){
	var condition = {name: req.body.current_name.toLowerCase()};

	var update = {
		name: req.body.new_name.toLowerCase(),
		engine: req.body.new_engine,
		users: req.body.new_userNum
	}

	Language.findOneAndUpdate(condition, update, function(err){
		if (err){
			res.json({
				'type': 'info',
				'msg': 'Error: could not update ' + capitalize(update.name) + '\'s details.',
				'display': true
			});
		} else {
			res.json({
				'type': 'success',
				'msg':  capitalize(update.name) + '\'s details were successfully updated.',
				'display': true
			});
		}
	});
}

//gets and sends data for detail page view
exports.getDetail = function(req, res, langName, changeData){
	var searchTerm = langName.toLowerCase();

	Language.findOne({name: searchTerm}, function(err, result){
		if (err || !result){
			req.session.feedback = {'success': false, 'msg' : 'Error: Unable to find ' + langName + ' in our records.'};
			res.redirect('/');
		} else {
			langName = langName.charAt(0).toUpperCase() + langName.slice(1);
			res.render('detail', {title: langName, language: result, changes: changeData});
		}
	});
}

//gets and sends data for api detail request
exports.getDetailData = function(req, res){
	Language.findOne({name: req.params.lang.toLowerCase()}, '-_id -__v', function(err, result){
		if (err || !result){
			res.status(500).send('Database error occurred. Check that you requested a language we support.');
		} else {
			res.json(result);
		}
	});
}

function capitalize(word){
    return word.charAt(0).toUpperCase() + word.slice(1);
}
