var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var keys = require('./../keys.js');

//connect to mongodb
var connectionString = 'mongodb://' + keys.dbUserName + ':' + keys.dbPass + keys.dbUrl;
mongoose.connect(connectionString);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("successfully connected to mLab mongodb.");
});

var languageSchema = new Schema({
	name: String,
	engine: String,
	users: {type: Number, default: 1}
});

module.exports = mongoose.model('Language', languageSchema);