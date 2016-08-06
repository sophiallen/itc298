var Language = require('../models/language.server.models.js');


exports.create = function(req, res){
	/*TODO: Validate that language being added does not pre-exist in db.*/

	var entry = new Language({
		//id and users are auto-generated...
		name: req.body.lang_name.toLowerCase(),
		engine: req.body.engine
	});

	entry.save(function(err, entry){
		//Save feedback to session
		if (err){
			req.session.feedback = {'success': false, 'msg': 'Error: unable to add ' + entry.name + 'to our records. Check to make sure it has not already been added.'};
		} else {
			req.session.feedback = {'success': true, 'msg': 'Successfully added ' + entry.name + ' to our records.'};
		}

		//redirect to home page
		res.redirect('/');
	});
};


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
		
				//I wonder if I can change this so that rendering happens in the router... Seems like 
				//a problem with separating concerns. 
				res.render('home', {title: 'Main', langs: langNames, changes: changeData});
			}
		});
}

// exports.update = function(req, res){
// 	var condition = {name: req.params.language};

// 	var update = {
// 		name: req.body.new_name,
// 		engine: req.body.new_engine,
// 		users: req.body.users
// 	}

// }

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