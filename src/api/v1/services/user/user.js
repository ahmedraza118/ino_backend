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
      mobileNumber: mobileNumber,
      userType: userType.USER,
      status: { $ne: status.DELETE },
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

async function listAllUsers() {
  try {
    const users = await User.find({
      userType: userType.USER,
      status: { $ne: status.DELETE },
    }); // Fetch all users with user type "USER"
    return users;
  } catch (error) {
    // Handle the error and provide a meaningful error message
    console.error("Error while fetching all users:", error);
    throw new Error("Failed to fetch all users. Please try again later.");
  }
}

async function emailUserNameExist(email, userName, id) {
  try {
    const query = {
      $and: [
        { status: { $ne: status.DELETE } },
        { _id: { $ne: id } },
        {
          $or: [{ email: email }, { userName: userName }],
        },
      ],
    };

    const user = await User.findOne(query);
    return user;
  } catch (error) {
    // Handle the error gracefully (e.g., log or throw a custom error)
    console.error("Error in emailMobileExist:", error);
    throw new Error("An error occurred while checking user existence.");
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

async function findUser(query) {
  try {
    // Assuming you have a database connection and a User model or collection

    // Replace 'User' with your actual User model or collection name
    const user = await User.findOne(query);

    // Return the found user object or null if not found
    return user;
  } catch (error) {
    // Handle any errors that occurred during the database operation
    console.error("Error finding user:", error);
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
  findUser,
  emailUserNameExist,
  listAllUsers,
};
