const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HihgscoreSchema = new Schema({
	position: {
		type: Number,
		required: false,
	},
	id: {
		type: Number,
		required: true,
	},
	score: {
		type: Number,
		required: false,
	},
	difference: {
		type: Number,
		required: true,
	},
});

const Hihgscores = mongoose.model("Highscores", HihgscoreSchema);

module.exports = Hihgscores;