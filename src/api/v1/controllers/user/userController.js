const _ = require('lodash');
const Joi = require("joi");
const config = require("config");
const jwt = require("jsonwebtoken");
const userModel = require("../../../../models/user");
const apiError = require("../../../../helper/apiError");
const response = require("../../../../../assets/response");
const bcrypt = require("bcryptjs");
const responseMessage = require("../../../../../assets/responseMessage");
const {
  createUser,
  findUserByEmail,
  findUserByUsername,
  updateUserById,
  deleteUserById,
  getUserByPhoneNumber,
} = require("../../services/user/user");

const {
  getToken,
  sendSmsTwilio,
  getOTP,
  getImageUrl,
  getVideoUrl,
  getSecureUrl,
  genBase64,
} = require("../../../../helper/util");

const register = async (req, res, next) => {
  const validationSchema = {
    // userName: Joi.string().required(),
    // email: Joi.string().optional(),
    // password: Joi.string().required(),
    phoneNumber: Joi.string().required(),
    // dateOfBirth: Joi.string().optional(),
    // gender: Joi.string().optional(),
    userType: Joi.string().optional(),
    // permissions: Joi.object({
    //   promotionManagement: Joi.boolean().default(false),
    //   productManagement: Joi.boolean().default(false),
    //   notificationManagement: Joi.boolean().default(false),
    //   salesManagement: Joi.boolean().default(false),
    //   feeManagement: Joi.boolean().default(false),
    //   userManagement: Joi.boolean().default(false),
    // }).optional(),
  };

  try {
    // if (req.body.email) {
    //   req.body.email = req.body.email.toLowerCase();
    // }
    // if (req.body.userName) {
    //   req.body.userName = req.body.userName.toLowerCase();
    // }

    const { value, error } = Joi.object(validationSchema).validate(req.body);
    const { phoneNumber } = value;

    if (error) {
      // Handle validation error
      console.log(error);
      throw error;
    } else {
      // Use the extracted values for further processing
      console.log("user phone number", phoneNumber);
    }
    var userResult = await getUserByPhoneNumber(phoneNumber);

    if (userResult) {
      // if (userInfo.email === email) {
      //   throw new apiError(409, responseMessage.EMAIL_EXIST);
      // }
      // if (userInfo.userName === userName) {
      //   throw new apiError(409, responseMessage.USER_NAME_EXIST);
      // }
      // if (userInfo.phoneNumber === phoneNumber) {
      //   throw new apiError(409, responseMessage.MOBILE_EXIST);
      // }

      let otp = await getOTP();

      if (phoneNumber) {
        // let number = `${countryCode}${phoneNumber}`;
        await sendSmsTwilio(phoneNumber, otp);
      }

      req.body.otpTime = new Date().getTime();
      req.body.otp = otp;
      req.body.isOnline = true;
      userResult = await updateUserById(userResult._id, req.body);
      console.log("Result:", userResult);

      userResult = _.omit(JSON.parse(JSON.stringify(userResult)), "otp");

      return res.json(new response(userResult, responseMessage.USER_CREATED));
    } else {
      let result;
      // const saltRounds = 10;
      // const salt = bcrypt.genSaltSync(saltRounds);
      // const hashedPassword = bcrypt.hashSync(password, salt);
      // req.body.password = hashedPassword;

      let otp = await getOTP();
      req.body.otpTime = new Date().getTime();
      req.body.otp = otp;

      if (phoneNumber) {
        // let number = `${countryCode}${mobileNumber}`;
        await sendSmsTwilio(phoneNumber, otp);
      }
      result = await createUser(req.body);
      console.log("Result:", result);

      result = _.omit(JSON.parse(JSON.stringify(result)), "otp");
      return res.json(new response(result, responseMessage.USER_CREATED));
    }
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

const verifyOTP = async (req, res, next) => {
  try {
    const { phoneNumber, otp } = req.body;

    // Retrieve the user based on the phone number
    const user = await getUserByPhoneNumber(phoneNumber);

    if (!user) {
      throw apiError.notFound(responseMessage.USER_NOT_FOUND);
    }

    // Check if the OTP matches
    if (user.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    // Check if the OTP has expired (e.g., within 5 minutes)
    const otpExpirationTime = 5 * 60 * 1000; // 5 minutes in milliseconds
    const currentTime = new Date().getTime();

    if (currentTime - user.otpTime > otpExpirationTime) {
      return res.status(400).json({ message: "OTP has expired" });
    }

    // OTP is valid, generate a token for the user
    token = await getToken({
      id: userResult._id,
      email: userResult.email,
      userType: userResult.userType,
    });
    // Update the user's login status and clear the OTP
    var updatedUser = await updateUserById(user._id, {
      isOnline: true,
      otp: null,
    });

    // Return the token and user details
    updatedUser = _.omit(JSON.parse(JSON.stringify(user)), "otp");
    return res.json({
      token,
      user: updatedUser,
      message: "OTP verification successful",
    });
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

const login = async (req, res, next) => {
  const validationSchema = {
    email: Joi.string().required(),
    password: Joi.string().required(),
    // deviceToken: Joi.string().optional(),
    // deviceType: Joi.string().optional(),
  };
  try {
    if (req.body.email) {
      req.body.email = req.body.email.toLowerCase();
    }
    let token;
    const { value, error } = Joi.object(validationSchema).validate(req.body);
    if (error) {
      throw error;
    }
    const { password, email } = value;
    var userResult = await findUserByEmail(email);
    console.log(userResult);
    console.log("Entered Password:", password);
    console.log("Hashed Password:", userResult.password);
    console.log(
      "Password Comparison Result:",
      bcrypt.compareSync(password, userResult.password)
    );

    if (!userResult) {
      throw apiError.notFound(responseMessage.USER_NOT_FOUND);
    }
    if (
      !userResult.password ||
      !bcrypt.compareSync(password, userResult.password)
    ) {
      throw apiError.invalid(responseMessage.INCORRECT_LOGIN);
    }
    // if (req.body.deviceToken && req.body.deviceType) {
    //   await updateUser(
    //     { _id: userResult._id },
    //     { deviceToken: req.body.deviceToken, deviceType: req.body.deviceType }
    //   );
    // }

    token = await getToken({
      id: userResult._id,
      email: userResult.email,
      userType: userResult.userType,
    });

    let updateRes = await updateUserById(userResult._id, { isOnline: true });

    // await createLogHistory({
    //   userId: userResult._id,
    //   ip_Address: ip.address(),
    //   browser: req.headers["user-agent"],
    //   userType: userResult.userType,
    //   email: userResult.email,
    // });
    return res.json(new response(updateRes, responseMessage.LOGIN));
  } catch (error) {
    console.log("==error===", error);
    return next(error);
  }
};

module.exports = { register, login, verifyOTP };
