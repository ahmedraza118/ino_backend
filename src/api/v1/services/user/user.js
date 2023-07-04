const User = require("../../../../models/user");
const status = require("../../../../enums/status");
const userType = require("../../../../enums/userType");

// Function to create a new user
async function createUser(userData) {
  try {
    const newUser = new User(userData);
    const createdUser = await newUser.save();
    return createdUser;
  } catch (error) {
    throw error;
  }
}

async function getUserByPhoneNumber(mobileNumber) {
  try {
    const user = await User.findOne({
      $or: [
        { phoneNumber: mobileNumber }
      ],
    });
    return user;
  } catch (error) {
    throw error;
  }
}

// Function to find a user by their email
async function findUserByEmail(email) {
  try {
    const user = await User.findOne({ email });
    console.log(user);
    return user;
  } catch (error) {
    throw error;
  }
}

// Function to find a user by their username
async function findUserByUsername(userName) {
  try {
    const user = await User.findOne({ userName });
    return user;
  } catch (error) {
    throw error;
  }
}

// Function to update a user by their ID
async function updateUserById(userId, updateData) {
  try {
    const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
    });
    return updatedUser;
  } catch (error) {
    throw error;
  }
}

// Function to delete a user by their ID
async function deleteUserById(userId) {
  try {
    const deletedUser = await User.findByIdAndDelete(userId);
    return deletedUser;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createUser,
  findUserByEmail,
  findUserByUsername,
  updateUserById,
  deleteUserById,
  getUserByPhoneNumber,
};
