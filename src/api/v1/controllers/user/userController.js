const _ = require("lodash");
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
      throw new Error(error.details[0].message);
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
        try {
          await sendSmsTwilio(phoneNumber, otp);
        } catch (error) {
          // throw new Error("Failed to send OTP");
          // Or, if you want to include the original Twilio error message:
          throw new Error("Failed to send OTP: " + error.message);
          return; // Stop the execution of the remaining code
        }
      }

      req.body.otpTime = new Date().getTime();
      req.body.otp = otp;
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
        try {
          await sendSmsTwilio(phoneNumber, otp);
        } catch (error) {
          // throw new Error("Failed to send OTP");
          // Or, if you want to include the original Twilio error message:
          throw new Error("Failed to send OTP: " + error.message);
          return; // Stop the execution of the remaining code
        }
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
    const userResult = await getUserByPhoneNumber(phoneNumber);

    if (!userResult) {
      throw apiError.notFound(responseMessage.USER_NOT_FOUND);
    }

    // Check if the OTP matches
    if (userResult.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    // Check if the OTP has expired (e.g., within 5 minutes)
    const otpExpirationTime = 5 * 60 * 1000; // 5 minutes in milliseconds
    const currentTime = new Date().getTime();

    if (currentTime - userResult.otpTime > otpExpirationTime) {
      return res.status(400).json({ message: "OTP has expired" });
    }

    // OTP is valid, generate a token for the user
    token = await getToken({
      id: userResult._id,
      email: userResult.email,
      userType: userResult.userType,
    });
    // Update the user's login status and clear the OTP
    var updatedUser = await updateUserById(userResult._id, {
      isOnline: true,
      otp: null,
    });

    // Return the token and user details
    updatedUser = _.omit(JSON.parse(JSON.stringify(updatedUser)), "otp");
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

const updateProfile = async (req, res, next) => {
  const validationSchema = {
    name: Joi.string().allow("").optional(),
    userName: Joi.string().allow("").optional(),
    email: Joi.string().allow("").optional(),
    countryCode: Joi.string().allow("").optional(),
    mobileNumber: Joi.string().allow("").optional(),
    gender: Joi.string().allow("").optional(),
    bio: Joi.string().allow("").optional(),
    dob: Joi.string().allow("").optional(),
    facebook: Joi.string().allow("").optional(),
    twitter: Joi.string().allow("").optional(),
    instagram: Joi.string().allow("").optional(),
    linkedIn: Joi.string().allow("").optional(),
    location: Joi.string().allow("").optional(),
    profilePic: Joi.string().allow("").optional(),
    coverPic: Joi.string().allow("").optional(),
  };
  try {
    if (req.body.email) {
      req.body.email = req.body.email.toLowerCase();
    }
    if (req.body.userName) {
      req.body.userName = req.body.userName.toLowerCase();
    }
    let validatedBody = await Joi.validate(req.body, validationSchema);
    var {
      userName,
      email,
      mobileNumber,
      gender,
      bio,
      dob,
      facebook,
      twitter,
      instagram,
      linkedIn,
      location,
      profilePic,
      coverPic,
    } = validatedBody;
    let userResult = await findUser({
      _id: req.userId,
      userType: userType.USER,
      status: { $ne: status.DELETE },
    });
    if (!userResult) {
      throw apiError.notFound(responseMessage.USER_NOT_FOUND);
    }
    var findemail, mobile, findname;
    if (mobileNumber.length == 0) {
      mobile = "undefined";
    } else {
      mobile = mobileNumber;
    }
    if (email.length == 0) {
      findemail = "undefined";
    } else {
      findemail = email;
    }
    if (userName.length == 0) {
      findname = "undefined";
    } else {
      findname = userName;
    }
    var userInfo = await emailMobileExist(
      mobile,
      findemail,
      findname,
      userResult._id
    );
    if (userInfo) {
      if (userInfo.email == email) {
        throw apiError.conflict(responseMessage.EMAIL_EXIST);
      }
      if (userInfo.userName == userName) {
        throw apiError.conflict(responseMessage.USER_NAME_EXIST);
      }
      if (userInfo.mobileNumber == mobileNumber) {
        throw apiError.conflict(responseMessage.MOBILE_EXIST);
      }
    } else {
      if (profilePic) {
        validatedBody.profilePic = await commonFunction.getSecureUrl(
          profilePic
        );
      }
      if (coverPic) {
        validatedBody.coverPic = await commonFunction.getSecureUrl(coverPic);
      }
      var date = new Date(new Date().getTime() + 19800000);
      var hh = date.getHours();
      var mm = date.getMinutes();
      hh = hh < 10 ? "0" + hh : hh;
      mm = mm < 10 ? "0" + mm : mm;
      let curr_time = hh + ":" + mm;
      let d = new Date().toISOString().slice(0, 10);
      if (userResult.email != email && userResult.email.length != 0) {
        await commonFunction.updateProfileSendMail(
          userResult.email,
          userResult.userName,
          email,
          curr_time,
          d
        );
      }
      let updated = await updateUserById(
        { _id: userResult._id },
        validatedBody
      );
      return res.json(new response(updated, responseMessage.PROFILE_UPDATED));
    }
  } catch (error) {
    console.log("515===", error);
    return next(error);
  }
};

module.exports = { register, login, verifyOTP };
