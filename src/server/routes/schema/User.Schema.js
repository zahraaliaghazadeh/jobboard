const Schema = require('mongoose').Schema;

exports.UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        index: true
    },
    password: {
        type: String,
        required: true
    },
    jobIds: [],
    favoriteJobIds: []
// this explicitly declares what collection we're using
}, { collection : 'users' });