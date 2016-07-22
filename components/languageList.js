var languages = [
	{'name' : 'english', 'engine': 'yandex'}, 
	{'name': 'somali', 'engine': 'google translate'},
	{'name': 'tagalog', 'engine': 'yandex'},
	{'name': 'russian', 'engine': 'yandex'}
	];

module.exports = {
	//Function to create and return string that describes whether and how a language currently is supported.
	searchSupported : function(requestedLang){
		var requested = requestedLang.toLowerCase().trim();
		var found = languages.find(function(lang){
			return lang.name == requested;
		});

		if (found){
			return '<p><strong>' +  requestedLang + '</strong> is supported! </p><p> Using the: ' + found.engine + ' engine</p>';
		} else {
			return '<p> Sorry, that language is not currently supported by our app. </p>'
		}
	},	

	//returns string of all supported languages
	getAllLangs: function(){
		var listOfLangs = "";
		languages.forEach(function(lang){
			var capitalizedLang = lang.name.charAt(0).toUpperCase() + lang.name.slice(1) ;
			listOfLangs += capitalizedLang + '\n';
		});
		return listOfLangs;
	}, 

	//Adds language to the list, returns true on success.
	addLang: function(name, engine){
		var oldLength = languages.length;
		var newLang = {'name': name, 'engine': engine};
		var newLength = languages.push(newLang);
		return newLength > oldLength;
	},

	deleteLang: function(lang){
		//match casing of language list.
		lang = lang.toLowerCase();

		//remember length of list before attempting delete.
		var oldLength = languages.length;

		//loop through list, delete any that match (in case of duplicates)
		languages.forEach(function(item, index){
			if (item.name == lang){
				languages.splice(index, 1);
			}
		});

		//compare to prior list length to see if deletion was successful. 
		var success = languages.length < oldLength;
		return success;
	}
}

// module.exports = {
// , 

// 	//Function to create and return string that describes whether and how a language currently is supported.
// 	searchSupported : function(requestedLang){
// 		var requested = requestedLang.toLowerCase().trim();
// 		var found = languages.find(function(lang){
// 			return lang.name == requested;
// 		});

// 		if (found){
// 			return '<p><strong>' +  requestedLang + '</strong> is supported! </p><p> Using the: ' + found.engine + ' engine</p>';
// 		} else {
// 			return '<p> Sorry, that language is not currently supported by our app. </p>'
// 		}
// 	}, 

// 	//returns string 
// 	getAllLangs : function(){
// 		var listOfLangs = "";
// 		this.languages.forEach(function(lang){
// 			console.log(lang.name);
// 			listOfLangs += lang.name + ' ';
// 		});
// 		return listOfLangs;
// 	}
// }