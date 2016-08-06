var Language = require('../models/language.server.models.js');


exports.create = function(req, res){
	var entry = new Language({
		//id and users are auto-generated...
		name: req.body.lang_name,
		engine: req.body.engine
	});

	entry.save(function(err, entry){
		//this session data save isn't working... :(
		if (err){
			req.session.feedback = {'success': false, 'msg': 'Error: unable to add ' + entry.name + 'to our records. Check to make sure it has not already been added.'};
		} else {
			req.session.feedback = {'success': true, 'msg': 'Successfully added ' + entry.name + ' to our records.'};
		}

		//redirect to home page
		res.redirect('/');
	});

};

// exports.getNote = function(req, res){
// 	res.render()
// }