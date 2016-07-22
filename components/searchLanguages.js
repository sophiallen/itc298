
// var languageList = ['english', 'spanish', 'french',
// 					 'tagalog', 'russian', 'mandarin',
// 					 'arabic', 'ukranian', 'vietnamese'];
 
var languageList = [
	{'name' : 'english', 'engine': 'yandex'}, 
	{'name': 'somali', 'engine': 'google translate'},
	{'name': 'tagalog', 'engine': 'yandex'},
	{'name': 'russian', 'engine': 'yandex'}
	];


module.exports = function(requestedLang){
	var requested = requestedLang.toLowerCase().trim();
	var found = languageList.find(function(lang){
		return lang.name == requested;
	});

	if (found){
		return '<p><strong>' +  requestedLang + '</strong> is supported! </p><p> Using the: ' + found.engine + ' engine</p>';
	} else {
		return '<p> Sorry, that language is not currently supported by our app. </p>'
	}
}