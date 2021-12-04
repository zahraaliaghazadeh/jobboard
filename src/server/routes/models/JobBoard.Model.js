const mongoose = require("mongoose")
const JobBoardSchema = require('../schema/JobBoard.Schema').JobBoardSchema

const JobBoardModel = mongoose.model("JobBoard", JobBoardSchema);

function getJobById(id) {
  return JobBoardModel.findById(id);
}

function getJobByIds(ids) {
  return JobBoardModel.find().where('_id').in(ids).exec();
}

function insertJob(job) {
    return JobBoardModel.create(job);
}

function findJob(queryString) {
    return JobBoardModel.find({
      $or: [{
        title: new RegExp(`${queryString}`, 'i')
      }, {
        companyName: new RegExp(`${queryString}`, 'i')
      }, {
        location: new RegExp(`${queryString}`, 'i')
      }]
    })
}

// function getAllJobBoard() {
//     return JobBoardModel.find().exec();
// }
//
// function findJobBoardByName(name) {
//     return JobBoardModel.find({name: name}).exec();
// }
//
// function findJobBoardById(id) {
//     return JobBoardModel.findById(id).exec();
// }

// Make sure to export a function after you create it!
module.exports = {
  getJobById,
  getJobByIds,
  insertJob,
  findJob,
    // findJobBoardByName,
    // getAllJobBoard,
    // findJobBoardById
};