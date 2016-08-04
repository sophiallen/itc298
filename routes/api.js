var languageList = require('./../lib/languageList.js');
//sample api keys for kicks and giggles 
var sampleApiKeys = ['123abc', '456def', '789ghi'];

module.exports = function(app){
	app.get('/api/alldetails', function(req, res){
		var key = req.body.key;
	
		var data = languageList.getWithDetails();

		if(data){
			res.json(data);
		} else {
			res.status(500).send('Error: A database error occurred.');
		}
		
	});

	app.get('/api/langdetail/:lang', function(req, res){
		var lang = req.params.lang;
		console.log(lang);
		var data = languageList.getLangDetail(lang);
		if (data){
			res.json(data);
		} else {
			res.status(500).send('Error: Language not found.');
		}

	})

}