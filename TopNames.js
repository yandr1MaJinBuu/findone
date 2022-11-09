const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TopNamesSchema = new Schema({
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

const TopNames = mongoose.model("Topnames", TopNamesSchema);

module.exports = TopNames;