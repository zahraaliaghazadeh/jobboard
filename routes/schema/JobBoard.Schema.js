const Schema = require('mongoose').Schema;

exports.PokemonSchema = new Schema({
    name: String,
    birthday: {
        type: Date,
        default: Date.now,
    },
    health: {type: Number},
// this explicitly declares what collection we're using
}, { collection : 'jobs' });