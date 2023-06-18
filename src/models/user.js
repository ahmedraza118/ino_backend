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
    required: true,
  },
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: Date,
    required: false,
  },
  phoneNumber: {
    type: String,
    required: false,
  },
  gender: {
    type: String,
    required: false,
  },
  isOnline: { type: Boolean, default: false },
  status: { type: String, default: status.ACTIVE },
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

// userModel.find({ userType: userType.ADMIN }, async (err, result) => {
//   if (err) {
//     console.log("Default admin creation error", err);
//   }
//   else if (result.length != 0) {
//     console.log("Default admin already created.");
//   }
//   else {
//     let binanceRes = await binance.generateBNBWallet(0, `${mnemonic}`);
//     var obj = {
//       name: "ahmed",
//       userName: "ahmed123",
//       email: "ahmedrazach118@gmail.com",
//       bnbAccount: {
//         address: binanceRes.address,
//         privateKey: binanceRes.privateKey
//       },
//       password: bcrypt.hashSync("Mobiloitte@1"),
//       referralCode: await commonFunction.getReferralCode(),
//       otpVerification: true,
//       userType: userType.ADMIN,
//       gender: "Male",
//       phoneNumber: "03037842213",
//       permissions: {
//         notificationManagement: true,
//         feeManagement: true,
//         userManagement: true,
//         stakingManagement: true,
//       }
//     };

//     userModel.create(obj, (err1, staticResult) => {
//       if (err1) {
//         console.log("Default admin error.", err1);
//       }
//       else {
//         console.log("Default admin created.", staticResult);
//       }
//     });
//   }
// });

module.exports = userModel;
