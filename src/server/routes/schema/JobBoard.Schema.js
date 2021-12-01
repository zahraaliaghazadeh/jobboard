const Schema = require('mongoose').Schema;

exports.JobBoardSchema = new Schema({
    title: {
        type: String,
        required: true,
        index: true,
    },
    companyName: {
        type: String,
        required: true,
        index: true,
    },
    location: {
        type: String,
        required: true,
        index: true,
    },
    description: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    url: {
        type: String,
    },
    timestamp: {
        type: Date,
        required: true,
        default: Date.now
    }
// this explicitly declares what collection we're using
}, { collection : 'jobs' });