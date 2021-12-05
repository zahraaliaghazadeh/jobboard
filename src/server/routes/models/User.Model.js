const mongoose = require("mongoose")
const UserSchema = require('../schema/User.Schema').UserSchema

const UserModel = mongoose.model("User", UserSchema);

class UserExistsError extends Error {
  constructor(message) {
    super(message);
    this.name = 'UserExistsError';
  }
}

async function createNewUser(user) {
  const duplicateUser = await getUserByName(user.username);
  if (duplicateUser !== null) {
    throw new UserExistsError();
  }
  return UserModel.create(user);
}

async function getUserByName(username) {
  const res = await UserModel.find({
    username: username
  }).exec();
  return res.length > 0 ? res[0] : null;
}

async function getFavoriteJobIds(userId) {
  const user = await UserModel.findById(userId)
  return user.favoriteJobIds;
}

async function getJobIds(userId) {
  const user = await UserModel.findById(userId)
  return user.jobIds;
}

async function appendJobId(userId, jobId) {
  const user = await UserModel.findById(userId)
  const jobIds = new Set(user.jobIds || []);
  jobIds.add(jobId)
  return UserModel.findByIdAndUpdate(userId, {
    jobIds: Array.from(jobIds)
  });
}

async function removeJobId(userId, jobId) {
  const user = await UserModel.findById(userId)
  const jobIds = new Set(user.jobIds || []);
  jobIds.delete(jobId)
  return UserModel.findByIdAndUpdate(userId, {
    jobIds: Array.from(jobIds)
  });
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
  removeFavoriteJobId,
  appendJobId,
  removeJobId,
  getJobIds,
  UserExistsError
};