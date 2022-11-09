const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TopScoresSchema = new Schema({
	position: {
		type: Number,
		required: false
	},
	id: {
		type: Number,
		required: false
	},
	score: {
		type: Number,
		required:false
	},
});

const TopScores = mongoose.model("Topscores", TopScoresSchema);

module.exports = TopScores;