const _ = require("lodash");
const Joi = require("joi");
const config = require("config");
const jwt = require("jsonwebtoken");
const status = require("../../../../enums/status.js");
const userType = require("../../../../enums/userType.js");
const speakeasy = require("speakeasy");
const userModel = require("../../../../models/user");
const apiError = require("../../../../helper/apiError");
const response = require("../../../../../assets/response");
const bcrypt = require("bcryptjs");
const responseMessage = require("../../../../../assets/responseMessage");
const commonFunction = require("../../../../helper/util.js");

const { postServices } = require("../../services/post/post");
const { productServices } = require("../../services/product/product");
const { serviceServices } = require("../../services/service/service");
const { jobServices } = require("../../services/job/job");
const { projectServices } = require("../../services/project/project");
const { walletServices } = require("../../services/wallet/wallet");
const { bannerServices } = require("../../services/banner/banner.js");
const {
  businessCardServices,
} = require("../../services/businessCard/businessCard.js");

const {
  activityServices,
} = require("../../services/userActivity/userActivity");

const { reportServices } = require("../../services/report/report.js");
const { promotionServices } = require("../../services/promotion/promotion.js");
const { requestServices } = require("../../services/request/request.js");
const {
  postRequestServices,
} = require("../../services/postRequest/postRequest.js");
const {
  productRequestServices,
} = require("../../services/productRequest/productRequest.js");
const {
  jobRequestServices,
} = require("../../services/jobRequest/jobRequest.js");
const {
  projectRequestServices,
} = require("../../services/projectRequest/projectRequest.js");
const {
  serviceRequestServices,
} = require("../../services/serviceRequest/serviceRequest.js");

const {
  createUserPost,
  findOnePost,
  updatePost,
  listPost,
  ratePost,
  paginatePostSearch,
  paginateAllPostSearch,
  paginatePostSearchBuy,
  paginateAllPostSearchPrivatePublic,
  allPostList,
  paginateAllPostSearchPrivatePublicTrending,
  tagPostbyuserlist,
  deletePostComment,
  deletePostCommentReply,
  paginateAllPostSearchPrivatePublicFind,
} = postServices;
const {
  createUserProduct,
  findOneProduct,
  updateProduct,
  listProduct,
  rateProduct,
  paginateProductSearch,
  paginateAllProductSearch,
  paginateProductSearchBuy,
  paginateAllProductSearchPrivatePublic,
  allProductList,
  paginateAllProductSearchPrivatePublicTrending,
  tagProductbyuserlist,
  deleteProductComment,
  deleteProductCommentReply,
  paginateAllProductSearchPrivatePublicFind,
} = productServices;
const {
  createUserJob,
  findOneJob,
  updateJob,
  listJob,
  rateJob,
  paginateJobSearch,
  paginateAllJobSearch,
  paginateJobSearchBuy,
  paginateAllJobSearchPrivatePublic,
  allJobList,
  paginateAllJobSearchPrivatePublicTrending,
  tagJobbyuserlist,
  deleteJobComment,
  deleteJobCommentReply,
  paginateAllJobSearchPrivatePublicFind,
} = jobServices;
const {
  createUserProject,
  findOneProject,
  updateProject,
  listProject,
  rateProject,
  paginateProjectSearch,
  paginateAllProjectSearch,
  paginateProjectSearchBuy,
  paginateAllProjectSearchPrivatePublic,
  allProjectList,
  paginateAllProjectSearchPrivatePublicTrending,
  tagProjectbyuserlist,
  deleteProjectComment,
  deleteProjectCommentReply,
  paginateAllProjectSearchPrivatePublicFind,
} = projectServices;
const {
  createUserService,
  findOneService,
  updateService,
  listService,
  rateService,
  paginateServiceSearch,
  paginateAllServiceSearch,
  paginateServiceSearchBuy,
  paginateAllServiceSearchPrivatePublic,
  allServiceList,
  paginateAllServiceSearchPrivatePublicTrending,
  tagServicebyuserlist,
  deleteServiceComment,
  deleteServiceCommentReply,
  paginateAllServiceSearchPrivatePublicFind,
} = serviceServices;

const {
  createReport,
  findReport,
  findAllReport,
  updateReport,
  updateReportById,
  paginateSearchReport,
} = reportServices;
const {
  createPromotion,
  findPromotion,
  findAllPromotion,
  updatePromotion,
  recordClickAndUpdatePromotion,
  updatePromotionById,
} = promotionServices;
const {
  createBanner,
  findBanner,
  findAllBanner,
  updateBanner,
  updateBannerById,
  paginateSearchBanner,
} = bannerServices;
const {
  createBusinessCard,
  findBusinessCard,
  findAllBusinessCard,
  updateBusinessCard,
  updateBusinessCardById,
  paginateSearchBusinessCard,
} = businessCardServices;

const { createWallet, deposit, withdraw, transferFunds, getWallet } =
  walletServices;
const { createRequest, findRequest, updateRequestById, requestList } =
  requestServices;
const {
  createPostRequest,
  findPostRequest,
  updatePostRequestById,
  postRequestList,
} = postRequestServices;
const {
  createJobRequest,
  findJobRequest,
  updateJobRequestById,
  jobRequestList,
  viewJobRequestDetails,
} = jobRequestServices;
const {
  createProjectRequest,
  findProjectRequest,
  updateProjectRequestById,
  projectRequestList,
  viewProjectRequestDetails,
} = projectRequestServices;
const {
  createServiceRequest,
  findServiceRequest,
  updateServiceRequestById,
  serviceRequestList,
  viewServiceRequestDetails,
} = serviceRequestServices;
const {
  createProductRequest,
  findProductRequest,
  updateProductRequestById,
  productRequestList,
  viewProductRequestDetails,
} = productRequestServices;

