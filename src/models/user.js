const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const userType = require("../enums/userType");
const status = require("../enums/status");

const mongoosePaginate = require("mongoose-paginate");
const mongooseAggregatePaginate = require("mongoose-aggregate-paginate");
const { Schema } = require("mongoose");

// Define the user schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  userName: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  dateOfBirth: {
    type: Date,
    required: false,
  },
  location: { type: String },
  countryCode: { type: String },
  mobileNumber: {
    type: String,
    required: true,
  },
  dob: { type: String },
  bio: { type: String },
  gender: {
    type: String,
    required: false,
  },
  profilePic: { type: String },
  coverPic: { type: String },
  facebook: { type: String },
  twitter: { type: String },
  instagram: { type: String },
  linkedIn: { type: String },
  location: { type: String },
  planType: { type: String, default: "Basic" },
  deviceToken: { type: String },
  deviceType: { type: String },
  isOnline: { type: Boolean, default: false },
  status: { type: String, default: status.ACTIVE },
  isPost: { type: Boolean, default: false },
  isProduct: { type: Boolean, default: false },
  isService: { type: Boolean, default: false },
  emailVerification: { type: Boolean, default: false },
  isReseller: { type: Boolean, default: false },
  walletId: {
    type: Schema.Types.ObjectId,
    ref: "wallet",
  },
  otpTime: {
    type: Date,
    default: null,
  },
  otp: {
    type: String,
    default: null,
  },
  otpVerification: { type: Boolean, default: false },
  interest: [
    {
      type: String,
    },
  ],
  blockedUser: [
    {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  ],
  subscribePlan: [
    {
      type: Schema.Types.ObjectId,
      ref: "plan",
    },
  ],
  blockStatus: { type: Boolean, default: false },
  referralCode: { type: String, unique: true }, // Unique referral code for the user
  referredBy: { type: mongoose.Schema.Types.ObjectId, ref: "user" }, // Referring user ID
  referredUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }], // Array of referred users
  store: [
    {
      type: Schema.Types.ObjectId,
      ref: "store",
    },
  ],
  permissions: {
    promotionManagement: { type: Boolean, default: false },
    productManagement: { type: Boolean, default: false },
    notificationManagement: { type: Boolean, default: false },
    salesManagement: { type: Boolean, default: false },
    feeManagement: { type: Boolean, default: false },
    userManagement: { type: Boolean, default: false },
  },
  userType: { type: String, default: userType.USER },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

userSchema.plugin(mongoosePaginate);
userSchema.plugin(mongooseAggregatePaginate);

const userModel = mongoose.model("user", userSchema);
module.exports = userModel;

(async () => {
  try {
    const adminUser = await userModel.findOne({ userType: userType.ADMIN });

    if (adminUser) {
      console.log("Default admin already created.");
    } else {
      const saltRounds = 10;
      const salt = await bcrypt.genSalt(saltRounds);
      const hashedPassword = await bcrypt.hash("ahmed118", salt);

      const obj = {
        name: "ahmed",
        userName: "ahmed123",
        email: "ahmedrazach118@gmail.com",
        password: hashedPassword,
        userType: userType.ADMIN,
        gender: "Male",
        mobileNumber: "+923037842213",
        otpVerification: true,
        permissions: {
          notificationManagement: true,
          feeManagement: true,
          userManagement: true,
          promotionManagement: true,
          productManagement: true,
          salesManagement: true,
        },
      };

      const createdAdmin = await userModel.create(obj);
      console.log("Default admin created.", createdAdmin);
    }
  } catch (error) {
    console.log("Error creating default admin.", error);
  }
})();
