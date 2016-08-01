
var languages =  [
	{'name' : 'english', 'engine': 'yandex', 'users': 52}, 
	{'name': 'somali', 'engine': 'google translate', 'users': 56},
	{'name': 'tagalog', 'engine': 'yandex', 'users': 26},
	{'name': 'russian', 'engine': 'yandex', 'users': 87}
	];

function capitalize(word){
    return word.charAt(0).toUpperCase() + word.slice(1);
}

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

	getAllLangs: function(){
		var langNames = languages.map(function(lang){
			return capitalize(lang.name);
		});

		return langNames;
	},

	//Adds language to the list, returns true on success.
	addLang: function(name, engine){
		var oldLength = languages.length;
		var newLang = {'name': name.toLowerCase(), 'engine': engine, 'users': 1};

		//check to make sure language isn't already on the list.
		var alreadyExists = languages.find(function(item){
			return item.name == name;
		});

		//add and check new list length to measure success, else return false 
		if (!alreadyExists){
			var newLength = languages.push(newLang);
			return newLength > oldLength;
		} else { //language has already been added.
			return false;
		}
	},

	deleteLang: function(lang){
		//match casing of language list.
		lang = lang.toLowerCase();

		//remember length of list before attempting delete.
		var oldLength = languages.length;

		//loop through list, delete any that match (in unlikely case of duplicates)
		languages.forEach(function(item, index, langs){
			if (item.name == lang){
				langs.splice(index, 1);
			}
		});

		//compare to prior list length to see if deletion was successful. 
		var success = languages.length < oldLength;
		return success;
	}, 

	///updates the engine used to support a language. Returns true on success.
	updateLang: function(lang, newName, newEngine, users){
		lang = lang.toLowerCase();

		var success = false;

		languages.forEach(function(item){
			if (item.name == lang){
				item.name = newName.toLowerCase();
				item.engine = newEngine;
				item.users = parseInt(users);
				success = true;
			}
		});

		return success;
	},

	//returns language detail, or false if not found. 
	getLangDetail: function(requestedLang){
		var requested = requestedLang.toLowerCase().trim();
		var found = languages.find(function(lang){
			return lang.name == requested;
		});
		if(found){
			return found;
		} 
		else {
			return false;
		}
	}
}
