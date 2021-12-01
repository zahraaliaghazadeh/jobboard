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

async function getFavoriteJobIds(userId) {
  const user = await UserModel.findById(userId)
  return user.favoriteJobIds;
}

async function appendFavoriteJobId(userId, jobId) {
  const user = await UserModel.findById(userId)
  const jobIds = new Set(user.favoriteJobIds || []);
  jobIds.add(jobId)
  return UserModel.findByIdAndUpdate(userId, {
    favoriteJobIds: Array.from(jobIds)
  });
}

async function removeFavoriteJobId(userId, jobId) {
  const user = await UserModel.findById(userId)
  const jobIds = new Set(user.favoriteJobIds || []);
  jobIds.delete(jobId)
  return UserModel.findByIdAndUpdate(userId, {
    favoriteJobIds: Array.from(jobIds)
  });
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
  getUserByName,
  getFavoriteJobIds,
  appendFavoriteJobId,
  removeFavoriteJobId
};