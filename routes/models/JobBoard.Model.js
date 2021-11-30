const mongoose = require("mongoose")
const JobBoardSchema = require('../schema/JobBoard.Schema').JobBoardSchema

const JobBoardModel = mongoose.model("JobBoard", JobBoardSchema);

function insertJobBoard(JobBoard) {
    return JobBoardModel.create(JobBoard);
}

function getAllJobBoard() {
    return JobBoardModel.find().exec();
}

function findJobBoardByName(name) {
    return JobBoardModel.find({name: name}).exec();
}

function findJobBoardById(id) {
    return JobBoardModel.findById(id).exec();
}

// Make sure to export a function after you create it!
module.exports = {
    insertJobBoard,
    findJobBoardByName,
    getAllJobBoard,
    findJobBoardById
};