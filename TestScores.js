const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const testscoresSchema = new Schema({
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

const Testscores = mongoose.model('testscores', testscoresSchema);

module.exports = Testscores;