const {
  createUser,
  findUserByEmail,
  findUserByUsername,
  updateUserById,
  deleteUserById,
  getUserByPhoneNumber,
  findUser,
  emailUserNameExist,
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

const {
  createActivity,
  findActivity,
  updateActivity,
  multiUpdateActivity,
  activityList,
  activityListWithSort,
  findAllActivity,
  paginateSearch,
} = activityServices;

const register = async (req, res, next) => {
  const validationSchema = {
    // userName: Joi.string().required(),
    // email: Joi.string().optional(),
    // password: Joi.string().required(),
    mobileNumber: Joi.string().required(),
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

    const validatedBody = await Joi.validate(req.body, validationSchema);
    const { mobileNumber, userType } = validatedBody;
    var userResult = await getUserByPhoneNumber(mobileNumber);

    if (userResult) {
      // if (userInfo.email === email) {
      //   throw new apiError(409, responseMessage.EMAIL_EXIST);
      // }
      // if (userInfo.userName === userName) {
      //   throw new apiError(409, responseMessage.USER_NAME_EXIST);
      // }
      // if (userInfo.mobileNumber === mobileNumber) {
      //   throw new apiError(409, responseMessage.MOBILE_EXIST);
      // }

      //uncomment this for production release
      // let otp = await getOTP();
      let otp = 1234;
      //uncomment this for production release

      // if (mobileNumber) {
      //   try {
      //     await sendSmsTwilio(mobileNumber, otp);
      //   } catch (error) {
      //     // throw new Error("Failed to send OTP");
      //     // Or, if you want to include the original Twilio error message:
      //     throw apiError.forbidden(responseMessage.INCORRECT_NUMBER);
      //     // throw new Error("Failed to send OTP: " + error.message);
      //     return; // Stop the execution of the remaining code
      //   }
      // }

      req.body.otpTime = new Date().getTime();
      req.body.otp = otp;
      userResult = await updateUserById(userResult._id, req.body);
      console.log("Result:", userResult);

      userResult = _.omit(JSON.parse(JSON.stringify(userResult)), "otp");

      return res.json(new response(userResult, responseMessage.OTP_SEND));
    } else {
      let result;
      // const saltRounds = 10;
      // const salt = bcrypt.genSaltSync(saltRounds);
      // const hashedPassword = bcrypt.hashSync(password, salt);
      // req.body.password = hashedPassword;

      // let otp = await getOTP();
      let otp = 1234;
      //uncomment this for production release
      req.body.otpTime = new Date().getTime();
      req.body.otp = otp;

      //uncomment this for production release
      // if (mobileNumber) {
      //   try {
      //     await sendSmsTwilio(mobileNumber, otp);
      //   } catch (error) {
      //     // throw new Error("Failed to send OTP");
      //     // Or, if you want to include the original Twilio error message:
      //     throw apiError.forbidden(responseMessage.INCORRECT_NUMBER);

      //     // throw new Error("Failed to send OTP: " + error.message);
      //     // return; // Stop the execution of the remaining code
      //   }
      // }

      result = await createUser(req.body);
      const walletRes = await createWallet(result._id);
      req.body.walletId = walletRes._id;

      const updateRes = await updateUserById(result._id, req.body);
      console.log("Result:", result);

      result = _.omit(JSON.parse(JSON.stringify(updateRes)), "otp");
      return res.json(new response(updateRes, responseMessage.USER_CREATED));
    }
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

const verifyOTP = async (req, res, next) => {
  try {
    const { mobileNumber, otp } = req.body;

    // Retrieve the user based on the phone number
    const userResult = await getUserByPhoneNumber(mobileNumber);

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
      otpVerification: true,
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
const sendOtpToMail = async (req, res, next) => {
  const validationSchema = {
    email: Joi.string().required(),
  };
  try {
    const validatedBody = await Joi.validate(req.body, validationSchema);
    const { email } = validatedBody;
    var userResult = await findUser({
      _id: req.userId,
      status: { $ne: status.DELETE },
      userType: userType.USER,
    });
    if (!userResult) {
      throw apiError.notFound(responseMessage.USER_NOT_FOUND);
    } else {
      let otp = await getOTP();

      if (email) {
        try {
          await commonFunction.sendMailWithTemplateNodemailer(email, otp);
          // await commonFunction.sendEmailOtp(email, otp);
          // console.log("url: ", url);
        } catch (error) {
          console.log(error);
          throw apiError.forbidden(responseMessage.INCORRECT_MAIL);
        }
      }
      req.body.otpTime = new Date().getTime();
      req.body.otp = otp;
      userResult = await updateUserById(userResult._id, req.body);
      console.log("Result:", userResult);
      userResult = _.omit(JSON.parse(JSON.stringify(userResult)), "otp");
      return res.json(new response(userResult, responseMessage.OTP_SEND));
    }
  } catch (error) {
    console.log("====================>", error);
    return next(error);
  }
};
const sendOtpToPhone = async (req, res, next) => {
  const validationSchema = {
    phoneNumber: Joi.string().required(),
  };
  try {
    const validatedBody = await Joi.validate(req.body, validationSchema);
    const { phoneNumber } = validatedBody;
    var userResult = await findUser({
      _id: req.userId,
      status: { $ne: status.DELETE },
      userType: userType.USER,
    });
    if (!userResult) {
      throw apiError.notFound(responseMessage.USER_NOT_FOUND);
    } else {
      let otp = await getOTP();

      if (phoneNumber) {
        try {
          await commonFunction.sendSmsTwilio(phoneNumber, otp);
          // await commonFunction.sendEmailOtp(email, otp);
          // console.log("url: ", url);
        } catch (error) {
          console.log(error);
          throw apiError.forbidden(responseMessage.INCORRECT_NUMBER);
        }
      }
      req.body.otpTime = new Date().getTime();
      req.body.otp = otp;
      userResult = await updateUserById(userResult._id, req.body);
      console.log("Result:", userResult);
      userResult = _.omit(JSON.parse(JSON.stringify(userResult)), "otp");
      return res.json(new response(userResult, responseMessage.OTP_SEND));
    }
  } catch (error) {
    console.log("====================>", error);
    return next(error);
  }
};

const verifyMailAndUpdate = async (req, res, next) => {
  const validationSchema = {
    email: Joi.string().required(),
    otp: Joi.string().required(),
  };
  try {
    const validatedBody = await Joi.validate(req.body, validationSchema);
    const { email, otp } = validatedBody;

    // Retrieve the user based on the phone number
    var userResult = await findUser({
      _id: req.userId,
      status: { $ne: status.DELETE },
      userType: userType.USER,
    });

    if (!userResult) {
      throw apiError.notFound(responseMessage.USER_NOT_FOUND);
    }

    // Check if the OTP matches
    if (userResult.otp !== otp) {
      throw apiError.invalid(responseMessage.INCORRECT_OTP);
    }
    // Check if the OTP has expired (e.g., within 5 minutes)
    const otpExpirationTime = 5 * 60 * 1000;
    const currentTime = new Date().getTime();

    if (currentTime - userResult.otpTime > otpExpirationTime) {
      throw apiError.badRequest(responseMessage.OTP_EXPIRED);
    }
    var updatedUser = await updateUserById(userResult._id, {
      isOnline: true,
      otp: null,
      otpVerification: true,
      emailVerification: true,
      email: email,
    });
    updatedUser = _.omit(JSON.parse(JSON.stringify(updatedUser)), "otp");
    return res.json(new response(updatedUser, responseMessage.OTP_VIRIFIED));
  } catch (error) {
    console.log(error);
    return next(error);
  }
};
const updatePhoneNumber = async (req, res, next) => {
  const validationSchema = {
    phoneNumber: Joi.string().required(),
    otp: Joi.string().required(),
  };
  try {
    const validatedBody = await Joi.validate(req.body, validationSchema);
    const { phoneNumber, otp } = validatedBody;

    // Retrieve the user based on the phone number
    var userResult = await findUser({
      _id: req.userId,
      status: { $ne: status.DELETE },
      userType: userType.USER,
    });

    if (!userResult) {
      throw apiError.notFound(responseMessage.USER_NOT_FOUND);
    }

    // Check if the OTP matches
    if (userResult.otp !== otp) {
      throw apiError.invalid(responseMessage.INCORRECT_OTP);
    }
    // Check if the OTP has expired (e.g., within 5 minutes)
    const otpExpirationTime = 5 * 60 * 1000;
    const currentTime = new Date().getTime();

    if (currentTime - userResult.otpTime > otpExpirationTime) {
      throw apiError.badRequest(responseMessage.OTP_EXPIRED);
    }
    var updatedUser = await updateUserById(userResult._id, {
      isOnline: true,
      otp: null,
      otpVerification: true,
      phoneNumber: phoneNumber,
    });
    updatedUser = _.omit(JSON.parse(JSON.stringify(updatedUser)), "otp");
    return res.json(new response(updatedUser, responseMessage.USER_UPDATED));
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
    identification: Joi.string().allow("").optional(),
    interest: Joi.array().items(Joi.string()).optional().default([]),
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
    let { value, error } = Joi.object(validationSchema).validate(req.body);
    if (error) {
      return res.json(new response(error, responseMessage.BAD_REQUEST));
    }
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
    } = value;
    let userResult = await findUser({
      _id: req.userId,
      userType: userType.USER,
      status: { $ne: status.DELETE },
    });
    if (!userResult) {
      throw apiError.notFound(responseMessage.USER_NOT_FOUND);
    }
    var findemail, findname;

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
    var userInfo = await emailUserNameExist(
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
    } else {
      if (profilePic) {
        try {
          value.profilePic = await commonFunction.getSecureUrl(profilePic);
          console.log("Profile pic uploaded successfully", value.profilePic);
        } catch (error) {
          console.error("Error while uploading profile pic:", error);
        }
      }
      if (coverPic) {
        value.coverPic = await commonFunction.getSecureUrl(coverPic);
      }
      var date = new Date(new Date().getTime() + 19800000);
      var hh = date.getHours();
      var mm = date.getMinutes();
      hh = hh < 10 ? "0" + hh : hh;
      mm = mm < 10 ? "0" + mm : mm;
      let curr_time = hh + ":" + mm;
      let d = new Date().toISOString().slice(0, 10);
      // if (userResult.email != email && userResult.email.length != 0) {
      //   await commonFunction.updateProfileSendMail(
      //     userResult.email,
      //     userResult.userName,
      //     email,
      //     curr_time,
      //     d
      //   );
      // }
      let updated = await updateUserById({ _id: userResult._id }, value);
      return res.json(new response(updated, responseMessage.PROFILE_UPDATED));
    }
  } catch (error) {
    console.log("515===", error);
    return next(error);
  }
};

/**
 * @swagger
 * /admin/profile:
 *   get:
 *     tags:
 *       - ADMIN
 *     description: profile
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *     responses:
 *       200:
 *         description: Returns success message
 */
const profile = async (req, res, next) => {
  console.log("in the start of profile api");

  try {
    let userResult = await findUser({
      _id: req.userId,
      userType: { $in: [userType.USER] },
      status: { $ne: status.DELETE },
    });

    console.log("in the profile api");
    if (!userResult) {
      throw apiError.notFound(responseMessage.USER_NOT_FOUND);
    }
    let updateRes = await updateUserById(
      { _id: userResult._id },
      { isOnline: true }
    );
    return res.json(new response(updateRes, responseMessage.USER_DETAILS));
  } catch (error) {
    return next(error);
  }
};

/**
 * @swagger
 * /user/createPost:
 *   post:
 *     tags:
 *       - USER POSTS
 *     description: createPost
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - name: createPost
 *         description: createPost
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/createPost'
 *     responses:
 *       200:
 *         description: Returns success message
 */
const createPost = async (req, res, next) => {
  try {
    const validationSchema = {
      // collectionId: Joi.string().required(),
      postTitle: Joi.string().required(),
      mediaUrl: Joi.string().required(),
      details: Joi.string().required(),
      // postType: Joi.string().required(),
      amount: Joi.string().required(),
      mediaType: Joi.string().required(),
    };
    const validatedBody = await Joi.validate(req.body, validationSchema);
    var userResult = await findUser({
      _id: req.userId,
      status: { $ne: status.DELETE },
    });
    if (!userResult) {
      throw apiError.notFound(responseMessage.USER_NOT_FOUND);
    } else {
      // let result = await findCollection({ _id: validatedBody.collectionId, userId: userResult._id, status: { $ne: status.DELETE } })
      // if (!result) {
      //     throw apiError.notFound(responseMessage.COLLECTION_NOT_FOUND)
      // } else {
      if (validatedBody.mediaUrl) {
        validatedBody.mediaUrl = await commonFunction.getSecureUrl(
          validatedBody.mediaUrl
        );
      }
      validatedBody.type = "POST";
      validatedBody.userId = userResult._id;
      validatedBody.creatorId = userResult._id;
      var savePost = await createUserPost(validatedBody);
      await updateUserById({ _id: userResult._id }, { isPost: true });
      await createActivity({
        userId: userResult._id,
        postId: savePost._id,
        // collectionId: result._id,
        title: "Post create",
        desctiption: "Post create successfully.",
        type: "POST",
      });

      let obj = {
        message: "Please approve my post",
        userId: userResult._id,
        postId: savePost._id,
        type: "CREATE",
      };
      let saveRequest = await createPostRequest(obj);
      // if (validatedBody.hashTagName.length != 0) {
      //   for (let i = 0; i < validatedBody.hashTagName.length; i++) {
      //     let hashTagRes = await findHashTag({
      //       hashTagName: validatedBody.hashTagName[i],
      //       status: { $ne: status.DELETE },
      //     });
      //     if (!hashTagRes) {
      //       let obj = {
      //         hashTagName: validatedBody.hashTagName[i],
      //         postCount: 1,
      //         userCount: 1,
      //         postDetails: [
      //           {
      //             postId: savePost._id,
      //           },
      //         ],
      //       };
      //       let saveRes = await createHashTag(obj);
      //       var updateRes = await updatePost(
      //         { _id: savePost._id },
      //         {
      //           $addToSet: { hashTagId: saveRes._id },
      //           $inc: { hashTagCount: 1 },
      //         }
      //       );
      //     } else {
      //       var updateRes = await updatePost(
      //         { _id: savePost._id },
      //         {
      //           $addToSet: { hashTagId: hashTagRes._id },
      //           $inc: { hashTagCount: 1 },
      //         }
      //       );
      //       await updateHashTag(
      //         { _id: hashTagRes._id },
      //         {
      //           $push: { postDetails: { $each: [{ postId: savePost._id }] } },
      //           $inc: { postCount: 1, userCount: 1 },
      //         }
      //       );
      //     }
      //   }
      //   return res.json(new response(updateRes, responseMessage.POST_CREATE));
      // }
      return res.json(
        new response({ savePost, saveRequest }, responseMessage.POST_CREATE)
      );
      // }
    }
  } catch (error) {
    console.log("====================>", error);
    return next(error);
  }
};

/**
 * @swagger
 * /user/updatePost:
 *   put:
 *     tags:
 *       - USER POSTS
 *     description: updatePost
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - name: updatePost
 *         description: updatePost
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/updatePost'
 *     responses:
 *       200:
 *         description: Returns success message
 */
const updateUserPost = async (req, res, next) => {
  try {
    const validationSchema = {
      postId: Joi.string().required(),
      // collectionId: Joi.string().allow('').optional(),
      postTitle: Joi.string().allow("").optional(),
      mediaUrl: Joi.string().allow("").optional(),
      details: Joi.string().allow("").optional(),
      // postType: Joi.string().allow('').optional(),
      amount: Joi.string().allow("").optional(),
      // royality: Joi.string().allow('').optional(),
      // hashTagName: Joi.array().allow("").optional(),
      // tag: Joi.array().allow("").optional(),
      mediaType: Joi.string().allow("").optional(),
    };
    const validatedBody = await Joi.validate(req.body, validationSchema);
    var userResult = await findUser({
      _id: req.userId,
      status: { $ne: status.DELETE },
    });
    if (!userResult) {
      throw apiError.notFound(responseMessage.USER_NOT_FOUND);
    } else {
      let postRes = await findOnePost({
        _id: validatedBody.postId,
        userId: userResult._id,
        status: { $ne: status.DELETE },
      });
      if (!postRes) {
        throw apiError.notFound(responseMessage.POST_NOT_FOUND);
      }
      // let result = await findCollection({ _id: validatedBody.collectionId, userId: userResult._id, status: { $ne: status.DELETE } })
      // if (!result) {
      //     throw apiError.notFound(responseMessage.COLLECTION_NOT_FOUND)
      // } else {
      if (validatedBody.mediaUrl) {
        validatedBody.mediaUrl = await commonFunction.getSecureUrl(
          validatedBody.mediaUrl
        );
      }
      validatedBody.type = "POST";
      validatedBody.userId = userResult._id;
      validatedBody.creatorId = userResult._id;
      var savePost = await updatePost({ _id: postRes._id }, validatedBody);
      await updateUserById({ _id: userResult._id }, { isPost: true });
      await createActivity({
        userId: userResult._id,
        postId: savePost._id,
        // collectionId: result._id,
        title: "Post create",
        desctiption: "Post create successfully.",
        type: "POST",
      });
      // if (validatedBody.hashTagName.length != 0) {
      //     for (let i = 0; i < validatedBody.hashTagName.length; i++) {
      //         let hashTagRes = await findHashTag({ hashTagName: validatedBody.hashTagName[i], status: { $ne: status.DELETE } })
      //         if (!hashTagRes) {
      //             let obj = {
      //                 hashTagName: validatedBody.hashTagName[i],
      //                 postCount: 1,
      //                 userCount: 1,
      //                 postDetails: [{
      //                     postId: savePost._id,
      //                 }]
      //             }
      //             let saveRes = await createHashTag(obj)
      //             var updateRes = await updatePost({ _id: savePost._id }, { $addToSet: { hashTagId: saveRes._id }, $inc: { hashTagCount: 1 } })
      //         } else {
      //             var updateRes = await updatePost({ _id: savePost._id }, { $addToSet: { hashTagId: hashTagRes._id }, $inc: { hashTagCount: 1 } })
      //             await updateHashTag({ _id: hashTagRes._id }, { $push: { postDetails: { $each: [{ postId: savePost._id }] } }, $inc: { postCount: 1, userCount: 1 } });
      //         }
      //     }
      //     return res.json(new response(updateRes, responseMessage.POST_CREATE));
      // }
      return res.json(new response(savePost, responseMessage.POST_UPDATED));
      // }
    }
  } catch (error) {
    console.log("====================>", error);
    return next(error);
  }
};
/**
 * @swagger
 * /user/deleteUserPost:
 *   put:
 *     tags:
 *       - USER POSTS
 *     description: updatePost
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - name: updatePost
 *         description: updatePost
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/updatePost'
 *     responses:
 *       200:
 *         description: Returns success message
 */
const deleteUserPost = async (req, res, next) => {
  try {
    const validationSchema = {
      postId: Joi.string().required(),
    };
    const validatedBody = await Joi.validate(req.body, validationSchema);
    var userResult = await findUser({
      _id: req.userId,
      status: { $ne: status.DELETE },
    });
    if (!userResult) {
      throw apiError.notFound(responseMessage.USER_NOT_FOUND);
    } else {
      let postRes = await findOnePost({
        _id: validatedBody.postId,
        userId: userResult._id,
        status: { $ne: status.DELETE },
      });
      if (!postRes) {
        throw apiError.notFound(responseMessage.POST_NOT_FOUND);
      }
      validatedBody.creatorId = userResult._id;
      validatedBody.status = status.DELETE;
      var savePost = await updatePost({ _id: postRes._id }, validatedBody);
      await updateUserById({ _id: userResult._id }, { isPost: true });
      await createActivity({
        userId: userResult._id,
        postId: savePost._id,
        // collectionId: result._id,
        title: "Post Delete",
        desctiption: "Post Deleted successfully.",
        type: "POST",
      });
      return res.json(new response(savePost, responseMessage.POST_DELETE));
      // }
    }
  } catch (error) {
    console.log("====================>", error);
    return next(error);
  }
};

/**
 * @swagger
 * /user/postList:
 *   get:
 *     tags:
 *       - USER POSTS
 *     description: postList
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - name: search
 *         description: search
 *         in: query
 *         required: false
 *       - name: fromDate
 *         description: fromDate
 *         in: query
 *         required: false
 *       - name: toDate
 *         description: toDate
 *         in: query
 *         required: false
 *       - name: page
 *         description: page
 *         in: query
 *         required: false
 *       - name: limit
 *         description: limit
 *         in: query
 *         required: false
 *     responses:
 *       200:
 *         description: Returns success message
 */
const postListPaginate = async (req, res, next) => {
  const validationSchema = {
    search: Joi.string().optional(),
    fromDate: Joi.string().optional(),
    toDate: Joi.string().optional(),
    page: Joi.string().optional(),
    limit: Joi.string().optional(),
  };
  try {
    const validatedBody = await Joi.validate(req.query, validationSchema);
    const { search, fromDate, toDate, page, limit } = validatedBody;
    let userResult = await findUser({
      _id: req.userId,
      status: { $ne: status.DELETE },
    });
    if (!userResult) {
      throw apiError.notFound(responseMessage.USER_NOT_FOUND);
    }
    validatedBody.userId = userResult._id;
    let dataResults = await paginatePostSearch(validatedBody);
    if (dataResults.docs.length == 0) {
      throw apiError.notFound(responseMessage.DATA_NOT_FOUND);
    }
    return res.json(new response(dataResults, responseMessage.DATA_FOUND));
  } catch (error) {
    return next(error);
  }
};
/**
 * @swagger
 * /user/postView:
 *   get:
 *     tags:
 *       - USER POSTS
 *     description: postView
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - name: postId
 *         description: postId
 *         in: query
 *         required: true
 *     responses:
 *       200:
 *         description: Returns success message
 */
const postView = async (req, res, next) => {
  const validationSchema = {
    postId: Joi.string().optional(),
  };
  try {
    const validatedBody = await Joi.validate(req.query, validationSchema);
    const { postId } = validatedBody;
    let userResult = await findUser({
      _id: req.userId,
      status: { $ne: status.DELETE },
    });
    if (!userResult) {
      throw apiError.notFound(responseMessage.USER_NOT_FOUND);
    }
    let dataResults = await findOnePost({
      _id: postId,
      status: { $ne: status.DELETE },
    });
    let commentReportList = await findAllReport({
      userId: userResult._id,
      postId: postId,
    });
    // let [userCollection, collectionIdList] = await Promise.all([await userCollectionListAll({ userId: userResult._id, status: { $ne: status.DELETE } }), await collectionSubscriptionUserList({ userId: userResult._id, status: { $ne: status.DELETE } })]);
    if (!dataResults) {
      throw apiError.notFound(responseMessage.DATA_NOT_FOUND);
    }
    // for (let cObj of collectionIdList) {
    //     if (cObj['collectionId'].toString() == dataResults.collectionId) {
    //         dataResults['isSubscribed'] = true;
    //     }
    // }
    // for (let uObj of userCollection) {
    //     if (uObj['_id'].toString() == dataResults.collectionId) {
    //         dataResults['isSubscribed'] = true;
    //     }
    // }
    for (let commentObject of commentReportList) {
      dataResults["comment"] = dataResults["comment"].filter(
        (item) => !item["reportedId"].includes(commentObject._id)
      );
    }
    return res.json(new response(dataResults, responseMessage.DATA_FOUND));
  } catch (error) {
    return next(error);
  }
};
/**
 * @swagger
 * /user/allPostList:
 *   get:
 *     tags:
 *       - USER POSTS
 *     description: allPostList
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - name: search
 *         description: search
 *         in: query
 *         required: false
 *       - name: fromDate
 *         description: fromDate
 *         in: query
 *         required: false
 *       - name: toDate
 *         description: toDate
 *         in: query
 *         required: false
 *       - name: page
 *         description: page
 *         in: query
 *         required: false
 *       - name: limit
 *         description: limit
 *         in: query
 *         required: false
 *     responses:
 *       200:
 *         description: Returns success message
 */
const allPostListPaginate = async (req, res, next) => {
  const validationSchema = {
    search: Joi.string().optional(),
    fromDate: Joi.string().optional(),
    toDate: Joi.string().optional(),
    page: Joi.string().optional(),
    limit: Joi.string().optional(),
  };
  try {
    const paginateGood = (array, page_size, page_number) => {
      return array.slice(
        (page_number - 1) * page_size,
        page_number * page_size
      );
    };
    const validatedBody = await Joi.validate(req.query, validationSchema);
    const { search, fromDate, toDate, page, limit } = validatedBody;
    var userResult = await findUser({
      _id: req.userId,
      status: { $ne: status.DELETE },
    });
    if (!userResult) {
      throw apiError.notFound(responseMessage.USER_NOT_FOUND);
    }
    // let postPromotionResult = await postPromotionList({ status: status.ACTIVE })
    validatedBody["status"] = status.ACTIVE;
    // validatedBody['postType'] = { $in: ['PRIVATE', 'PUBLIC'] };
    validatedBody["isSold"] = false;
    validatedBody["isBuy"] = false;
    let newDoc = [];
    // let data = await paginateAllPostSearchPrivatePublicFind(validatedBody);
    let [data, postPromotionResult, userCollection, collectionIdList] =
      await Promise.all([
        paginateAllPostSearchPrivatePublicFind(validatedBody),
        // postPromotionList({ status: status.ACTIVE }),
        // userCollectionListAll({ userId: userResult._id, status: { $ne: status.DELETE } }),
        // collectionSubscriptionUserList({ userId: userResult._id, status: { $ne: status.DELETE } })
      ]);

    let postPromotionRes = [];
    for (let i = 0; i < postPromotionResult.length; i++) {
      if (!userResult.blockedUser.includes(postPromotionResult[i].userId._id)) {
        postPromotionRes.push(postPromotionResult[i]);
      }
    }

    let blockUserRes = [];
    for (let i = 0; i < data.length; i++) {
      if (!userResult.blockedUser.includes(data[i].userId._id)) {
        blockUserRes.push(data[i]);
      }
    }

    let dataResults = [];
    for (let i = 0; i < blockUserRes.length; i++) {
      if (!userResult.hidePost.includes(blockUserRes[i]._id)) {
        dataResults.push(blockUserRes[i]);
      }
    }
    for (let i in dataResults) {
      for (let cObj of collectionIdList) {
        if (
          cObj["collectionId"]["_id"].toString() == dataResults[i].collectionId
        ) {
          dataResults[i]["isSubscribed"] = true;
        }
      }
      for (let uObj of userCollection) {
        if (uObj["_id"].toString() == dataResults[i].collectionId) {
          dataResults[i]["isSubscribed"] = true;
        }
      }
      if (userResult["myWatchlist"].includes(dataResults[i]._id) == true) {
        dataResults[i]["isWatchList"] = true;
      }
      dataResults[i].reactOnPost = await dataResults[i].reactOnPost.find(
        (o) => {
          return o.userId.toString() == userResult._id.toString();
        }
      );
    }
    var finaldataRes = [];
    for (let obj of dataResults) {
      let findReportRes = await findAllReport({
        userId: userResult._id,
        postId: obj._id,
      });
      if (findReportRes.length == 0) {
        finaldataRes.push(obj);
      } else {
        for (let commentObject of findReportRes) {
          obj["comment"] = obj["comment"].filter(
            (item) => !item["reportedId"].includes(commentObject._id)
          );
        }
        if (!obj.reportedId.includes(findReportRes[0]._id)) {
          finaldataRes.push(obj);
        }
      }
    }
    let resultRes = [];
    let count = 0;
    var userDob = new Date(userResult.dob);
    var currentDate = new Date();
    var diffDays = currentDate.getYear() - userDob.getYear();
    var postPromotionfinalResult = [];
    for (let i = 0; i < postPromotionRes.length; i++) {
      for (let j = 0; j < userResult.interest.length; j++) {
        for (let x = 0; x < postPromotionRes[i].interest.length; x++) {
          if (
            postPromotionRes[i].interest[x] == userResult.interest[j] &&
            postPromotionRes[i].minAge <= diffDays &&
            postPromotionRes[i].maxAge >= diffDays &&
            userResult._id.toString() !=
              postPromotionRes[i].userId._id.toString()
          ) {
            postPromotionfinalResult.push(postPromotionRes[i]);
          } else if (
            userResult._id.toString() ==
            postPromotionRes[i].userId._id.toString()
          ) {
            postPromotionfinalResult.push(postPromotionRes[i]);
          }
        }
      }
    }
    if (finaldataRes.length == 0) {
      for (let i = 0; i < postPromotionfinalResult.length; i++) {
        resultRes.push(postPromotionfinalResult[i]);
      }
    }
    for (let i = 0; i < finaldataRes.length; i++) {
      count++;
      resultRes.push(finaldataRes[i]);
      if (
        count % 2 == 0 &&
        postPromotionfinalResult[count / 2 - 1] &&
        resultRes.includes(postPromotionfinalResult[count / 2 - 1]) == false
      ) {
        resultRes.push(postPromotionfinalResult[count / 2 - 1]);
      }
    }
    let options2 = {
      page: parseInt(req.query.page) || 1,
      limit: parseInt(req.query.limit) || 10,
    };
    let properResult = {
      docs: paginateGood(resultRes, options2.limit, options2.page),
      total: resultRes.length,
      limit: options2.limit,
      page: options2.page,
      pages: Math.ceil(resultRes.length / options2.limit),
    };
    if (properResult.docs.length == 0) {
      throw apiError.notFound(responseMessage.POST_NOT_FOUND);
    }
    return res.json(new response(properResult, responseMessage.DATA_FOUND));
  } catch (error) {
    console.log("Catch error ==>", error);
    return next(error);
  }
};

/**
 * @swagger
 * /admin/allPostList:
 *   get:
 *     tags:
 *       - ADMIN
 *     description: allPostList
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - name: postId
 *         description: postId
 *         in: query
 *         required: true
 *     responses:
 *       200:
 *         description: Returns success message
 */
const getAllPostList = async (req, res, next) => {
  try {
    let userResult = await findUser({
      _id: req.userId,
      status: { $ne: status.DELETE },
      userType: { $in: [userType.USER] },
    });
    if (!userResult) {
      throw apiError.notFound(responseMessage.USER_NOT_FOUND);
    }
    let data = await listPost({
      status: status.ACTIVE,
    });
    if (!data) {
      throw apiError.notFound(responseMessage.DATA_NOT_FOUND);
    } else {
      return res.json(new response(data, responseMessage.DATA_FOUND));
    }
  } catch (error) {
    return next(error);
  }
};
/**
 * @swagger
 * /admin/getAllPostsByUserId:
 *   get:
 *     tags:
 *       - ADMIN
 *     description: getAllPostsByUserId
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - name: postId
 *         description: postId
 *         in: query
 *         required: true
 *     responses:
 *       200:
 *         description: Returns success message
 */
const getAllPostsByUserId = async (req, res, next) => {
  try {
    let userResult = await findUser({
      _id: req.userId,
      status: { $ne: status.DELETE },
      userType: { $in: [userType.USER] },
    });
    if (!userResult) {
      throw apiError.notFound(responseMessage.USER_NOT_FOUND);
    }
    let data = await listPost({
      userId: req.userId,
      status: status.ACTIVE,
    });
    if (!data) {
      throw apiError.notFound(responseMessage.DATA_NOT_FOUND);
    } else {
      return res.json(new response(data, responseMessage.DATA_FOUND));
    }
  } catch (error) {
    return next(error);
  }
};
/////////Products////////////

/**
 * @swagger
 * /user/createProduct:
 *   post:
 *     tags:
 *       - USER PRODUCT
 *     description: createProduct
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - name: createPost
 *         description: createPost
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/createProduct'
 *     responses:
 *       200:
 *         description: Returns success message
 */
const createProduct = async (req, res, next) => {
  try {
    const validationSchema = {
      productName: Joi.string().optional(),
      mediaUrl: Joi.string().optional(),
      details: Joi.string().required(),
      amount: Joi.string().optional(),
      type: Joi.string().required(),
      mediaType: Joi.string().optional(),
      categorie: Joi.string().optional(),
      subCategorie: Joi.string().optional(),
      moq: Joi.string().optional(),
      mqu: Joi.string().optional(),
    };
    const validatedBody = await Joi.validate(req.body, validationSchema);
    var userResult = await findUser({
      _id: req.userId,
      status: { $ne: status.DELETE },
    });
    if (!userResult) {
      throw apiError.notFound(responseMessage.USER_NOT_FOUND);
    } else {
      // let result = await findCollection({ _id: validatedBody.collectionId, userId: userResult._id, status: { $ne: status.DELETE } })
      // if (!result) {
      //     throw apiError.notFound(responseMessage.COLLECTION_NOT_FOUND)
      // } else {
      if (validatedBody.mediaUrl) {
        validatedBody.mediaUrl = await commonFunction.getSecureUrl(
          validatedBody.mediaUrl
        );
      }
      validatedBody.userId = userResult._id;
      validatedBody.creatorId = userResult._id;
      var saveProduct = await createUserProduct(validatedBody);
      await updateUserById({ _id: userResult._id }, { isProduct: true });
      await createActivity({
        userId: userResult._id,
        postId: saveProduct._id,
        // collectionId: result._id,
        title: "Product create",
        desctiption: "Product create successfully.",
        type: "PRODUCT",
      });

      let obj = {
        message: "Please approve my product",
        userId: userResult._id,
        productId: saveProduct._id,
        type: "CREATE",
      };
      let saveRequest = await createProductRequest(obj);

      return res.json(
        new response(
          { saveProduct, saveRequest },
          responseMessage.PRODUCT_CREATE
        )
      );
      // }
    }
  } catch (error) {
    console.log("====================>", error);
    return next(error);
  }
};

///

/**
 * @swagger
 * /user/updatePost:
 *   put:
 *     tags:
 *       - USER POSTS
 *     description: updatePost
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - name: updatePost
 *         description: updatePost
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/updatePost'
 *     responses:
 *       200:
 *         description: Returns success message
 */
const updateUserProduct = async (req, res, next) => {
  try {
    const validationSchema = {
      productId: Joi.string().required(),
      // collectionId: Joi.string().allow('').optional(),
      productName: Joi.string().allow("").optional(),
      mediaUrl: Joi.string().allow("").optional(),
      details: Joi.string().allow("").optional(),
      // postType: Joi.string().allow('').optional(),
      amount: Joi.string().allow("").optional(),
      // royality: Joi.string().allow('').optional(),
      // hashTagName: Joi.array().allow("").optional(),
      // tag: Joi.array().allow("").optional(),
      mediaType: Joi.string().allow("").optional(),
      categorie: Joi.string().allow("").optional(),
      subCategorie: Joi.string().allow("").optional(),
      moq: Joi.string().optional(),
      mqu: Joi.string().optional(),
    };
    const validatedBody = await Joi.validate(req.body, validationSchema);
    var userResult = await findUser({
      _id: req.userId,
      status: { $ne: status.DELETE },
    });
    if (!userResult) {
      throw apiError.notFound(responseMessage.USER_NOT_FOUND);
    } else {
      let productRes = await findOneProduct({
        _id: validatedBody.productId,
        userId: userResult._id,
        status: { $ne: status.DELETE },
      });
      if (!productRes) {
        throw apiError.notFound(responseMessage.PRODUCT_NOT_FOUND);
      }
      // let result = await findCollection({ _id: validatedBody.collectionId, userId: userResult._id, status: { $ne: status.DELETE } })
      // if (!result) {
      //     throw apiError.notFound(responseMessage.COLLECTION_NOT_FOUND)
      // } else {
      if (validatedBody.mediaUrl) {
        validatedBody.mediaUrl = await commonFunction.getSecureUrl(
          validatedBody.mediaUrl
        );
      }
      validatedBody.userId = userResult._id;
      validatedBody.creatorId = userResult._id;
      var saveProduct = await updateProduct(
        { _id: productRes._id },
        validatedBody
      );
      await updateUserById({ _id: userResult._id }, { isPost: true });
      await createActivity({
        userId: userResult._id,
        productId: saveProduct._id,
        // collectionId: result._id,
        title: "Product update",
        desctiption: "Product update successfully.",
        type: "PRODUCT",
      });
      // if (validatedBody.hashTagName.length != 0) {
      //     for (let i = 0; i < validatedBody.hashTagName.length; i++) {
      //         let hashTagRes = await findHashTag({ hashTagName: validatedBody.hashTagName[i], status: { $ne: status.DELETE } })
      //         if (!hashTagRes) {
      //             let obj = {
      //                 hashTagName: validatedBody.hashTagName[i],
      //                 postCount: 1,
      //                 userCount: 1,
      //                 postDetails: [{
      //                     postId: savePost._id,
      //                 }]
      //             }
      //             let saveRes = await createHashTag(obj)
      //             var updateRes = await updatePost({ _id: savePost._id }, { $addToSet: { hashTagId: saveRes._id }, $inc: { hashTagCount: 1 } })
      //         } else {
      //             var updateRes = await updatePost({ _id: savePost._id }, { $addToSet: { hashTagId: hashTagRes._id }, $inc: { hashTagCount: 1 } })
      //             await updateHashTag({ _id: hashTagRes._id }, { $push: { postDetails: { $each: [{ postId: savePost._id }] } }, $inc: { postCount: 1, userCount: 1 } });
      //         }
      //     }
      //     return res.json(new response(updateRes, responseMessage.POST_CREATE));
      // }
      return res.json(new response(saveProduct, responseMessage.POST_UPDATED));
      // }
    }
  } catch (error) {
    console.log("====================>", error);
    return next(error);
  }
};
/**
 * @swagger
 * /user/deleteUserPost:
 *   put:
 *     tags:
 *       - USER POSTS
 *     description: updatePost
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - name: updatePost
 *         description: updatePost
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/updatePost'
 *     responses:
 *       200:
 *         description: Returns success message
 */
const deleteUserProduct = async (req, res, next) => {
  try {
    const validationSchema = {
      productId: Joi.string().required(),
    };
    const validatedBody = await Joi.validate(req.body, validationSchema);
    var userResult = await findUser({
      _id: req.userId,
      status: { $ne: status.DELETE },
    });
    if (!userResult) {
      throw apiError.notFound(responseMessage.USER_NOT_FOUND);
    } else {
      let postRes = await findOneProduct({
        _id: validatedBody.productId,
        userId: userResult._id,
        status: { $ne: status.DELETE },
      });
      if (!postRes) {
        throw apiError.notFound(responseMessage.PRODUCT_NOT_FOUND);
      }
      validatedBody.creatorId = userResult._id;
      validatedBody.status = status.DELETE;
      var savePost = await updateProduct({ _id: postRes._id }, validatedBody);
      await updateUserById({ _id: userResult._id }, { isPost: true });
      await createActivity({
        userId: userResult._id,
        productId: savePost._id,
        // collectionId: result._id,
        title: "Product Delete",
        desctiption: "Product Deleted successfully.",
        type: "PRODUCT",
      });
      return res.json(new response(savePost, responseMessage.PRODUCT_DELETE));
      // }
    }
  } catch (error) {
    console.log("====================>", error);
    return next(error);
  }
};

/**
 * @swagger
 * /user/productListPaginate:
 *   get:
 *     tags:
 *       - USER productListPaginate
 *     description: productListPaginate
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - name: search
 *         description: search
 *         in: query
 *         required: false
 *       - name: fromDate
 *         description: fromDate
 *         in: query
 *         required: false
 *       - name: toDate
 *         description: toDate
 *         in: query
 *         required: false
 *       - name: page
 *         description: page
 *         in: query
 *         required: false
 *       - name: limit
 *         description: limit
 *         in: query
 *         required: false
 *     responses:
 *       200:
 *         description: Returns success message
 */
const productListPaginate = async (req, res, next) => {
  const validationSchema = {
    search: Joi.string().optional(),
    fromDate: Joi.string().optional(),
    toDate: Joi.string().optional(),
    page: Joi.string().optional(),
    limit: Joi.string().optional(),
  };
  try {
    const validatedBody = await Joi.validate(req.query, validationSchema);
    const { search, fromDate, toDate, page, limit } = validatedBody;
    let userResult = await findUser({
      _id: req.userId,
      status: { $ne: status.DELETE },
    });
    if (!userResult) {
      throw apiError.notFound(responseMessage.USER_NOT_FOUND);
    }
    validatedBody.userId = userResult._id;
    let dataResults = await paginateProductSearch(validatedBody);
    if (dataResults.docs.length == 0) {
      throw apiError.notFound(responseMessage.DATA_NOT_FOUND);
    }
    return res.json(new response(dataResults, responseMessage.DATA_FOUND));
  } catch (error) {
    return next(error);
  }
};
/**
 * @swagger
 * /user/productView:
 *   get:
 *     tags:
 *       - USER productView
 *     description: productView
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - name: postId
 *         description: postId
 *         in: query
 *         required: true
 *     responses:
 *       200:
 *         description: Returns success message
 */
const productView = async (req, res, next) => {
  const validationSchema = {
    productId: Joi.string().optional(),
  };
  try {
    const validatedBody = await Joi.validate(req.query, validationSchema);
    const { productId } = validatedBody;
    let userResult = await findUser({
      _id: req.userId,
      status: { $ne: status.DELETE },
    });
    if (!userResult) {
      throw apiError.notFound(responseMessage.USER_NOT_FOUND);
    }
    let dataResults = await findOneProduct({
      _id: productId,
      status: { $ne: status.DELETE },
    });
    let commentReportList = await findAllReport({
      userId: userResult._id,
      productId: productId,
    });
    // let [userCollection, collectionIdList] = await Promise.all([await userCollectionListAll({ userId: userResult._id, status: { $ne: status.DELETE } }), await collectionSubscriptionUserList({ userId: userResult._id, status: { $ne: status.DELETE } })]);
    if (!dataResults) {
      throw apiError.notFound(responseMessage.DATA_NOT_FOUND);
    }
    // for (let cObj of collectionIdList) {
    //     if (cObj['collectionId'].toString() == dataResults.collectionId) {
    //         dataResults['isSubscribed'] = true;
    //     }
    // }
    // for (let uObj of userCollection) {
    //     if (uObj['_id'].toString() == dataResults.collectionId) {
    //         dataResults['isSubscribed'] = true;
    //     }
    // }
    for (let commentObject of commentReportList) {
      dataResults["comment"] = dataResults["comment"].filter(
        (item) => !item["reportedId"].includes(commentObject._id)
      );
    }
    return res.json(new response(dataResults, responseMessage.DATA_FOUND));
  } catch (error) {
    return next(error);
  }
};
/**
 * @swagger
 * /user/allProductListPaginate:
 *   get:
 *     tags:
 *       - USER Products
 *     description: allProductListPaginate
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - name: search
 *         description: search
 *         in: query
 *         required: false
 *       - name: fromDate
 *         description: fromDate
 *         in: query
 *         required: false
 *       - name: toDate
 *         description: toDate
 *         in: query
 *         required: false
 *       - name: page
 *         description: page
 *         in: query
 *         required: false
 *       - name: limit
 *         description: limit
 *         in: query
 *         required: false
 *     responses:
 *       200:
 *         description: Returns success message
 */
const allProductListPaginate = async (req, res, next) => {
  const validationSchema = {
    search: Joi.string().optional(),
    fromDate: Joi.string().optional(),
    toDate: Joi.string().optional(),
    page: Joi.string().optional(),
    limit: Joi.string().optional(),
  };
  try {
    const paginateGood = (array, page_size, page_number) => {
      return array.slice(
        (page_number - 1) * page_size,
        page_number * page_size
      );
    };
    const validatedBody = await Joi.validate(req.query, validationSchema);
    const { search, fromDate, toDate, page, limit } = validatedBody;
    var userResult = await findUser({
      _id: req.userId,
      status: { $ne: status.DELETE },
    });
    if (!userResult) {
      throw apiError.notFound(responseMessage.USER_NOT_FOUND);
    }
    // let postPromotionResult = await postPromotionList({ status: status.ACTIVE })
    validatedBody["status"] = status.ACTIVE;
    // validatedBody['postType'] = { $in: ['PRIVATE', 'PUBLIC'] };
    validatedBody["isSold"] = false;
    validatedBody["isBuy"] = false;
    let newDoc = [];
    // let data = await paginateAllPostSearchPrivatePublicFind(validatedBody);
    let [data, postPromotionResult, userCollection, collectionIdList] =
      await Promise.all([
        paginateAllPostSearchPrivatePublicFind(validatedBody),
        // postPromotionList({ status: status.ACTIVE }),
        // userCollectionListAll({ userId: userResult._id, status: { $ne: status.DELETE } }),
        // collectionSubscriptionUserList({ userId: userResult._id, status: { $ne: status.DELETE } })
      ]);

    let postPromotionRes = [];
    for (let i = 0; i < postPromotionResult.length; i++) {
      if (!userResult.blockedUser.includes(postPromotionResult[i].userId._id)) {
        postPromotionRes.push(postPromotionResult[i]);
      }
    }

    let blockUserRes = [];
    for (let i = 0; i < data.length; i++) {
      if (!userResult.blockedUser.includes(data[i].userId._id)) {
        blockUserRes.push(data[i]);
      }
    }

    let dataResults = [];
    for (let i = 0; i < blockUserRes.length; i++) {
      if (!userResult.hidePost.includes(blockUserRes[i]._id)) {
        dataResults.push(blockUserRes[i]);
      }
    }
    for (let i in dataResults) {
      for (let cObj of collectionIdList) {
        if (
          cObj["collectionId"]["_id"].toString() == dataResults[i].collectionId
        ) {
          dataResults[i]["isSubscribed"] = true;
        }
      }
      for (let uObj of userCollection) {
        if (uObj["_id"].toString() == dataResults[i].collectionId) {
          dataResults[i]["isSubscribed"] = true;
        }
      }
      if (userResult["myWatchlist"].includes(dataResults[i]._id) == true) {
        dataResults[i]["isWatchList"] = true;
      }
      dataResults[i].reactOnPost = await dataResults[i].reactOnPost.find(
        (o) => {
          return o.userId.toString() == userResult._id.toString();
        }
      );
    }
    var finaldataRes = [];
    for (let obj of dataResults) {
      let findReportRes = await findAllReport({
        userId: userResult._id,
        postId: obj._id,
      });
      if (findReportRes.length == 0) {
        finaldataRes.push(obj);
      } else {
        for (let commentObject of findReportRes) {
          obj["comment"] = obj["comment"].filter(
            (item) => !item["reportedId"].includes(commentObject._id)
          );
        }
        if (!obj.reportedId.includes(findReportRes[0]._id)) {
          finaldataRes.push(obj);
        }
      }
    }
    let resultRes = [];
    let count = 0;
    var userDob = new Date(userResult.dob);
    var currentDate = new Date();
    var diffDays = currentDate.getYear() - userDob.getYear();
    var postPromotionfinalResult = [];
    for (let i = 0; i < postPromotionRes.length; i++) {
      for (let j = 0; j < userResult.interest.length; j++) {
        for (let x = 0; x < postPromotionRes[i].interest.length; x++) {
          if (
            postPromotionRes[i].interest[x] == userResult.interest[j] &&
            postPromotionRes[i].minAge <= diffDays &&
            postPromotionRes[i].maxAge >= diffDays &&
            userResult._id.toString() !=
              postPromotionRes[i].userId._id.toString()
          ) {
            postPromotionfinalResult.push(postPromotionRes[i]);
          } else if (
            userResult._id.toString() ==
            postPromotionRes[i].userId._id.toString()
          ) {
            postPromotionfinalResult.push(postPromotionRes[i]);
          }
        }
      }
    }
    if (finaldataRes.length == 0) {
      for (let i = 0; i < postPromotionfinalResult.length; i++) {
        resultRes.push(postPromotionfinalResult[i]);
      }
    }
    for (let i = 0; i < finaldataRes.length; i++) {
      count++;
      resultRes.push(finaldataRes[i]);
      if (
        count % 2 == 0 &&
        postPromotionfinalResult[count / 2 - 1] &&
        resultRes.includes(postPromotionfinalResult[count / 2 - 1]) == false
      ) {
        resultRes.push(postPromotionfinalResult[count / 2 - 1]);
      }
    }
    let options2 = {
      page: parseInt(req.query.page) || 1,
      limit: parseInt(req.query.limit) || 10,
    };
    let properResult = {
      docs: paginateGood(resultRes, options2.limit, options2.page),
      total: resultRes.length,
      limit: options2.limit,
      page: options2.page,
      pages: Math.ceil(resultRes.length / options2.limit),
    };
    if (properResult.docs.length == 0) {
      throw apiError.notFound(responseMessage.POST_NOT_FOUND);
    }
    return res.json(new response(properResult, responseMessage.DATA_FOUND));
  } catch (error) {
    console.log("Catch error ==>", error);
    return next(error);
  }
};

/**
 * @swagger
 * /admin/allProductList:
 *   get:
 *     tags:
 *       - ADMIN
 *     description: allProductList
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - name: postId
 *         description: postId
 *         in: query
 *         required: true
 *     responses:
 *       200:
 *         description: Returns success message
 */
const getAllProductList = async (req, res, next) => {
  try {
    let userResult = await findUser({
      _id: req.userId,
      status: { $ne: status.DELETE },
      userType: userType.USER,
    });
    if (!userResult) {
      throw apiError.notFound(responseMessage.USER_NOT_FOUND);
    }
    let data = await listProduct({
      status: status.ACTIVE,
    });
    if (!data) {
      throw apiError.notFound(responseMessage.DATA_NOT_FOUND);
    } else {
      return res.json(new response(data, responseMessage.DATA_FOUND));
    }
  } catch (error) {
    return next(error);
  }
};
/**
 * @swagger
 * /admin/listAllUserProducts:
 *   get:
 *     tags:
 *       - ADMIN
 *     description: listAllUserProducts
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - name: postId
 *         description: postId
 *         in: query
 *         required: true
 *     responses:
 *       200:
 *         description: Returns success message
 */
const getAllProductsByUserId = async (req, res, next) => {
  try {
    let userResult = await findUser({
      _id: req.userId,
      status: { $ne: status.DELETE },
      userType: userType.USER,
    });
    if (!userResult) {
      throw apiError.notFound(responseMessage.USER_NOT_FOUND);
    }
    let data = await listProduct({
      userId: req.userId,
      status: status.ACTIVE,
    });
    if (!data) {
      throw apiError.notFound(responseMessage.DATA_NOT_FOUND);
    } else {
      return res.json(new response(data, responseMessage.DATA_FOUND));
    }
  } catch (error) {
    return next(error);
  }
};

/**
 * @swagger
 * /admin/getSellerProductList:
 *   get:
 *     tags:
 *       - ADMIN
 *     description: getSellerProductList
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - name: postId
 *         description: postId
 *         in: query
 *         required: true
 *     responses:
 *       200:
 *         description: Returns success message
 */
const getSellerProductList = async (req, res, next) => {
  try {
    let userResult = await findUser({
      _id: req.userId,
      status: { $ne: status.DELETE },
      userType: userType.USER,
    });
    if (!userResult) {
      throw apiError.notFound(responseMessage.USER_NOT_FOUND);
    }
    let data = await listProduct({
      status: status.ACTIVE,
      type: "SELLER",
    });
    if (!data) {
      throw apiError.notFound(responseMessage.DATA_NOT_FOUND);
    } else {
      return res.json(new response(data, responseMessage.DATA_FOUND));
    }
  } catch (error) {
    return next(error);
  }
};
/**
 * @swagger
 * /admin/getBuyerProductList:
 *   get:
 *     tags:
 *       - ADMIN
 *     description: getBuyerProductList
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - name: postId
 *         description: postId
 *         in: query
 *         required: true
 *     responses:
 *       200:
 *         description: Returns success message
 */
const getBuyerProductList = async (req, res, next) => {
  try {
    let userResult = await findUser({
      _id: req.userId,
      status: { $ne: status.DELETE },
      userType: userType.USER,
    });
    if (!userResult) {
      throw apiError.notFound(responseMessage.USER_NOT_FOUND);
    }
    let data = await listProduct({
      status: status.ACTIVE,
      type: "BUYER",
    });
    if (!data) {
      throw apiError.notFound(responseMessage.DATA_NOT_FOUND);
    } else {
      return res.json(new response(data, responseMessage.DATA_FOUND));
    }
  } catch (error) {
    return next(error);
  }
};
/////////Job////////////

/**
 * @swagger
 * /user/createJob:
 *   post:
 *     tags:
 *       - USER PRODUCT
 *     description: createJob
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - name: createJob
 *         description: createJob
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/createJob'
 *     responses:
 *       200:
 *         description: Returns success message
 */
const createJob = async (req, res, next) => {
  try {
    const validationSchema = {
      // collectionId: Joi.string().required(),
      title: Joi.string().optional(),
      sector: Joi.string().optional(),
      profession: Joi.string().optional(),
      mediaUrl: Joi.string().optional(),
      description: Joi.string().optional(),
      // postType: Joi.string().required(),
      salary: Joi.string().optional(),
      mediaType: Joi.string().optional(),
      experience: Joi.string().optional(),
      skills: Joi.string().optional(),
      type: Joi.string().optional(),
      resume: Joi.string().optional(),
    };
    const validatedBody = await Joi.validate(req.body, validationSchema);
    var userResult = await findUser({
      _id: req.userId,
      status: { $ne: status.DELETE },
    });
    if (!userResult) {
      throw apiError.notFound(responseMessage.USER_NOT_FOUND);
    } else {
      // let result = await findCollection({ _id: validatedBody.collectionId, userId: userResult._id, status: { $ne: status.DELETE } })
      // if (!result) {
      //     throw apiError.notFound(responseMessage.COLLECTION_NOT_FOUND)
      // } else {
      if (validatedBody.mediaUrl) {
        validatedBody.mediaUrl = await commonFunction.getSecureUrl(
          validatedBody.mediaUrl
        );
      }
      validatedBody.userId = userResult._id;
      validatedBody.creatorId = userResult._id;
      var saveJob = await createUserJob(validatedBody);
      await updateUserById({ _id: userResult._id }, { isJob: true });
      await createActivity({
        userId: userResult._id,
        postId: saveJob._id,
        // collectionId: result._id,
        title: "Job create",
        desctiption: "Job create successfully.",
        type: "JOB",
      });

      let obj = {
        message: "Please approve my Job",
        userId: userResult._id,
        jobId: saveJob._id,
        type: "CREATE",
      };
      let saveRequest = await createJobRequest(obj);
      // if (validatedBody.hashTagName.length != 0) {
      //   for (let i = 0; i < validatedBody.hashTagName.length; i++) {
      //     let hashTagRes = await findHashTag({
      //       hashTagName: validatedBody.hashTagName[i],
      //       status: { $ne: status.DELETE },
      //     });
      //     if (!hashTagRes) {
      //       let obj = {
      //         hashTagName: validatedBody.hashTagName[i],
      //         postCount: 1,
      //         userCount: 1,
      //         postDetails: [
      //           {
      //             postId: savePost._id,
      //           },
      //         ],
      //       };
      //       let saveRes = await createHashTag(obj);
      //       var updateRes = await updatePost(
      //         { _id: savePost._id },
      //         {
      //           $addToSet: { hashTagId: saveRes._id },
      //           $inc: { hashTagCount: 1 },
      //         }
      //       );
      //     } else {
      //       var updateRes = await updatePost(
      //         { _id: savePost._id },
      //         {
      //           $addToSet: { hashTagId: hashTagRes._id },
      //           $inc: { hashTagCount: 1 },
      //         }
      //       );
      //       await updateHashTag(
      //         { _id: hashTagRes._id },
      //         {
      //           $push: { postDetails: { $each: [{ postId: savePost._id }] } },
      //           $inc: { postCount: 1, userCount: 1 },
      //         }
      //       );
      //     }
      //   }
      //   return res.json(new response(updateRes, responseMessage.POST_CREATE));
      // }
      return res.json(
        new response({ saveJob, saveRequest }, responseMessage.JOB_CREATE)
      );
      // }
    }
  } catch (error) {
    console.log("====================>", error);
    return next(error);
  }
};

/**
 * @swagger
 * /user/updateJob:
 *   put:
 *     tags:
 *       - USER POSTS
 *     description: updateJob
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - name: updateJob
 *         description: updateJob
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/updateJob'
 *     responses:
 *       200:
 *         description: Returns success message
 */
const updateUserJob = async (req, res, next) => {
  try {
    const validationSchema = {
      jobId: Joi.string().required(),
      // collectionId: Joi.string().allow('').optional(),
      title: Joi.string().allow("").optional(),
      mediaUrl: Joi.string().allow("").optional(),
      sector: Joi.string().allow("").optional(),
      // postType: Joi.string().allow('').optional(),
      profession: Joi.string().allow("").optional(),
      description: Joi.string().allow("").optional(),
      salary: Joi.string().allow("").optional(),
      // hashTagName: Joi.array().allow("").optional(),
      // tag: Joi.array().allow("").optional(),
      mediaType: Joi.string().allow("").optional(),
      experience: Joi.string().allow("").optional(),
      skills: Joi.string().allow("").optional(),
      resume: Joi.string().allow("").optional(),
    };
    const validatedBody = await Joi.validate(req.body, validationSchema);
    var userResult = await findUser({
      _id: req.userId,
      status: { $ne: status.DELETE },
    });
    if (!userResult) {
      throw apiError.notFound(responseMessage.USER_NOT_FOUND);
    } else {
      let jobRes = await findOneJob({
        _id: validatedBody.jobId,
        userId: userResult._id,
        status: { $ne: status.DELETE },
      });
      if (!jobRes) {
        throw apiError.notFound(responseMessage.JOB_NOT_FOUND);
      }
      // let result = await findCollection({ _id: validatedBody.collectionId, userId: userResult._id, status: { $ne: status.DELETE } })
      // if (!result) {
      //     throw apiError.notFound(responseMessage.COLLECTION_NOT_FOUND)
      // } else {
      if (validatedBody.mediaUrl) {
        validatedBody.mediaUrl = await commonFunction.getSecureUrl(
          validatedBody.mediaUrl
        );
      }
      validatedBody.type = "JOB";
      validatedBody.userId = userResult._id;
      validatedBody.creatorId = userResult._id;
      var saveJob = await updateJob({ _id: jobRes._id }, validatedBody);
      await updateUserById({ _id: userResult._id }, { isJob: true });
      await createActivity({
        userId: userResult._id,
        productId: saveJob._id,
        // collectionId: result._id,
        title: "Job update",
        desctiption: "Job update successfully.",
        type: "JOB",
      });
      // if (validatedBody.hashTagName.length != 0) {
      //     for (let i = 0; i < validatedBody.hashTagName.length; i++) {
      //         let hashTagRes = await findHashTag({ hashTagName: validatedBody.hashTagName[i], status: { $ne: status.DELETE } })
      //         if (!hashTagRes) {
      //             let obj = {
      //                 hashTagName: validatedBody.hashTagName[i],
      //                 postCount: 1,
      //                 userCount: 1,
      //                 postDetails: [{
      //                     postId: savePost._id,
      //                 }]
      //             }
      //             let saveRes = await createHashTag(obj)
      //             var updateRes = await updatePost({ _id: savePost._id }, { $addToSet: { hashTagId: saveRes._id }, $inc: { hashTagCount: 1 } })
      //         } else {
      //             var updateRes = await updatePost({ _id: savePost._id }, { $addToSet: { hashTagId: hashTagRes._id }, $inc: { hashTagCount: 1 } })
      //             await updateHashTag({ _id: hashTagRes._id }, { $push: { postDetails: { $each: [{ postId: savePost._id }] } }, $inc: { postCount: 1, userCount: 1 } });
      //         }
      //     }
      //     return res.json(new response(updateRes, responseMessage.POST_CREATE));
      // }
      return res.json(new response(saveJob, responseMessage.JOB_UPDATED));
      // }
    }
  } catch (error) {
    console.log("====================>", error);
    return next(error);
  }
};
/**
 * @swagger
 * /user/deleteUserJob:
 *   put:
 *     tags:
 *       - USER POSTS
 *     description: updateJob
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - name: updateJob
 *         description: updateJob
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/updateJob'
 *     responses:
 *       200:
 *         description: Returns success message
 */
const deleteUserJob = async (req, res, next) => {
  try {
    const validationSchema = {
      jobId: Joi.string().required(),
    };
    const validatedBody = await Joi.validate(req.body, validationSchema);
    var userResult = await findUser({
      _id: req.userId,
      status: { $ne: status.DELETE },
    });
    if (!userResult) {
      throw apiError.notFound(responseMessage.USER_NOT_FOUND);
    } else {
      let jobRes = await findOneJob({
        _id: validatedBody.jobId,
        userId: userResult._id,
        status: { $ne: status.DELETE },
      });
      if (!jobRes) {
        throw apiError.notFound(responseMessage.JOB_NOT_FOUND);
      }
      validatedBody.creatorId = userResult._id;
      validatedBody.status = status.DELETE;
      var saveJob = await updateJob({ _id: jobRes._id }, validatedBody);
      await updateUserById({ _id: userResult._id }, { isJob: true });
      await createActivity({
        userId: userResult._id,
        postId: saveJob._id,
        // collectionId: result._id,
        title: "Job Delete",
        desctiption: "Job Deleted successfully.",
        type: "JOB",
      });
      return res.json(new response(saveJob, responseMessage.JOB_DELETE));
      // }
    }
  } catch (error) {
    console.log("====================>", error);
    return next(error);
  }
};

/**
 * @swagger
 * /user/jobListPaginate:
 *   get:
 *     tags:
 *       - USER jobListPaginate
 *     description: jobListPaginate
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - name: search
 *         description: search
 *         in: query
 *         required: false
 *       - name: fromDate
 *         description: fromDate
 *         in: query
 *         required: false
 *       - name: toDate
 *         description: toDate
 *         in: query
 *         required: false
 *       - name: page
 *         description: page
 *         in: query
 *         required: false
 *       - name: limit
 *         description: limit
 *         in: query
 *         required: false
 *     responses:
 *       200:
 *         description: Returns success message
 */
const jobListPaginate = async (req, res, next) => {
  const validationSchema = {
    search: Joi.string().optional(),
    fromDate: Joi.string().optional(),
    toDate: Joi.string().optional(),
    page: Joi.string().optional(),
    limit: Joi.string().optional(),
  };
  try {
    const validatedBody = await Joi.validate(req.query, validationSchema);
    const { search, fromDate, toDate, page, limit } = validatedBody;
    let userResult = await findUser({
      _id: req.userId,
      status: { $ne: status.DELETE },
    });
    if (!userResult) {
      throw apiError.notFound(responseMessage.USER_NOT_FOUND);
    }
    validatedBody.userId = userResult._id;
    let dataResults = await paginateJobSearch(validatedBody);
    if (dataResults.docs.length == 0) {
      throw apiError.notFound(responseMessage.DATA_NOT_FOUND);
    }
    return res.json(new response(dataResults, responseMessage.DATA_FOUND));
  } catch (error) {
    return next(error);
  }
};
/**
 * @swagger
 * /user/jobView:
 *   get:
 *     tags:
 *       - USER jobView
 *     description: jobView
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - name: postId
 *         description: postId
 *         in: query
 *         required: true
 *     responses:
 *       200:
 *         description: Returns success message
 */
const jobView = async (req, res, next) => {
  const validationSchema = {
    jobId: Joi.string().optional(),
  };
  try {
    const validatedBody = await Joi.validate(req.query, validationSchema);
    const { jobId } = validatedBody;
    let userResult = await findUser({
      _id: req.userId,
      status: { $ne: status.DELETE },
    });
    if (!userResult) {
      throw apiError.notFound(responseMessage.USER_NOT_FOUND);
    }
    let dataResults = await findOneJob({
      _id: jobId,
      status: { $ne: status.DELETE },
    });
    let commentReportList = await findAllReport({
      userId: userResult._id,
      jobId: jobId,
    });
    // let [userCollection, collectionIdList] = await Promise.all([await userCollectionListAll({ userId: userResult._id, status: { $ne: status.DELETE } }), await collectionSubscriptionUserList({ userId: userResult._id, status: { $ne: status.DELETE } })]);
    if (!dataResults) {
      throw apiError.notFound(responseMessage.DATA_NOT_FOUND);
    }
    // for (let cObj of collectionIdList) {
    //     if (cObj['collectionId'].toString() == dataResults.collectionId) {
    //         dataResults['isSubscribed'] = true;
    //     }
    // }
    // for (let uObj of userCollection) {
    //     if (uObj['_id'].toString() == dataResults.collectionId) {
    //         dataResults['isSubscribed'] = true;
    //     }
    // }
    for (let commentObject of commentReportList) {
      dataResults["comment"] = dataResults["comment"].filter(
        (item) => !item["reportedId"].includes(commentObject._id)
      );
    }
    return res.json(new response(dataResults, responseMessage.DATA_FOUND));
  } catch (error) {
    return next(error);
  }
};
/**
 * @swagger
 * /user/allJobListPaginate:
 *   get:
 *     tags:
 *       - USER Products
 *     description: allJobListPaginate
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - name: search
 *         description: search
 *         in: query
 *         required: false
 *       - name: fromDate
 *         description: fromDate
 *         in: query
 *         required: false
 *       - name: toDate
 *         description: toDate
 *         in: query
 *         required: false
 *       - name: page
 *         description: page
 *         in: query
 *         required: false
 *       - name: limit
 *         description: limit
 *         in: query
 *         required: false
 *     responses:
 *       200:
 *         description: Returns success message
 */
const allJobListPaginate = async (req, res, next) => {
  const validationSchema = {
    search: Joi.string().optional(),
    fromDate: Joi.string().optional(),
    toDate: Joi.string().optional(),
    page: Joi.string().optional(),
    limit: Joi.string().optional(),
  };
  try {
    const paginateGood = (array, page_size, page_number) => {
      return array.slice(
        (page_number - 1) * page_size,
        page_number * page_size
      );
    };
    const validatedBody = await Joi.validate(req.query, validationSchema);
    const { search, fromDate, toDate, page, limit } = validatedBody;
    var userResult = await findUser({
      _id: req.userId,
      status: { $ne: status.DELETE },
    });
    if (!userResult) {
      throw apiError.notFound(responseMessage.USER_NOT_FOUND);
    }
    // let postPromotionResult = await postPromotionList({ status: status.ACTIVE })
    validatedBody["status"] = status.ACTIVE;
    // validatedBody['postType'] = { $in: ['PRIVATE', 'PUBLIC'] };
    validatedBody["isSold"] = false;
    validatedBody["isBuy"] = false;
    let newDoc = [];
    // let data = await paginateAllPostSearchPrivatePublicFind(validatedBody);
    let [data, postPromotionResult, userCollection, collectionIdList] =
      await Promise.all([
        paginateAllPostSearchPrivatePublicFind(validatedBody),
        // postPromotionList({ status: status.ACTIVE }),
        // userCollectionListAll({ userId: userResult._id, status: { $ne: status.DELETE } }),
        // collectionSubscriptionUserList({ userId: userResult._id, status: { $ne: status.DELETE } })
      ]);

    let postPromotionRes = [];
    for (let i = 0; i < postPromotionResult.length; i++) {
      if (!userResult.blockedUser.includes(postPromotionResult[i].userId._id)) {
        postPromotionRes.push(postPromotionResult[i]);
      }
    }

    let blockUserRes = [];
    for (let i = 0; i < data.length; i++) {
      if (!userResult.blockedUser.includes(data[i].userId._id)) {
        blockUserRes.push(data[i]);
      }
    }

    let dataResults = [];
    for (let i = 0; i < blockUserRes.length; i++) {
      if (!userResult.hidePost.includes(blockUserRes[i]._id)) {
        dataResults.push(blockUserRes[i]);
      }
    }
    for (let i in dataResults) {
      for (let cObj of collectionIdList) {
        if (
          cObj["collectionId"]["_id"].toString() == dataResults[i].collectionId
        ) {
          dataResults[i]["isSubscribed"] = true;
        }
      }
      for (let uObj of userCollection) {
        if (uObj["_id"].toString() == dataResults[i].collectionId) {
          dataResults[i]["isSubscribed"] = true;
        }
      }
      if (userResult["myWatchlist"].includes(dataResults[i]._id) == true) {
        dataResults[i]["isWatchList"] = true;
      }
      dataResults[i].reactOnPost = await dataResults[i].reactOnPost.find(
        (o) => {
          return o.userId.toString() == userResult._id.toString();
        }
      );
    }
    var finaldataRes = [];
    for (let obj of dataResults) {
      let findReportRes = await findAllReport({
        userId: userResult._id,
        postId: obj._id,
      });
      if (findReportRes.length == 0) {
        finaldataRes.push(obj);
      } else {
        for (let commentObject of findReportRes) {
          obj["comment"] = obj["comment"].filter(
            (item) => !item["reportedId"].includes(commentObject._id)
          );
        }
        if (!obj.reportedId.includes(findReportRes[0]._id)) {
          finaldataRes.push(obj);
        }
      }
    }
    let resultRes = [];
    let count = 0;
    var userDob = new Date(userResult.dob);
    var currentDate = new Date();
    var diffDays = currentDate.getYear() - userDob.getYear();
    var postPromotionfinalResult = [];
    for (let i = 0; i < postPromotionRes.length; i++) {
      for (let j = 0; j < userResult.interest.length; j++) {
        for (let x = 0; x < postPromotionRes[i].interest.length; x++) {
          if (
            postPromotionRes[i].interest[x] == userResult.interest[j] &&
            postPromotionRes[i].minAge <= diffDays &&
            postPromotionRes[i].maxAge >= diffDays &&
            userResult._id.toString() !=
              postPromotionRes[i].userId._id.toString()
          ) {
            postPromotionfinalResult.push(postPromotionRes[i]);
          } else if (
            userResult._id.toString() ==
            postPromotionRes[i].userId._id.toString()
          ) {
            postPromotionfinalResult.push(postPromotionRes[i]);
          }
        }
      }
    }
    if (finaldataRes.length == 0) {
      for (let i = 0; i < postPromotionfinalResult.length; i++) {
        resultRes.push(postPromotionfinalResult[i]);
      }
    }
    for (let i = 0; i < finaldataRes.length; i++) {
      count++;
      resultRes.push(finaldataRes[i]);
      if (
        count % 2 == 0 &&
        postPromotionfinalResult[count / 2 - 1] &&
        resultRes.includes(postPromotionfinalResult[count / 2 - 1]) == false
      ) {
        resultRes.push(postPromotionfinalResult[count / 2 - 1]);
      }
    }
    let options2 = {
      page: parseInt(req.query.page) || 1,
      limit: parseInt(req.query.limit) || 10,
    };
    let properResult = {
      docs: paginateGood(resultRes, options2.limit, options2.page),
      total: resultRes.length,
      limit: options2.limit,
      page: options2.page,
      pages: Math.ceil(resultRes.length / options2.limit),
    };
    if (properResult.docs.length == 0) {
      throw apiError.notFound(responseMessage.POST_NOT_FOUND);
    }
    return res.json(new response(properResult, responseMessage.DATA_FOUND));
  } catch (error) {
    console.log("Catch error ==>", error);
    return next(error);
  }
};

/**
 * @swagger
 * /admin/getAllJobList:
 *   get:
 *     tags:
 *       - ADMIN
 *     description: getAllJobList
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - name: postId
 *         description: postId
 *         in: query
 *         required: true
 *     responses:
 *       200:
 *         description: Returns success message
 */
const getAllJobList = async (req, res, next) => {
  try {
    let userResult = await findUser({
      _id: req.userId,
      status: { $ne: status.DELETE },
      userType: userType.USER,
    });
    if (!userResult) {
      throw apiError.notFound(responseMessage.USER_NOT_FOUND);
    }
    let data = await listJob({
      status: status.ACTIVE,
    });
    if (!data) {
      throw apiError.notFound(responseMessage.DATA_NOT_FOUND);
    } else {
      return res.json(new response(data, responseMessage.DATA_FOUND));
    }
  } catch (error) {
    return next(error);
  }
};
/**
 * @swagger
 * /admin/getAllJobsByUserId:
 *   get:
 *     tags:
 *       - ADMIN
 *     description: getAllJobsByUserId
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - name: postId
 *         description: postId
 *         in: query
 *         required: true
 *     responses:
 *       200:
 *         description: Returns success message
 */
const getAllJobsByUserId = async (req, res, next) => {
  try {
    let userResult = await findUser({
      _id: req.userId,
      status: { $ne: status.DELETE },
      userType: userType.USER,
    });
    if (!userResult) {
      throw apiError.notFound(responseMessage.USER_NOT_FOUND);
    }
    let data = await listJob({
      userId: req.userId,
      status: status.ACTIVE,
    });
    if (!data) {
      throw apiError.notFound(responseMessage.DATA_NOT_FOUND);
    } else {
      return res.json(new response(data, responseMessage.DATA_FOUND));
    }
  } catch (error) {
    return next(error);
  }
};
/**
 * @swagger
 * /admin/getSellerJobList:
 *   get:
 *     tags:
 *       - ADMIN
 *     description: getSellerJobList
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - name: postId
 *         description: postId
 *         in: query
 *         required: true
 *     responses:
 *       200:
 *         description: Returns success message
 */
const getSellerJobList = async (req, res, next) => {
  try {
    let userResult = await findUser({
      _id: req.userId,
      status: { $ne: status.DELETE },
      userType: userType.USER,
    });
    if (!userResult) {
      throw apiError.notFound(responseMessage.USER_NOT_FOUND);
    }
    let data = await listJob({
      status: status.ACTIVE,
      type: "SELLER",
    });
    if (!data) {
      throw apiError.notFound(responseMessage.DATA_NOT_FOUND);
    } else {
      return res.json(new response(data, responseMessage.DATA_FOUND));
    }
  } catch (error) {
    return next(error);
  }
};
/**
 * @swagger
 * /admin/getBuyerJobList:
 *   get:
 *     tags:
 *       - ADMIN
 *     description: getBuyerJobList
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - name: postId
 *         description: postId
 *         in: query
 *         required: true
 *     responses:
 *       200:
 *         description: Returns success message
 */
const getBuyerJobList = async (req, res, next) => {
  try {
    let userResult = await findUser({
      _id: req.userId,
      status: { $ne: status.DELETE },
      userType: userType.USER,
    });
    if (!userResult) {
      throw apiError.notFound(responseMessage.USER_NOT_FOUND);
    }
    let data = await listJob({
      status: status.ACTIVE,
      type: "BUYER",
    });
    if (!data) {
      throw apiError.notFound(responseMessage.DATA_NOT_FOUND);
    } else {
      return res.json(new response(data, responseMessage.DATA_FOUND));
    }
  } catch (error) {
    return next(error);
  }
};

/////////Project////////////

/**
 * @swagger
 * /user/createProject:
 *   post:
 *     tags:
 *       - USER PRODUCT
 *     description: createProject
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - name: createProject
 *         description: createProject
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/createProject'
 *     responses:
 *       200:
 *         description: Returns success message
 */
const createProject = async (req, res, next) => {
  try {
    const validationSchema = {
      projectName: Joi.string().required(),
      companyName: Joi.string().required(),
      details: Joi.string().required(),
      mediaUrl: Joi.string().required(),
      mail: Joi.string().required(),
      mobileNumber: Joi.string().required(),
      mediaType: Joi.string().required(),
      budget: Joi.string().required(),
    };
    const validatedBody = await Joi.validate(req.body, validationSchema);
    var userResult = await findUser({
      _id: req.userId,
      status: { $ne: status.DELETE },
    });
    if (!userResult) {
      throw apiError.notFound(responseMessage.USER_NOT_FOUND);
    } else {
      // let result = await findCollection({ _id: validatedBody.collectionId, userId: userResult._id, status: { $ne: status.DELETE } })
      // if (!result) {
      //     throw apiError.notFound(responseMessage.COLLECTION_NOT_FOUND)
      // } else {
      if (validatedBody.mediaUrl) {
        validatedBody.mediaUrl = await commonFunction.getSecureUrl(
          validatedBody.mediaUrl
        );
      }
      validatedBody.type = "PROJECT";
      validatedBody.userId = userResult._id;
      var saveProject = await createUserProject(validatedBody);
      await updateUserById({ _id: userResult._id }, { isProject: true });
      await createActivity({
        userId: userResult._id,
        postId: saveProject._id,
        // collectionId: result._id,
        title: "Project create",
        desctiption: "Project create successfully.",
        type: "PROJECT",
      });

      let obj = {
        message: "Please approve my Project",
        userId: userResult._id,
        projectId: saveProject._id,
        type: "CREATE",
      };
      let saveRequest = await createProjectRequest(obj);
      // if (validatedBody.hashTagName.length != 0) {
      //   for (let i = 0; i < validatedBody.hashTagName.length; i++) {
      //     let hashTagRes = await findHashTag({
      //       hashTagName: validatedBody.hashTagName[i],
      //       status: { $ne: status.DELETE },
      //     });
      //     if (!hashTagRes) {
      //       let obj = {
      //         hashTagName: validatedBody.hashTagName[i],
      //         postCount: 1,
      //         userCount: 1,
      //         postDetails: [
      //           {
      //             postId: savePost._id,
      //           },
      //         ],
      //       };
      //       let saveRes = await createHashTag(obj);
      //       var updateRes = await updatePost(
      //         { _id: savePost._id },
      //         {
      //           $addToSet: { hashTagId: saveRes._id },
      //           $inc: { hashTagCount: 1 },
      //         }
      //       );
      //     } else {
      //       var updateRes = await updatePost(
      //         { _id: savePost._id },
      //         {
      //           $addToSet: { hashTagId: hashTagRes._id },
      //           $inc: { hashTagCount: 1 },
      //         }
      //       );
      //       await updateHashTag(
      //         { _id: hashTagRes._id },
      //         {
      //           $push: { postDetails: { $each: [{ postId: savePost._id }] } },
      //           $inc: { postCount: 1, userCount: 1 },
      //         }
      //       );
      //     }
      //   }
      //   return res.json(new response(updateRes, responseMessage.POST_CREATE));
      // }
      return res.json(
        new response(
          { saveProject, saveRequest },
          responseMessage.PROJECT_CREATE
        )
      );
      // }
    }
  } catch (error) {
    console.log("====================>", error);
    return next(error);
  }
};

/**
 * @swagger
 * /user/updateUserProject:
 *   put:
 *     tags:
 *       - USER POSTS
 *     description: updateUserProject
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - name: updateUserProject
 *         description: updateUserProject
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/updateUserProject'
 *     responses:
 *       200:
 *         description: Returns success message
 */
const updateUserProject = async (req, res, next) => {
  try {
    const validationSchema = {
      projectId: Joi.string().required(),
      // collectionId: Joi.string().allow('').optional(),
      projectName: Joi.string().allow("").optional(),
      mediaUrl: Joi.string().allow("").optional(),
      companyName: Joi.string().allow("").optional(),
      // postType: Joi.string().allow('').optional(),
      details: Joi.string().allow("").optional(),
      mail: Joi.string().allow("").optional(),
      mobileNumber: Joi.string().allow("").optional(),
      // hashTagName: Joi.array().allow("").optional(),
      // tag: Joi.array().allow("").optional(),
      mediaType: Joi.string().allow("").optional(),
      budget: Joi.string().allow("").optional(),
    };
    const validatedBody = await Joi.validate(req.body, validationSchema);
    var userResult = await findUser({
      _id: req.userId,
      status: { $ne: status.DELETE },
    });
    if (!userResult) {
      throw apiError.notFound(responseMessage.USER_NOT_FOUND);
    } else {
      let projectRes = await findOneProject({
        _id: validatedBody.projectId,
        userId: userResult._id,
        status: { $ne: status.DELETE },
      });
      if (!projectRes) {
        throw apiError.notFound(responseMessage.PROJECT_NOT_FOUND);
      }
      // let result = await findCollection({ _id: validatedBody.collectionId, userId: userResult._id, status: { $ne: status.DELETE } })
      // if (!result) {
      //     throw apiError.notFound(responseMessage.COLLECTION_NOT_FOUND)
      // } else {
      if (validatedBody.mediaUrl) {
        validatedBody.mediaUrl = await commonFunction.getSecureUrl(
          validatedBody.mediaUrl
        );
      }
      validatedBody.type = "PROJECT";
      validatedBody.userId = userResult._id;
      var saveProject = await updateProject(
        { _id: projectRes._id },
        validatedBody
      );
      await updateUserById({ _id: userResult._id }, { isProject: true });
      await createActivity({
        userId: userResult._id,
        productId: saveProject._id,
        // collectionId: result._id,
        title: "Project update",
        desctiption: "Project update successfully.",
        type: "PROJECT",
      });
      // if (validatedBody.hashTagName.length != 0) {
      //     for (let i = 0; i < validatedBody.hashTagName.length; i++) {
      //         let hashTagRes = await findHashTag({ hashTagName: validatedBody.hashTagName[i], status: { $ne: status.DELETE } })
      //         if (!hashTagRes) {
      //             let obj = {
      //                 hashTagName: validatedBody.hashTagName[i],
      //                 postCount: 1,
      //                 userCount: 1,
      //                 postDetails: [{
      //                     postId: savePost._id,
      //                 }]
      //             }
      //             let saveRes = await createHashTag(obj)
      //             var updateRes = await updatePost({ _id: savePost._id }, { $addToSet: { hashTagId: saveRes._id }, $inc: { hashTagCount: 1 } })
      //         } else {
      //             var updateRes = await updatePost({ _id: savePost._id }, { $addToSet: { hashTagId: hashTagRes._id }, $inc: { hashTagCount: 1 } })
      //             await updateHashTag({ _id: hashTagRes._id }, { $push: { postDetails: { $each: [{ postId: savePost._id }] } }, $inc: { postCount: 1, userCount: 1 } });
      //         }
      //     }
      //     return res.json(new response(updateRes, responseMessage.POST_CREATE));
      // }
      return res.json(
        new response(saveProject, responseMessage.PROJECT_UPDATED)
      );
      // }
    }
  } catch (error) {
    console.log("====================>", error);
    return next(error);
  }
};
/**
 * @swagger
 * /user/deleteUserProject:
 *   put:
 *     tags:
 *       - USER POSTS
 *     description: deleteUserProject
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - name: deleteUserProject
 *         description: deleteUserProject
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/deleteUserProject'
 *     responses:
 *       200:
 *         description: Returns success message
 */
const deleteUserProject = async (req, res, next) => {
  try {
    const validationSchema = {
      projectId: Joi.string().required(),
    };
    const validatedBody = await Joi.validate(req.body, validationSchema);
    var userResult = await findUser({
      _id: req.userId,
      status: { $ne: status.DELETE },
    });
    if (!userResult) {
      throw apiError.notFound(responseMessage.USER_NOT_FOUND);
    } else {
      let projectRes = await findOneProject({
        _id: validatedBody.projectId,
        userId: userResult._id,
        status: { $ne: status.DELETE },
      });
      if (!projectRes) {
        throw apiError.notFound(responseMessage.PRODUCT_NOT_FOUND);
      }
      validatedBody.creatorId = userResult._id;
      validatedBody.status = status.DELETE;
      var saveProject = await updateProject(
        { _id: projectRes._id },
        validatedBody
      );
      await updateUserById({ _id: userResult._id }, { isProject: true });
      await createActivity({
        userId: userResult._id,
        postId: saveProject._id,
        // collectionId: result._id,
        title: "Project Delete",
        desctiption: "Project Deleted successfully.",
        type: "JOB",
      });
      return res.json(
        new response(saveProject, responseMessage.PROJECT_DELETE)
      );
      // }
    }
  } catch (error) {
    console.log("====================>", error);
    return next(error);
  }
};

/**
 * @swagger
 * /user/projectListPaginate:
 *   get:
 *     tags:
 *       - USER projectListPaginate
 *     description: projectListPaginate
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - name: search
 *         description: search
 *         in: query
 *         required: false
 *       - name: fromDate
 *         description: fromDate
 *         in: query
 *         required: false
 *       - name: toDate
 *         description: toDate
 *         in: query
 *         required: false
 *       - name: page
 *         description: page
 *         in: query
 *         required: false
 *       - name: limit
 *         description: limit
 *         in: query
 *         required: false
 *     responses:
 *       200:
 *         description: Returns success message
 */
const projectListPaginate = async (req, res, next) => {
  const validationSchema = {
    search: Joi.string().optional(),
    fromDate: Joi.string().optional(),
    toDate: Joi.string().optional(),
    page: Joi.string().optional(),
    limit: Joi.string().optional(),
  };
  try {
    const validatedBody = await Joi.validate(req.query, validationSchema);
    const { search, fromDate, toDate, page, limit } = validatedBody;
    let userResult = await findUser({
      _id: req.userId,
      status: { $ne: status.DELETE },
    });
    if (!userResult) {
      throw apiError.notFound(responseMessage.USER_NOT_FOUND);
    }
    validatedBody.userId = userResult._id;
    let dataResults = await paginateProjectSearch(validatedBody);
    if (dataResults.docs.length == 0) {
      throw apiError.notFound(responseMessage.DATA_NOT_FOUND);
    }
    return res.json(new response(dataResults, responseMessage.DATA_FOUND));
  } catch (error) {
    return next(error);
  }
};
/**
 * @swagger
 * /user/projectView:
 *   get:
 *     tags:
 *       - USER projectView
 *     description: projectView
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - name: postId
 *         description: projectId
 *         in: query
 *         required: true
 *     responses:
 *       200:
 *         description: Returns success message
 */
const projectView = async (req, res, next) => {
  const validationSchema = {
    projectId: Joi.string().optional(),
  };
  try {
    const validatedBody = await Joi.validate(req.query, validationSchema);
    const { projectId } = validatedBody;
    let userResult = await findUser({
      _id: req.userId,
      status: { $ne: status.DELETE },
    });
    if (!userResult) {
      throw apiError.notFound(responseMessage.USER_NOT_FOUND);
    }
    let dataResults = await findOneProject({
      _id: projectId,
      status: { $ne: status.DELETE },
    });
    let commentReportList = await findAllReport({
      userId: userResult._id,
      projectId: projectId,
    });
    // let [userCollection, collectionIdList] = await Promise.all([await userCollectionListAll({ userId: userResult._id, status: { $ne: status.DELETE } }), await collectionSubscriptionUserList({ userId: userResult._id, status: { $ne: status.DELETE } })]);
    if (!dataResults) {
      throw apiError.notFound(responseMessage.DATA_NOT_FOUND);
    }
    // for (let cObj of collectionIdList) {
    //     if (cObj['collectionId'].toString() == dataResults.collectionId) {
    //         dataResults['isSubscribed'] = true;
    //     }
    // }
    // for (let uObj of userCollection) {
    //     if (uObj['_id'].toString() == dataResults.collectionId) {
    //         dataResults['isSubscribed'] = true;
    //     }
    // }
    for (let commentObject of commentReportList) {
      dataResults["comment"] = dataResults["comment"].filter(
        (item) => !item["reportedId"].includes(commentObject._id)
      );
    }
    return res.json(new response(dataResults, responseMessage.DATA_FOUND));
  } catch (error) {
    return next(error);
  }
};
/**
 * @swagger
 * /user/allProjectListPaginate:
 *   get:
 *     tags:
 *       - USER Products
 *     description: allProjectListPaginate
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - name: search
 *         description: search
 *         in: query
 *         required: false
 *       - name: fromDate
 *         description: fromDate
 *         in: query
 *         required: false
 *       - name: toDate
 *         description: toDate
 *         in: query
 *         required: false
 *       - name: page
 *         description: page
 *         in: query
 *         required: false
 *       - name: limit
 *         description: limit
 *         in: query
 *         required: false
 *     responses:
 *       200:
 *         description: Returns success message
 */
const allProjectListPaginate = async (req, res, next) => {
  const validationSchema = {
    search: Joi.string().optional(),
    fromDate: Joi.string().optional(),
    toDate: Joi.string().optional(),
    page: Joi.string().optional(),
    limit: Joi.string().optional(),
  };
  try {
    const paginateGood = (array, page_size, page_number) => {
      return array.slice(
        (page_number - 1) * page_size,
        page_number * page_size
      );
    };
    const validatedBody = await Joi.validate(req.query, validationSchema);
    const { search, fromDate, toDate, page, limit } = validatedBody;
    var userResult = await findUser({
      _id: req.userId,
      status: { $ne: status.DELETE },
    });
    if (!userResult) {
      throw apiError.notFound(responseMessage.USER_NOT_FOUND);
    }
    // let postPromotionResult = await postPromotionList({ status: status.ACTIVE })
    validatedBody["status"] = status.ACTIVE;
    // validatedBody['postType'] = { $in: ['PRIVATE', 'PUBLIC'] };
    validatedBody["isSold"] = false;
    validatedBody["isBuy"] = false;
    let newDoc = [];
    // let data = await paginateAllPostSearchPrivatePublicFind(validatedBody);
    let [data, postPromotionResult, userCollection, collectionIdList] =
      await Promise.all([
        paginateAllPostSearchPrivatePublicFind(validatedBody),
        // postPromotionList({ status: status.ACTIVE }),
        // userCollectionListAll({ userId: userResult._id, status: { $ne: status.DELETE } }),
        // collectionSubscriptionUserList({ userId: userResult._id, status: { $ne: status.DELETE } })
      ]);

    let postPromotionRes = [];
    for (let i = 0; i < postPromotionResult.length; i++) {
      if (!userResult.blockedUser.includes(postPromotionResult[i].userId._id)) {
        postPromotionRes.push(postPromotionResult[i]);
      }
    }

    let blockUserRes = [];
    for (let i = 0; i < data.length; i++) {
      if (!userResult.blockedUser.includes(data[i].userId._id)) {
        blockUserRes.push(data[i]);
      }
    }

    let dataResults = [];
    for (let i = 0; i < blockUserRes.length; i++) {
      if (!userResult.hidePost.includes(blockUserRes[i]._id)) {
        dataResults.push(blockUserRes[i]);
      }
    }
    for (let i in dataResults) {
      for (let cObj of collectionIdList) {
        if (
          cObj["collectionId"]["_id"].toString() == dataResults[i].collectionId
        ) {
          dataResults[i]["isSubscribed"] = true;
        }
      }
      for (let uObj of userCollection) {
        if (uObj["_id"].toString() == dataResults[i].collectionId) {
          dataResults[i]["isSubscribed"] = true;
        }
      }
      if (userResult["myWatchlist"].includes(dataResults[i]._id) == true) {
        dataResults[i]["isWatchList"] = true;
      }
      dataResults[i].reactOnPost = await dataResults[i].reactOnPost.find(
        (o) => {
          return o.userId.toString() == userResult._id.toString();
        }
      );
    }
    var finaldataRes = [];
    for (let obj of dataResults) {
      let findReportRes = await findAllReport({
        userId: userResult._id,
        postId: obj._id,
      });
      if (findReportRes.length == 0) {
        finaldataRes.push(obj);
      } else {
        for (let commentObject of findReportRes) {
          obj["comment"] = obj["comment"].filter(
            (item) => !item["reportedId"].includes(commentObject._id)
          );
        }
        if (!obj.reportedId.includes(findReportRes[0]._id)) {
          finaldataRes.push(obj);
        }
      }
    }
    let resultRes = [];
    let count = 0;
    var userDob = new Date(userResult.dob);
    var currentDate = new Date();
    var diffDays = currentDate.getYear() - userDob.getYear();
    var postPromotionfinalResult = [];
    for (let i = 0; i < postPromotionRes.length; i++) {
      for (let j = 0; j < userResult.interest.length; j++) {
        for (let x = 0; x < postPromotionRes[i].interest.length; x++) {
          if (
            postPromotionRes[i].interest[x] == userResult.interest[j] &&
            postPromotionRes[i].minAge <= diffDays &&
            postPromotionRes[i].maxAge >= diffDays &&
            userResult._id.toString() !=
              postPromotionRes[i].userId._id.toString()
          ) {
            postPromotionfinalResult.push(postPromotionRes[i]);
          } else if (
            userResult._id.toString() ==
            postPromotionRes[i].userId._id.toString()
          ) {
            postPromotionfinalResult.push(postPromotionRes[i]);
          }
        }
      }
    }
    if (finaldataRes.length == 0) {
      for (let i = 0; i < postPromotionfinalResult.length; i++) {
        resultRes.push(postPromotionfinalResult[i]);
      }
    }
    for (let i = 0; i < finaldataRes.length; i++) {
      count++;
      resultRes.push(finaldataRes[i]);
      if (
        count % 2 == 0 &&
        postPromotionfinalResult[count / 2 - 1] &&
        resultRes.includes(postPromotionfinalResult[count / 2 - 1]) == false
      ) {
        resultRes.push(postPromotionfinalResult[count / 2 - 1]);
      }
    }
    let options2 = {
      page: parseInt(req.query.page) || 1,
      limit: parseInt(req.query.limit) || 10,
    };
    let properResult = {
      docs: paginateGood(resultRes, options2.limit, options2.page),
      total: resultRes.length,
      limit: options2.limit,
      page: options2.page,
      pages: Math.ceil(resultRes.length / options2.limit),
    };
    if (properResult.docs.length == 0) {
      throw apiError.notFound(responseMessage.POST_NOT_FOUND);
    }
    return res.json(new response(properResult, responseMessage.DATA_FOUND));
  } catch (error) {
    console.log("Catch error ==>", error);
    return next(error);
  }
};

/**
 * @swagger
 * /admin/getAllProjectList:
 *   get:
 *     tags:
 *       - ADMIN
 *     description: getAllProjectList
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - name: postId
 *         description: postId
 *         in: query
 *         required: true
 *     responses:
 *       200:
 *         description: Returns success message
 */
const getAllProjectList = async (req, res, next) => {
  try {
    let userResult = await findUser({
      _id: req.userId,
      status: { $ne: status.DELETE },
      userType: userType.USER,
    });
    if (!userResult) {
      throw apiError.notFound(responseMessage.USER_NOT_FOUND);
    }
    let data = await listProject({
      status: status.ACTIVE,
      type : { $ne: 'GOVT' },
    });
    if (!data) {
      throw apiError.notFound(responseMessage.DATA_NOT_FOUND);
    } else {
      return res.json(new response(data, responseMessage.DATA_FOUND));
    }
  } catch (error) {
    return next(error);
  }
};
/**
 * @swagger
 * /admin/getAllProjectsByUserId:
 *   get:
 *     tags:
 *       - ADMIN
 *     description: getAllProjectsByUserId
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - name: postId
 *         description: postId
 *         in: query
 *         required: true
 *     responses:
 *       200:
 *         description: Returns success message
 */
const getAllProjectsByUserId = async (req, res, next) => {
  try {
    let userResult = await findUser({
      _id: req.userId,
      status: { $ne: status.DELETE },
      userType: userType.USER,
    });
    if (!userResult) {
      throw apiError.notFound(responseMessage.USER_NOT_FOUND);
    }
    let data = await listProject({
      userId: req.userId,
      status: status.ACTIVE,
      type : { $ne: 'GOVT' },
    });
    if (!data) {
      throw apiError.notFound(responseMessage.DATA_NOT_FOUND);
    } else {
      return res.json(new response(data, responseMessage.DATA_FOUND));
    }
  } catch (error) {
    return next(error);
  }
};


/**
   * @swagger
   * /admin/getAllGovtProjectList:
   *   get:
   *     tags:
   *       - ADMIN
   *     description: getAllGovtProjectList
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: token
   *         description: token
   *         in: header
   *         required: true
   *       - name: postId
   *         description: postId
   *         in: query
   *         required: true
   *     responses:
   *       200:
   *         description: Returns success message
   */
const  getAllGovtProjectList = async(req, res, next)=> {
  try {
    let userResult = await findUser({
      _id: req.userId,
      status: { $ne: status.DELETE },
      userType: userType.USER,
    });
    if (!userResult) {
      throw apiError.notFound(responseMessage.USER_NOT_FOUND);
    }
    let data = await listProject({
      status: status.ACTIVE,
      type: "GOVT",
    });
    if (!data) {
      throw apiError.notFound(responseMessage.DATA_NOT_FOUND);
    } else {
      return res.json(new response(data, responseMessage.DATA_FOUND));
    }
  } catch (error) {
    return next(error);
  }
}

/////////Services////////////

/**
 * @swagger
 * /user/createService:
 *   post:
 *     tags:
 *       - USER SERVICE
 *     description: createService
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - name: createPost
 *         description: createService
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/createService'
 *     responses:
 *       200:
 *         description: Returns success message
 */
const createService = async (req, res, next) => {
  try {
    const validationSchema = {
      // collectionId: Joi.string().required(),
      serviceName: Joi.string().optional(),
      mediaUrl: Joi.string().optional(),
      details: Joi.string().optional(),
      // postType: Joi.string().required(),
      rate: Joi.string().required(),
      mediaType: Joi.string().optional(),
      categorie: Joi.string().optional(),
      type: Joi.string().optional(),
      // subCategorie: Joi.string().optional(),
    };
    const validatedBody = await Joi.validate(req.body, validationSchema);
    var userResult = await findUser({
      _id: req.userId,
      status: { $ne: status.DELETE },
    });
    if (!userResult) {
      throw apiError.notFound(responseMessage.USER_NOT_FOUND);
    } else {
      // let result = await findCollection({ _id: validatedBody.collectionId, userId: userResult._id, status: { $ne: status.DELETE } })
      // if (!result) {
      //     throw apiError.notFound(responseMessage.COLLECTION_NOT_FOUND)
      // } else {
      if (validatedBody.mediaUrl) {
        validatedBody.mediaUrl = await commonFunction.getSecureUrl(
          validatedBody.mediaUrl
        );
      }
      validatedBody.userId = userResult._id;
      validatedBody.creatorId = userResult._id;
      var saveService = await createUserService(validatedBody);
      await updateUserById({ _id: userResult._id }, { isProduct: true });
      await createActivity({
        userId: userResult._id,
        postId: saveService._id,
        // collectionId: result._id,
        title: "Service create",
        desctiption: "Service create successfully.",
        type: "SERVICE",
      });

      let obj = {
        message: "Please approve my Service",
        userId: userResult._id,
        serviceId: saveService._id,
        type: "CREATE",
      };
      let saveRequest = await createServiceRequest(obj);
      // if (validatedBody.hashTagName.length != 0) {
      //   for (let i = 0; i < validatedBody.hashTagName.length; i++) {
      //     let hashTagRes = await findHashTag({
      //       hashTagName: validatedBody.hashTagName[i],
      //       status: { $ne: status.DELETE },
      //     });
      //     if (!hashTagRes) {
      //       let obj = {
      //         hashTagName: validatedBody.hashTagName[i],
      //         postCount: 1,
      //         userCount: 1,
      //         postDetails: [
      //           {
      //             postId: savePost._id,
      //           },
      //         ],
      //       };
      //       let saveRes = await createHashTag(obj);
      //       var updateRes = await updatePost(
      //         { _id: savePost._id },
      //         {
      //           $addToSet: { hashTagId: saveRes._id },
      //           $inc: { hashTagCount: 1 },
      //         }
      //       );
      //     } else {
      //       var updateRes = await updatePost(
      //         { _id: savePost._id },
      //         {
      //           $addToSet: { hashTagId: hashTagRes._id },
      //           $inc: { hashTagCount: 1 },
      //         }
      //       );
      //       await updateHashTag(
      //         { _id: hashTagRes._id },
      //         {
      //           $push: { postDetails: { $each: [{ postId: savePost._id }] } },
      //           $inc: { postCount: 1, userCount: 1 },
      //         }
      //       );
      //     }
      //   }
      //   return res.json(new response(updateRes, responseMessage.POST_CREATE));
      // }
      return res.json(
        new response(
          { saveService, saveRequest },
          responseMessage.SERVICE_CREATE
        )
      );
      // }
    }
  } catch (error) {
    console.log("====================>", error);
    return next(error);
  }
};

/**
 * @swagger
 * /user/updateService:
 *   put:
 *     tags:
 *       - USER POSTS
 *     description: updateUserService
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - name: updateUserService
 *         description: updateUserService
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/updateUserService'
 *     responses:
 *       200:
 *         description: Returns success message
 */
const updateUserService = async (req, res, next) => {
  try {
    const validationSchema = {
      serviceId: Joi.string().required(),
      // collectionId: Joi.string().allow('').optional(),
      serviceName: Joi.string().allow("").optional(),
      mediaUrl: Joi.string().allow("").optional(),
      details: Joi.string().allow("").optional(),
      // postType: Joi.string().allow('').optional(),
      rate: Joi.string().allow("").optional(),
      // royality: Joi.string().allow('').optional(),
      // hashTagName: Joi.array().allow("").optional(),
      // tag: Joi.array().allow("").optional(),
      mediaType: Joi.string().allow("").optional(),
      categorie: Joi.string().allow("").optional(),
      // subCategorie: Joi.string().allow("").optional(),
    };
    const validatedBody = await Joi.validate(req.body, validationSchema);
    var userResult = await findUser({
      _id: req.userId,
      status: { $ne: status.DELETE },
    });
    if (!userResult) {
      throw apiError.notFound(responseMessage.USER_NOT_FOUND);
    } else {
      let serviceRes = await findOneService({
        _id: validatedBody.serviceId,
        userId: userResult._id,
        status: { $ne: status.DELETE },
      });
      if (!serviceRes) {
        throw apiError.notFound(responseMessage.SERVICE_NOT_FOUND);
      }
      // let result = await findCollection({ _id: validatedBody.collectionId, userId: userResult._id, status: { $ne: status.DELETE } })
      // if (!result) {
      //     throw apiError.notFound(responseMessage.COLLECTION_NOT_FOUND)
      // } else {
      if (validatedBody.mediaUrl) {
        validatedBody.mediaUrl = await commonFunction.getSecureUrl(
          validatedBody.mediaUrl
        );
      }
      validatedBody.userId = userResult._id;
      validatedBody.creatorId = userResult._id;
      var saveService = await updateService(
        { _id: serviceRes._id },
        validatedBody
      );
      await updateUserById({ _id: userResult._id }, { isService: true });
      await createActivity({
        userId: userResult._id,
        productId: saveService._id,
        // collectionId: result._id,
        title: "Service update",
        desctiption: "Service update successfully.",
        type: "SERVICE",
      });
      // if (validatedBody.hashTagName.length != 0) {
      //     for (let i = 0; i < validatedBody.hashTagName.length; i++) {
      //         let hashTagRes = await findHashTag({ hashTagName: validatedBody.hashTagName[i], status: { $ne: status.DELETE } })
      //         if (!hashTagRes) {
      //             let obj = {
      //                 hashTagName: validatedBody.hashTagName[i],
      //                 postCount: 1,
      //                 userCount: 1,
      //                 postDetails: [{
      //                     postId: savePost._id,
      //                 }]
      //             }
      //             let saveRes = await createHashTag(obj)
      //             var updateRes = await updatePost({ _id: savePost._id }, { $addToSet: { hashTagId: saveRes._id }, $inc: { hashTagCount: 1 } })
      //         } else {
      //             var updateRes = await updatePost({ _id: savePost._id }, { $addToSet: { hashTagId: hashTagRes._id }, $inc: { hashTagCount: 1 } })
      //             await updateHashTag({ _id: hashTagRes._id }, { $push: { postDetails: { $each: [{ postId: savePost._id }] } }, $inc: { postCount: 1, userCount: 1 } });
      //         }
      //     }
      //     return res.json(new response(updateRes, responseMessage.POST_CREATE));
      // }
      return res.json(
        new response(saveService, responseMessage.SERVICE_UPDATED)
      );
      // }
    }
  } catch (error) {
    console.log("====================>", error);
    return next(error);
  }
};
/**
 * @swagger
 * /user/deleteUserService:
 *   put:
 *     tags:
 *       - USER Service
 *     description: updateService
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - name: updatePost
 *         description: updateService
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/updateService'
 *     responses:
 *       200:
 *         description: Returns success message
 */
const deleteUserService = async (req, res, next) => {
  try {
    const validationSchema = {
      serviceId: Joi.string().required(),
    };
    const validatedBody = await Joi.validate(req.body, validationSchema);
    var userResult = await findUser({
      _id: req.userId,
      status: { $ne: status.DELETE },
    });
    if (!userResult) {
      throw apiError.notFound(responseMessage.USER_NOT_FOUND);
    } else {
      let serviceRes = await findOneService({
        _id: validatedBody.serviceId,
        userId: userResult._id,
        status: { $ne: status.DELETE },
      });
      if (!serviceRes) {
        throw apiError.notFound(responseMessage.SERVICE_NOT_FOUND);
      }
      validatedBody.creatorId = userResult._id;
      validatedBody.status = status.DELETE;
      var saveService = await updateService(
        { _id: serviceRes._id },
        validatedBody
      );
      await updateUserById({ _id: userResult._id }, { isService: true });
      await createActivity({
        userId: userResult._id,
        postId: saveService._id,
        // collectionId: result._id,
        title: "Service Delete",
        desctiption: "Service Deleted successfully.",
        type: "SERVICE",
      });
      return res.json(
        new response(saveService, responseMessage.SERVICE_DELETE)
      );
      // }
    }
  } catch (error) {
    console.log("====================>", error);
    return next(error);
  }
};

/**
 * @swagger
 * /user/serviceListPaginate:
 *   get:
 *     tags:
 *       - USER serviceListPaginate
 *     description: serviceListPaginate
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - name: search
 *         description: search
 *         in: query
 *         required: false
 *       - name: fromDate
 *         description: fromDate
 *         in: query
 *         required: false
 *       - name: toDate
 *         description: toDate
 *         in: query
 *         required: false
 *       - name: page
 *         description: page
 *         in: query
 *         required: false
 *       - name: limit
 *         description: limit
 *         in: query
 *         required: false
 *     responses:
 *       200:
 *         description: Returns success message
 */
const serviceListPaginate = async (req, res, next) => {
  const validationSchema = {
    search: Joi.string().optional(),
    fromDate: Joi.string().optional(),
    toDate: Joi.string().optional(),
    page: Joi.string().optional(),
    limit: Joi.string().optional(),
  };
  try {
    const validatedBody = await Joi.validate(req.query, validationSchema);
    const { search, fromDate, toDate, page, limit } = validatedBody;
    let userResult = await findUser({
      _id: req.userId,
      status: { $ne: status.DELETE },
    });
    if (!userResult) {
      throw apiError.notFound(responseMessage.USER_NOT_FOUND);
    }
    validatedBody.userId = userResult._id;
    let dataResults = await paginateServiceSearch(validatedBody);
    if (dataResults.docs.length == 0) {
      throw apiError.notFound(responseMessage.DATA_NOT_FOUND);
    }
    return res.json(new response(dataResults, responseMessage.DATA_FOUND));
  } catch (error) {
    return next(error);
  }
};
/**
 * @swagger
 * /user/ServiceView:
 *   get:
 *     tags:
 *       - USER ServiceView
 *     description: ServiceView
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - name: postId
 *         description: postId
 *         in: query
 *         required: true
 *     responses:
 *       200:
 *         description: Returns success message
 */
const serviceView = async (req, res, next) => {
  const validationSchema = {
    serviceId: Joi.string().optional(),
  };
  try {
    const validatedBody = await Joi.validate(req.query, validationSchema);
    const { serviceId } = validatedBody;
    let userResult = await findUser({
      _id: req.userId,
      status: { $ne: status.DELETE },
    });
    if (!userResult) {
      throw apiError.notFound(responseMessage.USER_NOT_FOUND);
    }
    let dataResults = await findOneService({
      _id: serviceId,
      status: { $ne: status.DELETE },
    });
    let commentReportList = await findAllReport({
      userId: userResult._id,
      serviceId: serviceId,
    });
    // let [userCollection, collectionIdList] = await Promise.all([await userCollectionListAll({ userId: userResult._id, status: { $ne: status.DELETE } }), await collectionSubscriptionUserList({ userId: userResult._id, status: { $ne: status.DELETE } })]);
    if (!dataResults) {
      throw apiError.notFound(responseMessage.DATA_NOT_FOUND);
    }
    // for (let cObj of collectionIdList) {
    //     if (cObj['collectionId'].toString() == dataResults.collectionId) {
    //         dataResults['isSubscribed'] = true;
    //     }
    // }
    // for (let uObj of userCollection) {
    //     if (uObj['_id'].toString() == dataResults.collectionId) {
    //         dataResults['isSubscribed'] = true;
    //     }
    // }
    for (let commentObject of commentReportList) {
      dataResults["comment"] = dataResults["comment"].filter(
        (item) => !item["reportedId"].includes(commentObject._id)
      );
    }
    return res.json(new response(dataResults, responseMessage.DATA_FOUND));
  } catch (error) {
    return next(error);
  }
};
/**
 * @swagger
 * /user/allServiceListPaginate:
 *   get:
 *     tags:
 *       - USER Services
 *     description: allServiceListPaginate
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - name: search
 *         description: search
 *         in: query
 *         required: false
 *       - name: fromDate
 *         description: fromDate
 *         in: query
 *         required: false
 *       - name: toDate
 *         description: toDate
 *         in: query
 *         required: false
 *       - name: page
 *         description: page
 *         in: query
 *         required: false
 *       - name: limit
 *         description: limit
 *         in: query
 *         required: false
 *     responses:
 *       200:
 *         description: Returns success message
 */
const allServiceListPaginate = async (req, res, next) => {
  const validationSchema = {
    search: Joi.string().optional(),
    fromDate: Joi.string().optional(),
    toDate: Joi.string().optional(),
    page: Joi.string().optional(),
    limit: Joi.string().optional(),
  };
  try {
    const paginateGood = (array, page_size, page_number) => {
      return array.slice(
        (page_number - 1) * page_size,
        page_number * page_size
      );
    };
    const validatedBody = await Joi.validate(req.query, validationSchema);
    const { search, fromDate, toDate, page, limit } = validatedBody;
    var userResult = await findUser({
      _id: req.userId,
      status: { $ne: status.DELETE },
    });
    if (!userResult) {
      throw apiError.notFound(responseMessage.USER_NOT_FOUND);
    }
    // let postPromotionResult = await postPromotionList({ status: status.ACTIVE })
    validatedBody["status"] = status.ACTIVE;
    // validatedBody['postType'] = { $in: ['PRIVATE', 'PUBLIC'] };
    validatedBody["isSold"] = false;
    validatedBody["isBuy"] = false;
    let newDoc = [];
    // let data = await paginateAllPostSearchPrivatePublicFind(validatedBody);
    let [data, postPromotionResult, userCollection, collectionIdList] =
      await Promise.all([
        paginateAllPostSearchPrivatePublicFind(validatedBody),
        // postPromotionList({ status: status.ACTIVE }),
        // userCollectionListAll({ userId: userResult._id, status: { $ne: status.DELETE } }),
        // collectionSubscriptionUserList({ userId: userResult._id, status: { $ne: status.DELETE } })
      ]);

    let postPromotionRes = [];
    for (let i = 0; i < postPromotionResult.length; i++) {
      if (!userResult.blockedUser.includes(postPromotionResult[i].userId._id)) {
        postPromotionRes.push(postPromotionResult[i]);
      }
    }

    let blockUserRes = [];
    for (let i = 0; i < data.length; i++) {
      if (!userResult.blockedUser.includes(data[i].userId._id)) {
        blockUserRes.push(data[i]);
      }
    }

    let dataResults = [];
    for (let i = 0; i < blockUserRes.length; i++) {
      if (!userResult.hidePost.includes(blockUserRes[i]._id)) {
        dataResults.push(blockUserRes[i]);
      }
    }
    for (let i in dataResults) {
      for (let cObj of collectionIdList) {
        if (
          cObj["collectionId"]["_id"].toString() == dataResults[i].collectionId
        ) {
          dataResults[i]["isSubscribed"] = true;
        }
      }
      for (let uObj of userCollection) {
        if (uObj["_id"].toString() == dataResults[i].collectionId) {
          dataResults[i]["isSubscribed"] = true;
        }
      }
      if (userResult["myWatchlist"].includes(dataResults[i]._id) == true) {
        dataResults[i]["isWatchList"] = true;
      }
      dataResults[i].reactOnPost = await dataResults[i].reactOnPost.find(
        (o) => {
          return o.userId.toString() == userResult._id.toString();
        }
      );
    }
    var finaldataRes = [];
    for (let obj of dataResults) {
      let findReportRes = await findAllReport({
        userId: userResult._id,
        postId: obj._id,
      });
      if (findReportRes.length == 0) {
        finaldataRes.push(obj);
      } else {
        for (let commentObject of findReportRes) {
          obj["comment"] = obj["comment"].filter(
            (item) => !item["reportedId"].includes(commentObject._id)
          );
        }
        if (!obj.reportedId.includes(findReportRes[0]._id)) {
          finaldataRes.push(obj);
        }
      }
    }
    let resultRes = [];
    let count = 0;
    var userDob = new Date(userResult.dob);
    var currentDate = new Date();
    var diffDays = currentDate.getYear() - userDob.getYear();
    var postPromotionfinalResult = [];
    for (let i = 0; i < postPromotionRes.length; i++) {
      for (let j = 0; j < userResult.interest.length; j++) {
        for (let x = 0; x < postPromotionRes[i].interest.length; x++) {
          if (
            postPromotionRes[i].interest[x] == userResult.interest[j] &&
            postPromotionRes[i].minAge <= diffDays &&
            postPromotionRes[i].maxAge >= diffDays &&
            userResult._id.toString() !=
              postPromotionRes[i].userId._id.toString()
          ) {
            postPromotionfinalResult.push(postPromotionRes[i]);
          } else if (
            userResult._id.toString() ==
            postPromotionRes[i].userId._id.toString()
          ) {
            postPromotionfinalResult.push(postPromotionRes[i]);
          }
        }
      }
    }
    if (finaldataRes.length == 0) {
      for (let i = 0; i < postPromotionfinalResult.length; i++) {
        resultRes.push(postPromotionfinalResult[i]);
      }
    }
    for (let i = 0; i < finaldataRes.length; i++) {
      count++;
      resultRes.push(finaldataRes[i]);
      if (
        count % 2 == 0 &&
        postPromotionfinalResult[count / 2 - 1] &&
        resultRes.includes(postPromotionfinalResult[count / 2 - 1]) == false
      ) {
        resultRes.push(postPromotionfinalResult[count / 2 - 1]);
      }
    }
    let options2 = {
      page: parseInt(req.query.page) || 1,
      limit: parseInt(req.query.limit) || 10,
    };
    let properResult = {
      docs: paginateGood(resultRes, options2.limit, options2.page),
      total: resultRes.length,
      limit: options2.limit,
      page: options2.page,
      pages: Math.ceil(resultRes.length / options2.limit),
    };
    if (properResult.docs.length == 0) {
      throw apiError.notFound(responseMessage.POST_NOT_FOUND);
    }
    return res.json(new response(properResult, responseMessage.DATA_FOUND));
  } catch (error) {
    console.log("Catch error ==>", error);
    return next(error);
  }
};

/**
 * @swagger
 * /admin/getAllServiceList:
 *   get:
 *     tags:
 *       - ADMIN
 *     description: getAllServiceList
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - name: postId
 *         description: postId
 *         in: query
 *         required: true
 *     responses:
 *       200:
 *         description: Returns success message
 */
const getAllServiceList = async (req, res, next) => {
  try {
    let userResult = await findUser({
      _id: req.userId,
      status: { $ne: status.DELETE },
      userType: userType.USER,
    });
    if (!userResult) {
      throw apiError.notFound(responseMessage.USER_NOT_FOUND);
    }
    let data = await listService({
      status: status.ACTIVE,
    });
    if (!data) {
      throw apiError.notFound(responseMessage.DATA_NOT_FOUND);
    } else {
      return res.json(new response(data, responseMessage.DATA_FOUND));
    }
  } catch (error) {
    return next(error);
  }
};
/**
 * @swagger
 * /admin/getAllServicesByUserId:
 *   get:
 *     tags:
 *       - ADMIN
 *     description: getAllServicesByUserId
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - name: postId
 *         description: postId
 *         in: query
 *         required: true
 *     responses:
 *       200:
 *         description: Returns success message
 */
const getAllServicesByUserId = async (req, res, next) => {
  try {
    let userResult = await findUser({
      _id: req.userId,
      status: { $ne: status.DELETE },
      userType: userType.USER,
    });
    if (!userResult) {
      throw apiError.notFound(responseMessage.USER_NOT_FOUND);
    }
    let data = await listService({
      userId: req.userId,
      status: status.ACTIVE,
    });
    if (!data) {
      throw apiError.notFound(responseMessage.DATA_NOT_FOUND);
    } else {
      return res.json(new response(data, responseMessage.DATA_FOUND));
    }
  } catch (error) {
    return next(error);
  }
};
/**
 * @swagger
 * /admin/getSellerServiceList:
 *   get:
 *     tags:
 *       - ADMIN
 *     description: getSellerServiceList
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - name: postId
 *         description: postId
 *         in: query
 *         required: true
 *     responses:
 *       200:
 *         description: Returns success message
 */
const getSellerServiceList = async (req, res, next) => {
  try {
    let userResult = await findUser({
      _id: req.userId,
      status: { $ne: status.DELETE },
      userType: userType.USER,
    });
    if (!userResult) {
      throw apiError.notFound(responseMessage.USER_NOT_FOUND);
    }
    let data = await listService({
      status: status.ACTIVE,
      type: "SELLER",
    });
    if (!data) {
      throw apiError.notFound(responseMessage.DATA_NOT_FOUND);
    } else {
      return res.json(new response(data, responseMessage.DATA_FOUND));
    }
  } catch (error) {
    return next(error);
  }
};
/**
 * @swagger
 * /admin/getBuyerServiceList:
 *   get:
 *     tags:
 *       - ADMIN
 *     description: getBuyerServiceList
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - name: postId
 *         description: postId
 *         in: query
 *         required: true
 *     responses:
 *       200:
 *         description: Returns success message
 */
const getBuyerServiceList = async (req, res, next) => {
  try {
    let userResult = await findUser({
      _id: req.userId,
      status: { $ne: status.DELETE },
      userType: userType.USER,
    });
    if (!userResult) {
      throw apiError.notFound(responseMessage.USER_NOT_FOUND);
    }
    let data = await listService({
      status: status.ACTIVE,
      type: "BUYER",
    });
    if (!data) {
      throw apiError.notFound(responseMessage.DATA_NOT_FOUND);
    } else {
      return res.json(new response(data, responseMessage.DATA_FOUND));
    }
  } catch (error) {
    return next(error);
  }
};

/////////Reseller////////////

/**
 * @swagger
 * /user/becomeReseller:
 *   post:
 *     tags:
 *       - USER RESELLER
 *     description: becomeReseller
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - name: createPost
 *         description: becomeReseller
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/becomeReseller'
 *     responses:
 *       200:
 *         description: Returns success message
 */
const becomeReseller = async (req, res, next) => {
  const validationSchema = {
    // amount: Joi.string().required(),
  };
  try {
    const validatedBody = await Joi.validate(req.body, validationSchema);
    var userResult = await findUser({
      _id: req.userId,
      status: { $ne: status.DELETE },
    });
    if (!userResult) {
      throw apiError.notFound(responseMessage.USER_NOT_FOUND);
    } else {
      const referralCode = await commonFunction.getReferralCode();
      console.log("referral code ", referralCode);
      validatedBody.referralCode = referralCode;
      validatedBody.isReseller = true;
      var updatedUser = await updateUserById(
        { _id: userResult._id },
        validatedBody
      );
      await createActivity({
        userId: userResult._id,
        title: "Become Reseller",
        desctiption: "Become Reseller successfully.",
        type: "RESELLER",
      });

      // let obj = {
      //   message: "Please approve my Service",
      //   userId: userResult._id,
      //   serviceId: saveService._id,
      //   type: "CREATE",
      // };
      // let saveRequest = await createServiceRequest(obj);
      return res.json(
        new response(updatedUser, responseMessage.RESELLER_SUCCESS)
      );
      // }
    }
  } catch (error) {
    console.log("====================>", error);
    return next(error);
  }
};
/**
 * @swagger
 * /user/addReferral:
 *   post:
 *     tags:
 *       - USER RESELLER
 *     description: addReferral
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - name: createPost
 *         description: addReferral
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/addReferral'
 *     responses:
 *       200:
 *         description: Returns success message
 */
const addReferral = async (req, res, next) => {
  const validationSchema = {
    referralCode: Joi.string().required(),
  };
  try {
    const validatedBody = await Joi.validate(req.body, validationSchema);
    const { referralCode } = validatedBody;
    var userResult = await findUser({
      _id: req.userId,
      status: { $ne: status.DELETE },
    });
    if (!userResult) {
      throw apiError.notFound(responseMessage.USER_NOT_FOUND);
    } else {
      var referral = await findUser({
        referralCode: referralCode,
        status: { $ne: status.DELETE },
        userType: userType.USER,
        isReseller: true,
      });
      if (!referral) {
        throw apiError.notFound(responseMessage.REFERRAL_NOT_FOUND);
      } else {
        referral = await updateUserById(
          { _id: referral._id },
          {
            $push: { referredUsers: userResult._id },
            $inc: { referredUserCount: 1 }
          }
        );
        
        var updatedUser = await updateUserById(
          { _id: userResult._id },
          { referredBy: referral._id }
        );

        await createActivity({
          userId: updatedUser._id,
          title: "Referral Add",
          desctiption: " Referral added successfully.",
          type: "RESELLER",
        });
        await createActivity({
          userId: referral._id,
          title: "Referred Users Update",
          desctiption: "Referred Users updated successfully.",
          type: "RESELLER",
        });

        return res.json(
          new response({ updatedUser }, responseMessage.RESELLER_SUCCESS)
        );
      }
    }
  } catch (error) {
    console.log("====================>", error);
    return next(error);
  }
};

/**
   * @swagger
   * /user/createUserBusinessCard:
   *   post:
   *     tags:
   *       - user MANAGEMENT
   *     description: createUserBusinessCard
   *     produces:
   *       - application/json
   *     parameters:
  
   *     responses:
   *       200:
   *         description: Data Saved.
   *       409:
   *         description: Already exist.
   *       401:
   *         description: Unauthorized token.
   *       500:
   *         description: Internal server error.
   *       501:
   *         description: Something went wrong.
   */
const createUserBusinessCard = async (req, res, next) => {
  const validSchema = {
    name: Joi.string().required(),
    identification: Joi.string().required(),
    location: Joi.string().required(),
    email: Joi.string().required(),
    phoneNumber: Joi.string().required(),
    companyName: Joi.string().optional(),
    position: Joi.string().optional(),
    website: Joi.string().optional(),
    socialLink: Joi.string().optional(),
  };
  try {
    const validBody = await Joi.validate(req.body, validSchema);
    let userResult = await findUser({
      _id: req.userId,
      userType: { $in: [userType.USER, userType.ADMIN] },
    });
    if (!userResult) {
      throw apiError.invalid(responseMessage.USER_NOT_FOUND);
    }
    let find = await findBusinessCard({
      userId: req.userId,
      email: validBody.email,
      status: status.ACTIVE,
    });
    if (find) {
      throw apiError.conflict(responseMessage.ALREADY_EXITS);
    }
    validBody.userId = req.userId;
    let resCard = await createBusinessCard(validBody);
    await updateUserById(userResult._id, { businessCardId: resCard._id });
    return res.json(new response(resCard, responseMessage.CREATED_CARD));
  } catch (error) {
    return next(error);
  }
};

/**
 * @swagger
 * /admin/viewBusinessCard:
 *   get:
 *     tags:
 *       - USER MANAGEMENT
 *     description: viewBusinessCard
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: bannerId
 *         description: _id of banner
 *         in: query
 *         required: true
 *     responses:
 *       200:
 *         description: Data Found.
 *       404:
 *         description: Data not Found.
 *       500:
 *         description: Internal server error.
 *       501:
 *         description: Something went wrong.
 */
const viewBusinessCard = async (req, res, next) => {
  const validSchema = {
    businessCardId: Joi.string().required(),
  };
  try {
    const validBody = await Joi.validate(req.query, validSchema);
    let userResult = await findUser({
      _id: req.userId,
      userType: { $in: [userType.USER, userType.ADMIN] },
      status: { $ne: status.DELETE },
    });
    if (!userResult) {
      throw apiError.invalid(responseMessage.USER_NOT_FOUND);
    }
    let find = await findBusinessCard({
      _id: validBody.businessCardId,
      status: { $ne: status.DELETE },
    });
    if (!find) {
      throw apiError.notFound(responseMessage.DATA_NOT_FOUND);
    }
    return res.json(new response(find, responseMessage.DATA_FOUND));
  } catch (error) {
    return next(error);
  }
};

/**
 * @swagger
 * /admin/editBusinessCard:
 *   put:
 *     tags:
 *       - USER MANAGEMENT
 *     description: editBusinessCard
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Update sucdess.
 *       404:
 *         description: Data not Found.
 *       401:
 *         description: Unauthorized token.
 *       500:
 *         description: Internal server error.
 *       501:
 *         description: Something went wrong.
 */
const editBusinessCard = async (req, res, next) => {
  const validSchema = {
    businessCardId: Joi.string().required(),
    name: Joi.string().optional(),
    identification: Joi.string().optional(),
    location: Joi.string().optional(),
    email: Joi.string().optional(),
    phoneNumber: Joi.string().optional(),
    companyName: Joi.string().optional(),
    position: Joi.string().optional(),
    website: Joi.string().optional(),
    socialLink: Joi.string().optional(),
  };
  try {
    const validBody = await Joi.validate(req.body, validSchema);
    const { businessCardId, ...updateFields } = validBody;
    let userResult = await findUser({
      _id: req.userId,
      userType: { $in: [userType.USER, userType.ADMIN] },
    });
    if (!userResult) {
      throw apiError.notFound(responseMessage.USER_NOT_FOUND);
    }
    let data = await findBusinessCard({
      _id: businessCardId,
      status: { $ne: status.DELETE },
    });
    if (!data) {
      throw apiError.notFound(responseMessage.DATA_NOT_FOUND);
    }
    let update = await updateBusinessCardById(
      { _id: data._id },
      { $set: validBody }
    );
    return res.json(new response(update, responseMessage.EDIT_BUSINESS_CARD));
  } catch (error) {
    return next(error);
  }
};

/**
 * @swagger
 * /admin/deleteBusinessCard:
 *   delete:
 *     tags:
 *       - USER MANAGEMENT
 *     description: deleteBusinessCard
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: admin token
 *         in: header
 *         required: true
 *       - name: bannerId
 *         description: _id of banner
 *         in: query
 *         required: true
 *     responses:
 *       200:
 *         description: Card is Removed.
 *       404:
 *         description: Data not Found.
 *       401:
 *         description: Unauthorized token.
 *       500:
 *         description: Internal server error.
 *       501:
 *         description: Something went wrong.
 */
const deleteBusinessCard = async (req, res, next) => {
  const validSchema = {
    businessCardId: Joi.string().required(),
  };
  try {
    const validBody = await Joi.validate(req.body, validSchema);
    let userResult = await findUser({
      _id: req.userId,
      userType: { $in: [userType.USER, userType.ADMIN] },
    });
    if (!userResult) {
      throw apiError.notFound(responseMessage.USER_NOT_FOUND);
    }
    let data = await findBusinessCard({
      _id: validBody.businessCardId,
      userId: req.userId,
      status: { $ne: status.DELETE },
    });
    if (!data) {
      throw apiError.notFound(responseMessage.DATA_NOT_FOUND);
    }
    let up = await updateBusinessCardById(
      { _id: data._id },
      { $set: { status: status.DELETE } }
    );
    await updateUserById(userResult._id, { businessCardId: null });
    return res.json(new response(up, responseMessage.DELETE_BUSINESS_CARD));
  } catch (error) {
    return next(error);
  }
};
/**
 * @swagger
 * /admin/rateUserProduct:
 *   delete:
 *     tags:
 *       - USER Ratings
 *     description: rateUserProduct
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: admin token
 *         in: header
 *         required: true
 *       - name: bannerId
 *         description: _id of banner
 *         in: query
 *         required: true
 *     responses:
 *       200:
 *         description: Card is Removed.
 *       404:
 *         description: Data not Found.
 *       401:
 *         description: Unauthorized token.
 *       500:
 *         description: Internal server error.
 *       501:
 *         description: Something went wrong.
 */
const rateUserProduct = async (req, res, next) => {
  const validSchema = {
    productId: Joi.string().required(),
    rating: Joi.number().required(),
  };
  try {
    const validBody = await Joi.validate(req.body, validSchema);
    let userResult = await findUser({
      _id: req.userId,
      userType: { $in: [userType.USER, userType.ADMIN] },
    });
    if (!userResult) {
      throw apiError.notFound(responseMessage.USER_NOT_FOUND);
    }
    let rateRes = await rateProduct({
      userId: userResult._id,
      productId: validBody.productId,
      rating: validBody.rating,
    });
    if (!rateRes) {
      throw apiError.notFound(responseMessage.DATA_NOT_FOUND);
    }
    return res.json(new response(rateRes, responseMessage.RATED));
  } catch (error) {
    return next(error);
  }
};
/**
 * @swagger
 * /admin/rateUserService:
 *   delete:
 *     tags:
 *       - USER Ratings
 *     description: rateUserService
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: admin token
 *         in: header
 *         required: true
 *       - name: bannerId
 *         description: _id of banner
 *         in: query
 *         required: true
 *     responses:
 *       200:
 *         description: Card is Removed.
 *       404:
 *         description: Data not Found.
 *       401:
 *         description: Unauthorized token.
 *       500:
 *         description: Internal server error.
 *       501:
 *         description: Something went wrong.
 */
const rateUserService = async (req, res, next) => {
  const validSchema = {
    serviceId: Joi.string().required(),
    rating: Joi.number().required(),
  };
  try {
    const validBody = await Joi.validate(req.body, validSchema);
    let userResult = await findUser({
      _id: req.userId,
      userType: { $in: [userType.USER, userType.ADMIN] },
    });
    if (!userResult) {
      throw apiError.notFound(responseMessage.USER_NOT_FOUND);
    }
    let rateRes = await rateService(
      userResult._id,
      validBody.serviceId,
      validBody.rating
    );
    if (!rateRes) {
      throw apiError.notFound(responseMessage.DATA_NOT_FOUND);
    }
    return res.json(new response(rateRes, responseMessage.RATED));
  } catch (error) {
    return next(error);
  }
};
/**
 * @swagger
 * /admin/rateUserProject:
 *   delete:
 *     tags:
 *       - USER Ratings
 *     description: rateUserProject
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: admin token
 *         in: header
 *         required: true
 *       - name: bannerId
 *         description: _id of banner
 *         in: query
 *         required: true
 *     responses:
 *       200:
 *         description: Card is Removed.
 *       404:
 *         description: Data not Found.
 *       401:
 *         description: Unauthorized token.
 *       500:
 *         description: Internal server error.
 *       501:
 *         description: Something went wrong.
 */
const rateUserProject = async (req, res, next) => {
  const validSchema = {
    projectId: Joi.string().required(),
    rating: Joi.number().required(),
  };
  try {
    const validBody = await Joi.validate(req.body, validSchema);
    let userResult = await findUser({
      _id: req.userId,
      userType: { $in: [userType.USER, userType.ADMIN] },
    });
    if (!userResult) {
      throw apiError.notFound(responseMessage.USER_NOT_FOUND);
    }
    let rateRes = await rateProject(
      userResult._id,
      validBody.projectId,
      validBody.rating
    );
    if (!rateRes) {
      throw apiError.notFound(responseMessage.DATA_NOT_FOUND);
    }
    return res.json(new response(rateRes, responseMessage.RATED));
  } catch (error) {
    return next(error);
  }
};
/**
 * @swagger
 * /admin/rateUserJob:
 *   delete:
 *     tags:
 *       - USER Ratings
 *     description: rateUserJob
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: admin token
 *         in: header
 *         required: true
 *       - name: bannerId
 *         description: _id of banner
 *         in: query
 *         required: true
 *     responses:
 *       200:
 *         description: Card is Removed.
 *       404:
 *         description: Data not Found.
 *       401:
 *         description: Unauthorized token.
 *       500:
 *         description: Internal server error.
 *       501:
 *         description: Something went wrong.
 */
const rateUserJob = async (req, res, next) => {
  const validSchema = {
    jobId: Joi.string().required(),
    rating: Joi.number().required(),
  };
  try {
    const validBody = await Joi.validate(req.body, validSchema);
    let userResult = await findUser({
      _id: req.userId,
      userType: { $in: [userType.USER, userType.ADMIN] },
    });
    if (!userResult) {
      throw apiError.notFound(responseMessage.USER_NOT_FOUND);
    }
    let rateRes = await rateJob(
      userResult._id,
      validBody.jobId,
      validBody.rating
    );
    if (!rateRes) {
      throw apiError.notFound(responseMessage.DATA_NOT_FOUND);
    }
    return res.json(new response(rateRes, responseMessage.RATED));
  } catch (error) {
    return next(error);
  }
};
/**
 * @swagger
 * /admin/rateUserPost:
 *   delete:
 *     tags:
 *       - USER Ratings
 *     description: rateUserPost
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: admin token
 *         in: header
 *         required: true
 *       - name: bannerId
 *         description: _id of banner
 *         in: query
 *         required: true
 *     responses:
 *       200:
 *         description: Card is Removed.
 *       404:
 *         description: Data not Found.
 *       401:
 *         description: Unauthorized token.
 *       500:
 *         description: Internal server error.
 *       501:
 *         description: Something went wrong.
 */
const rateUserPost = async (req, res, next) => {
  const validSchema = {
    postId: Joi.string().required(),
    rating: Joi.number().required(),
  };
  try {
    const validBody = await Joi.validate(req.body, validSchema);
    let userResult = await findUser({
      _id: req.userId,
      userType: { $in: [userType.USER, userType.ADMIN] },
    });
    if (!userResult) {
      throw apiError.notFound(responseMessage.USER_NOT_FOUND);
    }
    let rateRes = await ratePost(
      userResult._id,
      validBody.postId,
      validBody.rating
    );
    if (!rateRes) {
      throw apiError.notFound(responseMessage.DATA_NOT_FOUND);
    }
    return res.json(new response(rateRes, responseMessage.RATED));
  } catch (error) {
    return next(error);
  }
};

//Campaign APIs
/**
 * @swagger
 * /user/createCampaignPromotion:
 *   post:
 *     tags:
 *       - USER REPORT
 *     description: createReport
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - name: createReport
 *         description: createReport
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/createReport'
 *     responses:
 *       200:
 *         description: Returns success message
 */
const createCampaignPromotion = async (req, res, next) => {
  const validationSchema = {
    headline: Joi.string().required(),
    photo: Joi.string().required(),
    description: Joi.string().required(),
    keyword: Joi.string().required(),
    duration: Joi.number().required(),
    bidAmount: Joi.number().required(),
    budget: Joi.number().required(),
    startDate: Joi.number().required(),
  };
  try {
    let validatedBody = await Joi.validate(req.body, validationSchema);
    let userResult = await findUser({
      _id: req.userId,
      userType: userType.USER,
      status: { $ne: status.DELETE },
    });
    if (!userResult) {
      throw apiError.notFound(responseMessage.USER_NOT_FOUND);
    } else {
      const photo = await commonFunction.getSecureUrl(validatedBody.photo)
        let obj = {
          ownerId: userResult._id,
          keyword: validatedBody.keyword,
          duration: validatedBody.duration,
          budget: validatedBody.budget,
          bidAmount: validatedBody.bidAmount,
          startDate: validatedBody.startDate,
          description: validatedBody.description,
          headline: validatedBody.headline,
          photo: photo,
          type: "CAMPAIGN",
        };

        let result = await createPromotion(obj);
        let activityobj = {
          title: "Campaign.",
          promotionId: result._id,
          desctiption: `Your Campaign created.`,
          type: "CAMPAIGN",
          userId: userResult._id,
        };
        await createActivity(activityobj);
        return res.json(
          new response(result, responseMessage.CREATE_CAMPAIGN)
        );
      
    }
  } catch (error) {
    console.log("===error====", error);
    return next(error);
  }
};

/**
 * @swagger
 * /user/getUserActiveCampaigns:
 *   post:
 *     tags:
 *       - USER VIEW
 *     description: getUserActiveCampaigns
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - name: getUserActiveCampaigns
 *         description: getUserActiveCampaigns
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/getUserActiveCampaigns'
 *     responses:
 *       200:
 *         description: Returns success message
 */
const getUserActiveCampaigns = async (req, res, next) => {
  try {
    let userResult = await findUser({
      _id: req.userId,
      userType: userType.USER,
      status: { $ne: status.DELETE },
    });
    if (!userResult) {
      throw apiError.notFound(responseMessage.USER_NOT_FOUND);
    } else {
      let promotionCheck = await findAllPromotion({
        ownerId: userResult._id,
        status: status.ACTIVE,
        type: "CAMPAIGN"
      });
      if (promotionCheck) {
        return res.json(
          new response(promotionCheck, responseMessage.CAMPAIGN_FOUND)
        );
      } else {
        throw apiError.notFound(responseMessage.CAMPAIGN_NOT_FOUND);
      }
    }
  } catch (error) {
    console.log("===error====", error);
    return next(error);
  }
};
/**
 * @swagger
 * /user/getUserAllCampaigns:
 *   post:
 *     tags:
 *       - USER VIEW
 *     description: getUserAllCampaigns
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - name: getUserAllCampaigns
 *         description: getUserAllCampaigns
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/getUserAllCampaigns'
 *     responses:
 *       200:
 *         description: Returns success message
 */
const getUserAllCampaigns = async (req, res, next) => {
  try {
    let userResult = await findUser({
      _id: req.userId,
      userType: userType.USER,
      status: { $ne: status.DELETE },
    });
    if (!userResult) {
      throw apiError.notFound(responseMessage.USER_NOT_FOUND);
    } else {
      let promotionCheck = await findAllPromotion({
        ownerId: userResult._id,
        type: "CAMPAIGN"
      });
      if (promotionCheck) {
        return res.json(
          new response(promotionCheck, responseMessage.CAMPAIGN_FOUND)
        );
      } else {
        throw apiError.notFound(responseMessage.CAMPAIGN_NOT_FOUND);
      }
    }
  } catch (error) {
    console.log("===error====", error);
    return next(error);
  }
};
/**
 * @swagger
 * /user/getCampaignsList:
 *   post:
 *     tags:
 *       - USER VIEW
 *     description: getCampaignsList
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - name: getCampaignsList
 *         description: getCampaignsList
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/getCampaignsList'
 *     responses:
 *       200:
 *         description: Returns success message
 */
const getCampaignsList = async (req, res, next) => {
  try {
    let userResult = await findUser({
      _id: req.userId,
      status: { $ne: status.DELETE },
    });
    if (!userResult) {
      throw apiError.notFound(responseMessage.USER_NOT_FOUND);
    } else {
      let promotionCheck = await findAllPromotion({
        status: status.ACTIVE,
        type: "CAMPAIGN"
      });
      if (promotionCheck) {
        return res.json(
          new response(promotionCheck, responseMessage.CAMPAIGN_FOUND)
        );
      } else {
        throw apiError.notFound(responseMessage.CAMPAIGN_NOT_FOUND);
      }
    }
  } catch (error) {
    console.log("===error====", error);
    return next(error);
  }
};

/**
 * @swagger
 * /user/updateUserCampaignById:
 *   post:
 *     tags:
 *       - USER VIEW
 *     description: updateUserCampaignById
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - name: updateUserCampaignById
 *         description: updateUserCampaignById
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/updateUserCampaignById'
 *     responses:
 *       200:
 *         description: Returns success message
 */
const updateUserCampaignById = async (req, res, next) => {
  const validSchema = {
    campaignId: Joi.string().required(),
    status: Joi.string().optional(),
    duration: Joi.string().optional(),
    bidAmount: Joi.string().optional(),
    headline: Joi.string().optional(),
    photo: Joi.string().optional(),
    description: Joi.string().optional(),
  };
  try {
    const validBody = await Joi.validate(req.body, validSchema);
    const { campaignId, ...updatedBody } = validBody;

    let userResult = await findUser({
      _id: req.userId,
      status: { $ne: status.DELETE },
    });
    if (!userResult) {
      throw apiError.notFound(responseMessage.USER_NOT_FOUND);
    } else {
      let promotionCheck = await updatePromotionById(
        {
          _id: campaignId,
          ownerId: req.userId,
          type: "CAMPAIGN"
        },
        updatedBody
      );
      if (promotionCheck) {
        return res.json(
          new response(promotionCheck, responseMessage.PROMOTION_UPDATE)
        );
      } else {
        throw apiError.notFound(responseMessage.CAMPAIGN_NOT_FOUND);
      }
    }
  } catch (error) {
    console.log("===error====", error);
    return next(error);
  }
};

//Promotion APIs
/**
 * @swagger
 * /user/createPostPromotion:
 *   post:
 *     tags:
 *       - USER REPORT
 *     description: createReport
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - name: createReport
 *         description: createReport
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/createReport'
 *     responses:
 *       200:
 *         description: Returns success message
 */
const createPostPromotion = async (req, res, next) => {
  const validationSchema = {
    postId: Joi.string().required(),
    keyword: Joi.string().required(),
    duration: Joi.number().required(),
    bidAmount: Joi.number().required(),
    budget: Joi.number().required(),
  };
  try {
    let validatedBody = await Joi.validate(req.body, validationSchema);
    let userResult = await findUser({
      _id: req.userId,
      userType: userType.USER,
      status: { $ne: status.DELETE },
    });
    if (!userResult) {
      throw apiError.notFound(responseMessage.USER_NOT_FOUND);
    } else {
      let postRes = await findOnePost({
        _id: validatedBody.postId,
        status: { $ne: status.DELETE },
      });
      if (!postRes) {
        throw apiError.notFound(responseMessage.POST_NOT_FOUND);
      }
      let promotionCheck = await findPromotion({
        ownerId: userResult._id,
        postId: postRes._id,
        status: status.ACTIVE,
      });
      if (!promotionCheck) {
        let obj = {
          ownerId: userResult._id,
          postId: postRes._id,
          keyword: validatedBody.keyword,
          duration: validatedBody.duration,
          budget: validatedBody.budget,
          bidAmount: validatedBody.bidAmount,
          type: "POST",
        };
        let result = await createPromotion(obj);
        let activityobj = {
          title: "Post Promotion.",
          promotionId: result._id,
          desctiption: `Your post are promotion created.`,
          type: "PROMOTION",
          userId: userResult._id,
        };
        await createActivity(activityobj);
        return res.json(
          new response(result, responseMessage.CREATE_POST_PROMOTION)
        );
      } else {
        throw apiError.conflict(responseMessage.ALREADY_EXITS);
      }
    }
  } catch (error) {
    console.log("===error====", error);
    return next(error);
  }
};
/**
 * @swagger
 * /user/createProjectPromotion:
 *   post:
 *     tags:
 *       - USER PROJECT PROMOTION
 *     description: createProjectPromotion
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - name: createProjectPromotion
 *         description: createProjectPromotion
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/createReport'
 *     responses:
 *       200:
 *         description: Returns success message
 */
const createProjectPromotion = async (req, res, next) => {
  const validationSchema = {
    projectId: Joi.string().required(),
    keyword: Joi.string().required(),
    duration: Joi.number().required(),
    bidAmount: Joi.number().required(),
    budget: Joi.number().required(),
  };
  try {
    let validatedBody = await Joi.validate(req.body, validationSchema);
    let userResult = await findUser({
      _id: req.userId,
      userType: userType.USER,
      status: { $ne: status.DELETE },
    });
    if (!userResult) {
      throw apiError.notFound(responseMessage.USER_NOT_FOUND);
    } else {
      let projectRes = await findOneProject({
        _id: validatedBody.projectId,
        status: { $ne: status.DELETE },
      });
      if (!projectRes) {
        throw apiError.notFound(responseMessage.PROJECT_NOT_FOUND);
      }
      let promotionCheck = await findPromotion({
        ownerId: userResult._id,
        projectId: projectRes._id,
        status: status.ACTIVE,
      });
      if (!promotionCheck) {
        let obj = {
          ownerId: userResult._id,
          projectId: projectRes._id,
          duration: validatedBody.duration,
          bidAmount: validatedBody.bidAmount,
          budget: validatedBody.budget,
          keyword: validatedBody.keyword,
          type: "PROJECT",
        };
        let result = await createPromotion(obj);
        let activityobj = {
          title: "Project Promotion.",
          promotionId: result._id,
          desctiption: `Your project  promotion created.`,
          type: "PROMOTION",
          userId: userResult._id,
        };
        await createActivity(activityobj);
        return res.json(
          new response(result, responseMessage.PROMOTION_CREATED)
        );
      } else {
        throw apiError.conflict(responseMessage.ALREADY_EXITS);
      }
    }
  } catch (error) {
    console.log("===error====", error);
    return next(error);
  }
};
/**
 * @swagger
 * /user/createJobPromotion:
 *   post:
 *     tags:
 *       - USER JOB PROMOTION
 *     description: createJobPromotion
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - name: createJobPromotion
 *         description: createJobPromotion
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/createReport'
 *     responses:
 *       200:
 *         description: Returns success message
 */
const createJobPromotion = async (req, res, next) => {
  const validationSchema = {
    jobId: Joi.string().required(),
    keyword: Joi.string().required(),
    duration: Joi.number().required(),
    bidAmount: Joi.number().required(),
    budget: Joi.number().required(),
  };
  try {
    let validatedBody = await Joi.validate(req.body, validationSchema);
    let userResult = await findUser({
      _id: req.userId,
      userType: userType.USER,
      status: { $ne: status.DELETE },
    });
    if (!userResult) {
      throw apiError.notFound(responseMessage.USER_NOT_FOUND);
    } else {
      let jobRes = await findOneJob({
        _id: validatedBody.jobId,
        status: { $ne: status.DELETE },
      });
      if (!jobRes) {
        throw apiError.notFound(responseMessage.JOB_NOT_FOUND);
      }
      let promotionCheck = await findPromotion({
        ownerId: userResult._id,
        jobId: jobRes._id,
        status: status.ACTIVE,
      });
      if (!promotionCheck) {
        let obj = {
          ownerId: userResult._id,
          jobId: jobRes._id,
          duration: validatedBody.duration,
          bidAmount: validatedBody.bidAmount,
          budget: validatedBody.budget,
          keyword: validatedBody.keyword,
          type: "JOB",
        };
        let result = await createPromotion(obj);
        let activityobj = {
          title: "Job Promotion.",
          promotionId: result._id,
          desctiption: `Your job promotion created.`,
          type: "PROMOTION",
          userId: userResult._id,
        };
        await createActivity(activityobj);
        return res.json(
          new response(result, responseMessage.PROMOTION_CREATED)
        );
      } else {
        throw apiError.conflict(responseMessage.ALREADY_EXITS);
      }
    }
  } catch (error) {
    console.log("===error====", error);
    return next(error);
  }
};
/**
 * @swagger
 * /user/createProductPromotion:
 *   post:
 *     tags:
 *       - USER PRODUCT PROMOTION
 *     description: createProductPromotion
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - name: createProductPromotion
 *         description: createProductPromotion
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/createReport'
 *     responses:
 *       200:
 *         description: Returns success message
 */
const createProductPromotion = async (req, res, next) => {
  const validationSchema = {
    productId: Joi.string().required(),
    keyword: Joi.string().required(),
    duration: Joi.number().required(),
    bidAmount: Joi.number().required(),
    budget: Joi.number().required(),
  };
  try {
    let validatedBody = await Joi.validate(req.body, validationSchema);
    let userResult = await findUser({
      _id: req.userId,
      userType: userType.USER,
      status: { $ne: status.DELETE },
    });
    if (!userResult) {
      throw apiError.notFound(responseMessage.USER_NOT_FOUND);
    } else {
      let productRes = await findOneProduct({
        _id: validatedBody.productId,
        status: { $ne: status.DELETE },
      });
      if (!productRes) {
        throw apiError.notFound(responseMessage.PRODUCT_NOT_FOUND);
      }
      let promotionCheck = await findPromotion({
        ownerId: userResult._id,
        productId: productRes._id,
        status: status.ACTIVE,
      });
      if (!promotionCheck) {
        let obj = {
          ownerId: userResult._id,
          productId: productRes._id,
          duration: validatedBody.duration,
          bidAmount: validatedBody.bidAmount,
          budget: validatedBody.budget,
          keyword: validatedBody.keyword,
          type: "PRODUCT",
        };
        let result = await createPromotion(obj);
        let activityobj = {
          title: "P roductPromotion.",
          promotionId: result._id,
          desctiption: `Your product promotion created.`,
          type: "PROMOTION",
          userId: userResult._id,
        };
        await createActivity(activityobj);
        return res.json(
          new response(result, responseMessage.PROMOTION_CREATED)
        );
      } else {
        throw apiError.conflict(responseMessage.ALREADY_EXITS);
      }
    }
  } catch (error) {
    console.log("===error====", error);
    return next(error);
  }
};
/**
 * @swagger
 * /user/createServicePromotion:
 *   post:
 *     tags:
 *       - USER SERVICE PROMOTION
 *     description: createServicePromotion
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - name: createServicePromotion
 *         description: createServicePromotion
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/createReport'
 *     responses:
 *       200:
 *         description: Returns success message
 */
const createServicePromotion = async (req, res, next) => {
  const validationSchema = {
    serviceId: Joi.string().required(),
    keyword: Joi.string().required(),
    duration: Joi.number().required(),
    bidAmount: Joi.number().required(),
    budget: Joi.number().required(),
  };
  try {
    let validatedBody = await Joi.validate(req.body, validationSchema);
    let userResult = await findUser({
      _id: req.userId,
      userType: userType.USER,
      status: { $ne: status.DELETE },
    });
    if (!userResult) {
      throw apiError.notFound(responseMessage.USER_NOT_FOUND);
    } else {
      let serviceRes = await findOneService({
        _id: validatedBody.serviceId,
        status: { $ne: status.DELETE },
      });
      if (!serviceRes) {
        throw apiError.notFound(responseMessage.SERVICE_NOT_FOUND);
      }
      let promotionCheck = await findPromotion({
        ownerId: userResult._id,
        serviceId: serviceRes._id,
        status: status.ACTIVE,
      });
      if (!promotionCheck) {
        let obj = {
          ownerId: userResult._id,
          serviceId: serviceRes._id,
          duration: validatedBody.duration,
          bidAmount: validatedBody.bidAmount,
          budget: validatedBody.budget,
          keyword: validatedBody.keyword,
          type: "SERVICE",
        };
        let result = await createPromotion(obj);
        let activityobj = {
          title: "Service Promotion.",
          promotionId: result._id,
          desctiption: `Your Service promotion created.`,
          type: "PROMOTION",
          userId: userResult._id,
        };
        await createActivity(activityobj);
        return res.json(
          new response(result, responseMessage.PROMOTION_CREATED)
        );
      } else {
        throw apiError.conflict(responseMessage.ALREADY_EXITS);
      }
    }
  } catch (error) {
    console.log("===error====", error);
    return next(error);
  }
};

/**
 * @swagger
 * /user/viewPromotionById:
 *   post:
 *     tags:
 *       - USER VIEW
 *     description: viewPromotionById
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - name: viewPromotionById
 *         description: viewPromotionById
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/viewPromotionById'
 *     responses:
 *       200:
 *         description: Returns success message
 */
const viewPromotionById = async (req, res, next) => {
  const validSchema = {
    promotionId: Joi.string().required(),
  };
  try {
    const validBody = await Joi.validate(req.query, validSchema);
    let userResult = await findUser({
      _id: req.userId,
      userType: userType.USER,
      status: { $ne: status.DELETE },
    });
    if (!userResult) {
      throw apiError.notFound(responseMessage.USER_NOT_FOUND);
    } else {
      let promotionCheck = await findPromotion({
        _id: validBody.promotionId,
      });
      if (promotionCheck) {
        return res.json(
          new response(promotionCheck, responseMessage.PROMOTION_FOUND)
        );
      } else {
        throw apiError.notFound(responseMessage.PROMOTION_NOT_FOUND);
      }
    }
  } catch (error) {
    console.log("===error====", error);
    return next(error);
  }
};
/**
 * @swagger
 * /user/viewPostPromotionById:
 *   post:
 *     tags:
 *       - USER VIEW
 *     description: viewPostPromotionById
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - name: viewPostPromotionById
 *         description: viewPostPromotionById
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/viewPostPromotionById'
 *     responses:
 *       200:
 *         description: Returns success message
 */
const viewPostPromotionById = async (req, res, next) => {
  const validationSchema = {
    postId: Joi.string().required(),
  };
  try {
    let validatedBody = await Joi.validate(req.query, validationSchema);
    let userResult = await findUser({
      _id: req.userId,
      userType: userType.USER,
      status: { $ne: status.DELETE },
    });
    if (!userResult) {
      throw apiError.notFound(responseMessage.USER_NOT_FOUND);
    } else {
      let promotionCheck = await findPromotion({
        postId: validatedBody.postId,
        status: status.ACTIVE,
        type: "POST",
      });
      if (promotionCheck) {
        return res.json(
          new response(promotionCheck, responseMessage.PROMOTION_FOUND)
        );
      } else {
        throw apiError.notFound(responseMessage.PRODUCT_NOT_FOUND);
      }
    }
  } catch (error) {
    console.log("===error====", error);
    return next(error);
  }
};
/**
 * @swagger
 * /user/viewProductPromotionById:
 *   post:
 *     tags:
 *       - USER VIEW
 *     description: viewProductPromotionById
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - name: viewProductPromotionById
 *         description: viewProductPromotionById
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/viewProductPromotionById'
 *     responses:
 *       200:
 *         description: Returns success message
 */
const viewProductPromotionById = async (req, res, next) => {
  const validationSchema = {
    productId: Joi.string().required(),
  };
  try {
    let validatedBody = await Joi.validate(req.query, validationSchema);
    let userResult = await findUser({
      _id: req.userId,
      userType: userType.USER,
      status: { $ne: status.DELETE },
    });
    if (!userResult) {
      throw apiError.notFound(responseMessage.USER_NOT_FOUND);
    } else {
      let promotionCheck = await findPromotion({
        productId: validatedBody.productId,
        status: status.ACTIVE,
        type: "PRODUCT",
      });
      if (promotionCheck) {
        return res.json(
          new response(promotionCheck, responseMessage.PROMOTION_FOUND)
        );
      } else {
        throw apiError.notFound(responseMessage.PRODUCT_NOT_FOUND);
      }
    }
  } catch (error) {
    console.log("===error====", error);
    return next(error);
  }
};
/**
 * @swagger
 * /user/viewProjectPromotionById:
 *   post:
 *     tags:
 *       - USER VIEW
 *     description: viewProjectPromotionById
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - name: viewProjectPromotionById
 *         description: viewProjectPromotionById
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/viewProjectPromotionById'
 *     responses:
 *       200:
 *         description: Returns success message
 */
const viewProjectPromotionById = async (req, res, next) => {
  const validationSchema = {
    projectId: Joi.string().required(),
  };
  try {
    let validatedBody = await Joi.validate(req.query, validationSchema);
    let userResult = await findUser({
      _id: req.userId,
      userType: userType.USER,
      status: { $ne: status.DELETE },
    });
    if (!userResult) {
      throw apiError.notFound(responseMessage.USER_NOT_FOUND);
    } else {
      let promotionCheck = await findPromotion({
        projectId: validatedBody.projectId,
        status: status.ACTIVE,
        type: "PROJECT",
      });
      if (promotionCheck) {
        return res.json(
          new response(promotionCheck, responseMessage.PROMOTION_FOUND)
        );
      } else {
        throw apiError.notFound(responseMessage.PRODUCT_NOT_FOUND);
      }
    }
  } catch (error) {
    console.log("===error====", error);
    return next(error);
  }
};
/**
 * @swagger
 * /user/viewJobPromotionById:
 *   post:
 *     tags:
 *       - USER VIEW
 *     description: viewJobPromotionById
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - name: viewJobPromotionById
 *         description: viewJobPromotionById
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/viewJobPromotionById'
 *     responses:
 *       200:
 *         description: Returns success message
 */
const viewJobPromotionById = async (req, res, next) => {
  const validationSchema = {
    jobId: Joi.string().required(),
  };
  try {
    let validatedBody = await Joi.validate(req.query, validationSchema);
    let userResult = await findUser({
      _id: req.userId,
      userType: userType.USER,
      status: { $ne: status.DELETE },
    });
    if (!userResult) {
      throw apiError.notFound(responseMessage.USER_NOT_FOUND);
    } else {
      let promotionCheck = await findPromotion({
        jobId: validatedBody.jobId,
        status: status.ACTIVE,
        type: "JOB",
      });
      if (promotionCheck) {
        return res.json(
          new response(promotionCheck, responseMessage.PROMOTION_FOUND)
        );
      } else {
        throw apiError.notFound(responseMessage.PRODUCT_NOT_FOUND);
      }
    }
  } catch (error) {
    console.log("===error====", error);
    return next(error);
  }
};
/**
 * @swagger
 * /user/viewServicePromotionById:
 *   post:
 *     tags:
 *       - USER VIEW
 *     description: viewServicePromotionById
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - name: viewServicePromotionById
 *         description: viewServicePromotionById
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/viewServicePromotionById'
 *     responses:
 *       200:
 *         description: Returns success message
 */
const viewServicePromotionById = async (req, res, next) => {
  const validationSchema = {
    serviceId: Joi.string().required(),
  };
  try {
    let validatedBody = await Joi.validate(req.query, validationSchema);
    let userResult = await findUser({
      _id: req.userId,
      userType: userType.USER,
      status: { $ne: status.DELETE },
    });
    if (!userResult) {
      throw apiError.notFound(responseMessage.USER_NOT_FOUND);
    } else {
      let promotionCheck = await findPromotion({
        serviceId: validatedBody.serviceId,
        status: status.ACTIVE,
        type: "SERVICE",
      });
      if (promotionCheck) {
        return res.json(
          new response(promotionCheck, responseMessage.PROMOTION_FOUND)
        );
      } else {
        throw apiError.notFound(responseMessage.PRODUCT_NOT_FOUND);
      }
    }
  } catch (error) {
    console.log("===error====", error);
    return next(error);
  }
};

/**
 * @swagger
 * /user/getUserActivePromotions:
 *   post:
 *     tags:
 *       - USER VIEW
 *     description: getUserActivePromotions
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - name: getUserActivePromotions
 *         description: getUserActivePromotions
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/getUserActivePromotions'
 *     responses:
 *       200:
 *         description: Returns success message
 */
const getUserActivePromotions = async (req, res, next) => {
  try {
    let userResult = await findUser({
      _id: req.userId,
      userType: userType.USER,
      status: { $ne: status.DELETE },
    });
    if (!userResult) {
      throw apiError.notFound(responseMessage.USER_NOT_FOUND);
    } else {
      let promotionCheck = await findAllPromotion({
        ownerId: userResult._id,
        status: status.ACTIVE,
      });
      if (promotionCheck) {
        return res.json(
          new response(promotionCheck, responseMessage.PROMOTION_FOUND)
        );
      } else {
        throw apiError.notFound(responseMessage.PRODUCT_NOT_FOUND);
      }
    }
  } catch (error) {
    console.log("===error====", error);
    return next(error);
  }
};

/**
 * @swagger
 * /user/getUserPromotionList:
 *   post:
 *     tags:
 *       - USER VIEW
 *     description: getUserPromotionList
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - name: getUserPromotionList
 *         description: getUserPromotionList
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/getUserPromotionList'
 *     responses:
 *       200:
 *         description: Returns success message
 */
const getUserPromotionList = async (req, res, next) => {
  try {
    let userResult = await findUser({
      _id: req.userId,
      userType: userType.USER,
      status: { $ne: status.DELETE },
    });
    if (!userResult) {
      throw apiError.notFound(responseMessage.USER_NOT_FOUND);
    } else {
      let promotionCheck = await findAllPromotion({
        ownerId: userResult._id,
      });
      if (promotionCheck) {
        return res.json(
          new response(promotionCheck, responseMessage.PROMOTION_FOUND)
        );
      } else {
        throw apiError.notFound(responseMessage.PROMOTION_NOT_FOUND);
      }
    }
  } catch (error) {
    console.log("===error====", error);
    return next(error);
  }
};

/**
 * @swagger
 * /user/updateUserPromotionById:
 *   post:
 *     tags:
 *       - USER VIEW
 *     description: updateUserPromotionById
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - name: updateUserPromotionById
 *         description: updateUserPromotionById
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/updateUserPromotionById'
 *     responses:
 *       200:
 *         description: Returns success message
 */
const updateUserPromotionById = async (req, res, next) => {
  const validSchema = {
    promotionId: Joi.string().required(),
    status: Joi.string().optional(),
    duration: Joi.string().optional(),
    bidAmount: Joi.string().optional(),
  };
  try {
    const validBody = await Joi.validate(req.body, validSchema);
    const { promotionId, ...updatedBody } = validBody;

    let userResult = await findUser({
      _id: req.userId,
      status: { $ne: status.DELETE },
    });
    if (!userResult) {
      throw apiError.notFound(responseMessage.USER_NOT_FOUND);
    } else {
      let promotionCheck = await updatePromotionById(
        {
          _id: promotionId,
          ownerId: req.userId,
        },
        updatedBody
      );
      if (promotionCheck) {
        return res.json(
          new response(promotionCheck, responseMessage.PROMOTION_UPDATE)
        );
      } else {
        throw apiError.notFound(responseMessage.PROMOTION_NOT_FOUND);
      }
    }
  } catch (error) {
    console.log("===error====", error);
    return next(error);
  }
};
/**
 * @swagger
 * /user/clickOnPromotion:
 *   post:
 *     tags:
 *       - USER VIEW
 *     description: clickOnPromotion
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - name: clickOnPromotion
 *         description: clickOnPromotion
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/clickOnPromotion'
 *     responses:
 *       200:
 *         description: Returns success message
 */
const clickOnPromotion = async (req, res, next) => {
  const validSchema = {
    promotionId: Joi.string().required(),
    // status: Joi.string().optional(),
    // duration: Joi.string().optional(),
    // bidAmount: Joi.string().optional(),
  };
  try {
    const validBody = await Joi.validate(req.body, validSchema);
    const { promotionId, ...updatedBody } = validBody;

    let userResult = await findUser({
      _id: req.userId,
      userType: userType.USER,
      status: { $ne: status.DELETE },
    });
    if (!userResult) {
      throw apiError.notFound(responseMessage.USER_NOT_FOUND);
    } else {

      let promotionCheck = await findPromotion({
        _id: promotionId,
        status: { $ne: status.DELETE },
        status: { $ne: status.EXPIRED },
        status: { $ne: status.BLOCK },
      });

      if (promotionCheck) {
        // let update
      let updatePromotion = await recordClickAndUpdatePromotion(
        promotionId,
        userResult._id
      );
        // updatedBody.click;
        return res.json(
          new response(updatePromotion, responseMessage.PROMOTION_UPDATE)
        );
      } else {
        throw apiError.notFound(responseMessage.PROMOTION_NOT_FOUND);
      }
    }
  } catch (error) {
    console.log("===error====", error);
    return next(error);
  }
};

module.exports = {
  register,
  verifyOTP,
  login,
  updateProfile,
  profile,
  createPost,
  postView,
  postListPaginate,
  updateUserPost,
  deleteUserPost,
  productView,
  productListPaginate,
  deleteUserProduct,
  updateUserProduct,
  createProduct,
  serviceView,
  serviceListPaginate,
  deleteUserService,
  updateUserService,
  createService,
  jobView,
  createJob,
  updateUserJob,
  deleteUserJob,
  jobListPaginate,
  projectView,
  createProject,
  updateUserProject,
  deleteUserProject,
  projectListPaginate,
  sendOtpToMail,
  verifyMailAndUpdate,
  becomeReseller,
  addReferral,
  createUserBusinessCard,
  editBusinessCard,
  viewBusinessCard,
  deleteBusinessCard,
  rateUserProduct,
  rateUserService,
  rateUserProject,
  rateUserJob,
  rateUserPost,
  sendOtpToPhone,
  updatePhoneNumber,
  createPostPromotion,
  createProjectPromotion,
  createProductPromotion,
  createJobPromotion,
  createServicePromotion,
  viewPostPromotionById,
  viewProductPromotionById,
  viewProjectPromotionById,
  viewServicePromotionById,
  viewJobPromotionById,
  getUserPromotionList,
  getUserActivePromotions,
  updateUserPromotionById,
  clickOnPromotion,
  viewPromotionById,
  getAllPostList,
  getAllProductList,
  getSellerProductList,
  getBuyerProductList,
  getAllJobList,
  getSellerJobList,
  getBuyerJobList,
  getAllServiceList,
  getSellerServiceList,
  getBuyerServiceList,
  getAllProjectList,
  getAllGovtProjectList,
  createCampaignPromotion,
  getCampaignsList,
  getUserAllCampaigns,
  getUserActiveCampaigns,
  updateUserCampaignById,
  getAllJobsByUserId,
  getAllPostsByUserId,
  getAllProjectsByUserId,
  getAllServicesByUserId,
  getAllProductsByUserId
};
