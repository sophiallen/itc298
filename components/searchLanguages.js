
var languageList = ['english', 'spanish', 'french',
					 'tagalog', 'russian', 'mandarin',
					 'arabic', 'ukranian', 'vietnamese'];


//add method for easy lang capitalization
String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

//returns search results as a string.
module.exports = function(requestedLang){
	var requested = requestedLang.toLowerCase();
	var indexFound = languageList.indexOf(requested);
	if (indexFound == -1){
		return "Sorry, that language is not currently supported";
	} else {
		return languageList[indexFound].capitalize() + ' is supported!';
	}
}