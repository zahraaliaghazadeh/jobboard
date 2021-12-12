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
    image: {
        type: String,
    },
    timestamp: {
        type: Date,
        required: true,
        default: Date.now
        // format: "%Y-%m-%d",
        // date: "$date"
        // $dateToString: {
        // // date: "",
        // format: "%Y-%m-%d",
        // timezone: "America/New_York",
        //     }
    }
// this explicitly declares what collection we're using
}, { collection : 'jobs' });
