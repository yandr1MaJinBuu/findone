const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TopflopSchema = new Schema({
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

const Topflop = mongoose.model("Topflop", TopflopSchema);

module.exports = Topflop;