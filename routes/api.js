//var languageList = require('./../lib/languageList.js');
var languageCtrl = require('./../controllers/transl8.server.controller.js');

module.exports = function(app){
	app.get('/api/getlangs', function(req, res){
		languageCtrl.getAll(req, res);
	});

	app.get('/api/langdetail/:lang', function(req, res){
		languageCtrl.getDetailData(req, res);
	})

	app.post('/api/create', function(req, res){
		languageCtrl.create(req, res);
	});

	app.post('/api/update', function(req, res){
		languageCtrl.update(req, res);
	});

	app.post('/api/delete', function(req, res){
		languageCtrl.removeLang(req, res);
	})
}