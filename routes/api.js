var languageList = require('./../lib/languageList.js');
var languageCtrl = require('./../controller/transl8.server.controller.js');

module.exports = function(app){
	app.get('/api/getlangs', function(req, res){
		languageCtrl.getAll(req, res);
	});

	app.get('/api/langdetail/:lang', function(req, res){
		languageCtrl.getDetailData(req, res);
	})
}