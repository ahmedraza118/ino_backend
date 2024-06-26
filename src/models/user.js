const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const userType = require("../enums/userType");
const status = require("../enums/status");

const mongoosePaginate = require("mongoose-paginate");
const mongooseAggregatePaginate = require("mongoose-aggregate-paginate");

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
  phoneNumber: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: false,
  },
  isOnline: { type: Boolean, default: false },
  status: { type: String, default: status.ACTIVE },
  otpTime: {
    type: Date,
    default: null,
  },
  otp: {
    type: String,
    default: null,
  },
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
        phoneNumber: "+923037842213",
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
