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
	/*TODO: Validate that language being added does not pre-exist in db.*/
	console.log('langname: ' + req.body.lang_name);
	var entry = new Language({
		//id and users are auto-generated...
		name: req.body.lang_name.toLowerCase(),
		engine: req.body.engine
	});

	entry.save(function(err, entry){
		//Save feedback to session
		if (err){
			res.json({
				'type': 'danger',
				'msg': 'an error occurred: unable to add ' + entry.name + 'to our database.',
				'display': true
			});
		} else {
			res.json({
				'type': 'success',
				'msg': 'successfully added ' + entry.name + ' to our list of languages. Refresh this page to view updated list.',
				'display': true
			});
		}

	});
};

exports.removeLang = function(req, res){
	langName = req.params.lang.toLowerCase();
	var capsLang = capitalize(langName);

	Language.findOneAndRemove({name: langName}, function(err){
		if(err){
			req.session.feedback = {'success': false, 'msg': 'Error: Unable to delete ' + capsLang + ' to our records.'};
		} else {
			req.session.feedback = {'success': true, 'msg': 'Successfully deleted ' + capsLang + ' from our records.'};
		}

		res.redirect('/');
	});
}


exports.getLangNames = function(req, res, changeData){
		var langNames;

		Language.find(function(err, results){
			if(err){
				langNames = "No languages were found in the database.";
			} else {
				var langNames = results.map(function(item, index){
					//return just the name, capitalized.
					return item.name.charAt(0).toUpperCase() + item.name.slice(1);
				});
		
			}

			res.render('home', {title: 'Main', langs: langNames, changes: changeData});
		});
}

exports.update = function(req, res){
	var condition = {name: req.params.language.toLowerCase()};

	var update = {
		name: req.body.new_name.toLowerCase(),
		engine: req.body.new_engine,
		users: req.body.new_userNum
	}

	Language.findOneAndUpdate(condition, update, function(err){
		if (err){
			req.session.feedback = {'success': false, 'msg': 'Error: Database unable to update ' + capitalize(req.params.language) +  '.'};
			res.redirect('/languages/'+ req.params.language);
		} else {
			req.session.feedback = {'success': true, 'msg': 'Success: this language\'s details have been updated.'};
			res.redirect('/languages/'+ req.body.new_name);
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
