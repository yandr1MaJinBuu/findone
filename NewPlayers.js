const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const NewPlayerSchema = new Schema({
	id: {
		type: String,
		required: false
	},
	name: {
		type: String,
		required: true
	},
	status: {
		type: Boolean,
		default: false
	},
});

const NewPlayer = mongoose.model("Players", NewPlayerSchema);

module.exports = NewPlayer;