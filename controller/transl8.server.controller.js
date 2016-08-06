var Language = require('../models/language.server.models.js');

exports.create = function(req, res){
	var entry = new Language({
		//id and users are auto-generated...
		name: req.body.lang_name,
		engine: req.body.engine
	});

	entry.save();

	//redirect to home page
	res.redirect(301, '/');
};

// exports.getNote = function(req, res){
// 	res.render()
// }