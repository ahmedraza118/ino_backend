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
  checkUserExists,
} = require("../../services/user/user");

const { getToken } = require("../../../../helper/util");

const register = async (req, res, next) => {
  const validationSchema = {
    name: Joi.string().required(),
    userName: Joi.string().required(),
    email: Joi.string().optional(),
    password: Joi.string().required(),
    phoneNumber: Joi.string().optional(),
    dateOfBirth: Joi.string().optional(),
    gender: Joi.string().optional(),
    userType: Joi.string().optional(),
    permissions: Joi.object({
      promotionManagement: Joi.boolean().default(false),
      productManagement: Joi.boolean().default(false),
      notificationManagement: Joi.boolean().default(false),
      salesManagement: Joi.boolean().default(false),
      feeManagement: Joi.boolean().default(false),
      userManagement: Joi.boolean().default(false),
    }).optional(),
  };

  try {
    if (req.body.email) {
      req.body.email = req.body.email.toLowerCase();
    }
    if (req.body.userName) {
      req.body.userName = req.body.userName.toLowerCase();
    }

    const { value, error } = Joi.object(validationSchema).validate(req.body);
    const { userName, password, email, phoneNumber } = value;

    if (error) {
      // Handle validation error
      console.log(error);
      throw error;
    } else {
      // Use the extracted values for further processing
      console.log(userName, password, email, phoneNumber);
    }
    const userInfo = await checkUserExists(phoneNumber, email, userName);

    if (userInfo) {
      if (userInfo.email === email) {
        throw new apiError(409, responseMessage.EMAIL_EXIST);
      }
      if (userInfo.userName === userName) {
        throw new apiError(409, responseMessage.USER_NAME_EXIST);
      }
      if (userInfo.phoneNumber === phoneNumber) {
        throw new apiError(409, responseMessage.MOBILE_EXIST);
      }
    } else {
      const saltRounds = 10;
      const salt = bcrypt.genSaltSync(saltRounds);
      const hashedPassword = bcrypt.hashSync(password, salt);
      req.body.password = hashedPassword;
      const result = await createUser(req.body);

      return res.json(new response(result, responseMessage.USER_CREATED));
    }
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

    let obj = {
      _id: userResult._id,
      email: userResult.email,
      userName: userResult.userName,
      token: token,
      userType: userResult.userType,
      permissions: userResult.permissions,
      status: userResult.status,
      isOnline: updateRes.isOnline,
    };
    // await createLogHistory({
    //   userId: userResult._id,
    //   ip_Address: ip.address(),
    //   browser: req.headers["user-agent"],
    //   userType: userResult.userType,
    //   email: userResult.email,
    // });
    return res.json(new response(obj, responseMessage.LOGIN));
  } catch (error) {
    console.log("==error===", error);
    return next(error);
  }
};

module.exports = { register, login };
