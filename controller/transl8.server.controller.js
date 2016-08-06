var Language = require('../models/language.server.models.js');

function capitalize(word){
    return word.charAt(0).toUpperCase() + word.slice(1);
};

exports.create = function(req, res){
	var entry = new Language({
		//id and users are auto-generated...
		name: req.body.lang_name,
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