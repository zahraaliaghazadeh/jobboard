const mongoose = require("mongoose")
const UserSchema = require('../schema/User.Schema').UserSchema

const UserModel = mongoose.model("User", UserSchema);

function createNewUser(user) {
    return UserModel.create(user);
}

function getUserByName(username) {
  return UserModel.find({
    username: username
  }).exec();
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
  createNewUser,
  getUserByName
};