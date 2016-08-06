var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var languageSchema = new Schema({
	name: String,
	engine: String,
	users: {type: Number, default: 1}
});

module.exports = mongoose.model('Language', languageSchema);