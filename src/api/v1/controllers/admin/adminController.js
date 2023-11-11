const Joi = require("joi");
const _ = require("lodash");
const config = require("config");
const apiError = require("../../../../helper/apiError.js");
const response = require("../../../../../assets/response.js");
const bcrypt = require("bcryptjs");
const userModel = require("../../../../models/user.js");
const { userServices } = require("../../services/user/user.js");
const { logoServices } = require("../../services/logo/logo.js");
const { bannerServices } = require("../../services/banner/banner.js");
const { faqServices } = require("../../services/faq/faq.js");
const { reportServices } = require("../../services/report/report.js");
const { interestServices } = require("../../services/interest/interest.js");
const {
  identificationServices,
} = require("../../services/identification/identification.js");
const {
  productCategorieServices,
} = require("../../services/productCategorie/productCategorie");
const {
  sectorServices,
} = require("../../services/sector/sector");
const {
  professionCategorieServices,
} = require("../../services/professionCategorie/professionCategorie");
const {
  serviceCategorieServices,
} = require("../../services/serviceCategorie/serviceCategorie");
const {
  productSubCategorieServices,
} = require("../../services/productSubCategorie/productSubCategorie");

const {
  activityServices,
} = require("../../services/userActivity/userActivity.js");
const { feeServices } = require("../../services/fee/fee.js");
const { postServices } = require("../../services/post/post");
const { productServices } = require("../../services/product/product");
const { serviceServices } = require("../../services/service/service");
const { jobServices } = require("../../services/job/job");
const { projectServices } = require("../../services/project/project");

const { requestServices } = require("../../services/request/request.js");
const {
  postRequestServices,
} = require("../../services/postRequest/postRequest.js");
const {
  productRequestServices,
} = require("../../services/productRequest/productRequest.js");
const {
  serviceRequestServices,
} = require("../../services/serviceRequest/serviceRequest.js");
const {
  jobRequestServices,
} = require("../../services/jobRequest/jobRequest.js");
const {
  projectRequestServices,
} = require("../../services/projectRequest/projectRequest.js");
const {
  storeRequestServices,
} = require("../../services/storeRequest/storeRequest.js");

// const { postServices } = require("../../services/post/post.js");
const { durationServices } = require("../../services/duration/duration.js");
// const { transactionServices } = require("../../services/transaction.js");
const {
  logHistoryServices,
} = require("../../services/logHistory/logHistory.js");
const {
  businessCardServices,
} = require("../../services/businessCard/businessCard.js");
const { promotionServices } = require("../../services/promotion/promotion.js");

const {
  createUser,
  findUserByEmail,
  findUserByUsername,
  updateUserById,
  deleteUserById,
  getUserByPhoneNumber,
  findUser,
  emailUserNameExist,
  listAllUsers,
} = require("../../services/user/user");
const {
  createLogHistory,
  findLogHistory,
  updateLogHistory,
  logHistoryList,
  logHistoryWithPagination,
  paginateSearchLogHistory,
} = logHistoryServices;
// const {
//   createTransaction,
//   findTransaction,
//   updateTransaction,
//   transactionList,
//   depositeList,
//   depositeList1,
//   paginateTransactionSearch,
//   paginateWalletTransactionSearch,
//   findTransactionCount,
// } = transactionServices;

const {
  createDuration,
  findDuration,
  updateDuration,
  durationList,
  paginateSearchDuration,
  fetchAllDurationList,
} = durationServices;
const {
  createUserPost,
  findOnePost,
  updatePost,
  listPost,
  paginatePostSearch,
  paginatePostSearchByAdmin,
  findPostCount,
  paginatePostWithUserByAdmin,
  topSellingPostAndResalepost,
} = postServices;
const {
  createUserProduct,
  findOneProduct,
  updateProduct,
  listProduct,
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
  createUserService,
  findOneService,
  updateService,
  listService,
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
  createUserJob,
  findOneJob,
  updateJob,
  listJob,
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

const { createRequest, findRequest, updateRequestById, requestList } =
  requestServices;
const {
  createPostRequest,
  findPostRequest,
  updatePostRequestById,
  postRequestList,
  viewRequestDetails,
} = postRequestServices;
const {
  createProductRequest,
  findProductRequest,
  updateProductRequestById,
  productRequestList,
  viewProductRequestDetails,
} = productRequestServices;

const {
  createServiceRequest,
  findServiceRequest,
  updateServiceRequestById,
  serviceRequestList,
  viewServiceRequestDetails,
} = serviceRequestServices;
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
  createStoreRequest,
  findStoreRequest,
  updateStoreRequestById,
  storeRequestList,
  viewStoreRequestDetails,
} = storeRequestServices;

const { createFee, findFee, updateFee, feeList } = feeServices;
const {
  createActivity,
  findActivity,
  updateActivity,
  multiUpdateActivity,
  activityList,
  activityListWithSort,
  paginateSearch,
  findSearchActivity,
} = activityServices;
// const {
//   userCheck,
//   profileSubscribeList,
//   profileSubscriberList,
//   userCount,
//   checkUserExists,
//   emailMobileExist,
//   latestUserListWithPagination,
//   createUser,
//   findUser,
//   multiUpdateForUser,
//   findUserData,
//   updateUser,
//   updateUserById,
//   userAllDetails,
//   userAllDetailsByUserName,
//   checkSocialLogin,
//   userSubscriberListWithPagination,
//   userSubscriberList,
//   paginateSearchByAdmin,
//   findCount,
//   creatorList,
// } = userServices;
const { createLogo, findLogo, updateLogoById, logoList } = logoServices;
const {
  createBanner,
  findBanner,
  findAllBanner,
  updateBanner,
  updateBannerById,
  paginateSearchBanner,
} = bannerServices;

const { createFaq, findFaq, updateFaqById, faqList } = faqServices;
const {
  createReport,
  findReport,
  findAllReport,
  updateReport,
  updateReportById,
  paginateSearchReport,
  updateManyReport,
} = reportServices;
const {
  createInterest,
  findInterest,
  updateInterest,
  interestList,
  paginateSearchInterest,
} = interestServices;
const {
  createIdentification,
  findIdentification,
  updateIdentification,
  identificationList,
  paginateSearchIdentification,
} = identificationServices;
const {
  createProductCategorie,
  findProductCategorie,
  updateProductCategorie,
  productCategorieList,
  paginateSearchProductCategorie,
} = productCategorieServices;
const {
  createSector,
  findSector,
  updateSector,
  sectorList,
  paginateSearchSector,
} = sectorServices;
const {
  createProfessionCategorie,
  findProfessionCategorie,
  updateProfessionCategorie,
  professionCategorieList,
  paginateSearchProfessionCategorie,
} = professionCategorieServices;
const {
  createServiceCategorie,
  findServiceCategorie,
  updateServiceCategorie,
  serviceCategorieList,
  paginateSearchServiceCategorie,
} = serviceCategorieServices;
const {
  createProductSubCategorie,
  findProductSubCategorie,
  updateProductSubCategorie,
  productSubCategorieList,
  paginateSearchProductSubCategorie,
} = productSubCategorieServices;

const {
  createBusinessCard,
  findBusinessCard,
  findAllBusinessCard,
  updateBusinessCard,
  updateBusinessCardById,
  paginateSearchBusinessCard,
} = businessCardServices;
const {
  createPromotion,
  findPromotion,
  findAllPromotion,
  fetchAllPromotionList,
  updatePromotion,
  updatePromotionById,
} = promotionServices;

const responseMessage = require("../../../../../assets/responseMessage.js");
const commonFunction = require("../../../../helper/util.js");
const jwt = require("jsonwebtoken");
const status = require("../../../../enums/status.js");
const userType = require("../../../../enums/userType.js");
const speakeasy = require("speakeasy");
const axios = require("axios");
const moment = require("moment");
const ip = require("ip");
const { findStore, updateStoreById } = require("../../services/store/store.js");
// const { updateUserPost } = require("../user/userController.js");

class adminController {
  /**
   * @swagger
   * /admin/login:
   *   post:
   *     tags:
   *       - ADMIN
   *     description: login
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: login
   *         description: login
   *         in: body
   *         required: true
   *         schema:
   *           $ref: '#/definitions/login'
   *     responses:
   *       200:
   *         description: Returns success message
   */
  async login(req, res, next) {
    const validationSchema = {
      email: Joi.string().required(),
      password: Joi.string().required(),
    };
    try {
      if (req.body.email) {
        req.body.email = req.body.email.toLowerCase();
      }
      const { email, password } = await Joi.validate(
        req.body,
        validationSchema
      );
      let query = {
        $and: [
          { userType: { $in: [userType.ADMIN, userType.SUBADMIN] } },
          { $or: [{ email: email }, { mobileNumber: email }] },
        ],
      };
      var userResult = await findUser(query);
      if (!userResult) {
        throw apiError.notFound(responseMessage.USER_NOT_FOUND);
      }

      if (!bcrypt.compareSync(password, userResult.password)) {
        throw apiError.invalidLogIn(responseMessage.INCORRECT_LOGIN);
      }
      let token = await commonFunction.getToken({
        id: userResult._id,
        email: userResult.email,
        userType: userResult.userType,
      });
      let updateRes = await updateUserById(
        { _id: userResult._id },
        { isOnline: true }
      );
      let obj = {
        _id: userResult._id,
        userName: userResult.userName,
        token: token,
        userType: userResult.userType,
        permissions: userResult.permissions,
        status: userResult.status,
        isOnline: updateRes.isOnline,
      };
      await createLogHistory({
        userId: userResult._id,
        ip_Address: ip.address(),
        browser: req.headers["user-agent"],
        userType: userResult.userType,
        email: userResult.email,
      });
      return res.json(
        new response({ token, updateRes }, responseMessage.LOGIN)
      );
    } catch (error) {
      console.log("===error====", error);
      return next(error);
    }
  }
  // create an api of admin reset password
  /**
   * @swagger
   * /admin/resetPassword:
   *   post:
   *     tags:
   *       - ADMIN
   *     description: Check for Social existence and give the access Token
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: email
   *         description: email
   *         in: formData
   *         required: true
   *       - name: password
   *         description: password
   *         in: formData
   *         required: true
   *       - name: confirmPassword
   *         description: confirmPassword
   *         in: formData
   *         required: true
   *     responses:
   *       200:
   *         description: Your password has been successfully changed.
   *       404:
   *         description: This user does not exist.
   *       422:
   *         description: Password not matched.
   *       500:
   *         description: Internal Server Error
   *       501:
   *         description: Something went wrong!
   */
  async resetPassword(req, res, next) {
    const validationSchema = {
      email: Joi.string().required(),
      password: Joi.string().required(),
      confirmPassword: Joi.string().required(),
    };
    try {
      if (req.body.email) {
        req.body.email = req.body.email.toLowerCase();
      }
      const { email, password, confirmPassword } = await Joi.validate(
        req.body,
        validationSchema
      );
      let query = {
        $and: [
          { $or: [{ email: email }, { mobileNumber: email }] },
          {
            userType: {
              $in: [userType.ADMIN, userType.SUBADMIN, userType.USER],
            },
          },
          { status: status.ACTIVE },
        ],
      };
      var userResult = await findUser(query);
      if (!userResult) {
        throw apiError.notFound(responseMessage.USER_NOT_FOUND);
      } else {
        if (userResult.otpVerification === false) {
          throw apiError.badRequest(responseMessage.OTP_VERIFY_FIRST);
        }
        if (password == confirmPassword) {
          let update = await updateUser(
            { _id: userResult._id },
            { password: bcrypt.hashSync(password) }
          );
          return res.json(new response(update, responseMessage.PWD_CHANGED));
        } else {
          throw apiError.notFound(responseMessage.PWD_NOT_MATCH);
        }
      }
    } catch (error) {
      return next(error);
    }
  }
  // create an api of admin forgot password
  /**
   * @swagger
   * /admin/forgotPassword:
   *   post:
   *     tags:
   *       - ADMIN
   *     description: forgotPassword
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: resendOtp
   *         description: resendOtp
   *         in: body
   *         required: true
   *         schema:
   *           $ref: '#/definitions/resendOtp'
   *     responses:
   *       200:
   *         description: Returns success message
   */
  async forgotPassword(req, res, next) {
    const validationSchema = {
      email: Joi.string().required(),
    };
    try {
      if (req.body.email) {
        req.body.email = req.body.email.toLowerCase();
      }
      const { email } = await Joi.validate(req.body, validationSchema);
      var userResult = await findUser({
        $and: [
          { status: { $ne: status.DELETE } },
          { $or: [{ mobileNumber: email }, { email: email }] },
        ],
      });
      if (!userResult) {
        throw apiError.notFound(responseMessage.USER_NOT_FOUND);
      }

      let otp = await commonFunction.getOTP();
      if (userResult.email == email) {
        commonFunction.sendMailWithTemplate(email, otp);
      }
      if (userResult.mobileNumber == email) {
        let number = `+91${email}`;
        commonFunction.sendSmsTwilio(number, otp);
      }

      let update = await updateUser(
        { _id: userResult._id },
        { otp: otp, otpTime: new Date().getTime() }
      );
      let obj = {
        otp: update.otp,
        email: update.email || update.mobileNumber,
        userName: update.userName,
      };
      return res.json(new response(obj, responseMessage.OTP_SEND));
    } catch (error) {
      console.log(error);
      return next(error);
    }
  }
  // create an api of admin otpVerify
  /**
   * @swagger
   * /admin/verifyOtp:
   *   put:
   *     tags:
   *       - ADMIN
   *     description: verifyOtp
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: verifyOtp
   *         description: verifyOtp
   *         in: body
   *         required: true
   *         schema:
   *           $ref: '#/definitions/verifyOtp'
   *     responses:
   *       200:
   *         description: Returns success message
   */
  async verifyOtp(req, res, next) {
    try {
      if (req.body.email) {
        req.body.email = req.body.email.toLowerCase();
      }
      var result = await userModel.findOne({
        $and: [
          {
            status: "ACTIVE",
            userType: { $in: [userType.ADMIN, userType.SUBADMIN] },
          },
          {
            $or: [{ mobileNumber: req.body.email }, { email: req.body.email }],
          },
        ],
      });
      if (!result) {
        throw apiError.notFound(responseMessage.USER_NOT_FOUND);
      } else {
        var otpTime = new Date().getTime();
        var diff = otpTime - result.otpTime;
        if (diff >= 300000) {
          throw apiError.badRequest(responseMessage.OTP_EXPIRED);
        } else {
          if (req.body.otp == result.otp) {
            let result2 = await userModel.findOneAndUpdate(
              { _id: result._id },
              { $set: { otpVerification: true } },
              { new: true }
            );
            if (result2) {
              let token = await commonFunction.getToken({
                id: result2._id,
                email: result2.email,
                userType: result2.userType,
              });
              let obj = {
                email: result2.email,
                userName: result2.userName,
                token: token,
              };
              return res.json(new response(obj, responseMessage.OTP_VIRIFIED));
            }
          } else {
            throw apiError.badRequest(responseMessage.INCORRECT_OTP);
          }
        }
      }
    } catch (error) {
      return next(error);
    }
  }
  // create an api of  admin getProfile
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
  async profile(req, res, next) {
    console.log("in the start of profile api");

    try {
      let userResult = await findUser({
        _id: req.userId,
        userType: { $in: [userType.ADMIN] },
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
  }

  // create an api of  admin editProfile
  /**
   * @swagger
   * /admin/updateProfile:
   *   put:
   *     tags:
   *       - ADMIN
   *     description: updateProfile
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: token
   *         description: token
   *         in: header
   *         required: true
   *       - name: updateProfile
   *         description: updateProfile
   *         in: body
   *         required: true
   *         schema:
   *           $ref: '#/definitions/updateProfile'
   *     responses:
   *       200:
   *         description: Returns success message
   */
  async updateProfile(req, res, next) {
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
      let { value, error } = Joi.object(validationSchema).validate(req.body);
      if (error) {
        throw error;
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
        userType: userType.ADMIN,
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
          value.profilePic = await commonFunction.getSecureUrl(profilePic);
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
  }

  //////////////////////
  /**
   * @swagger
   * /user/createProductCategorie:
   *   post:
   *     tags:
   *       - PRODUCT CATEGORIE
   *     description: createProductCategorie
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: token
   *         description: token
   *         in: header
   *         required: true
   *       - name: name
   *         description: name
   *         in: formData
   *         required: true
   *     responses:
   *       200:
   *         description: Returns success message
   */
  async createProductCategorie(req, res, next) {
    const validationSchema = {
      name: Joi.string().required(),
      description: Joi.string().required(),
    };
    try {
      const { value, error } = Joi.object(validationSchema).validate(req.body);
      if (error) {
        throw error;
      }

      let userResult = await findUser({
        _id: req.userId,
        userType: userType.ADMIN,
        status: { $ne: status.DELETE },
      });
      if (!userResult) {
        throw apiError.notFound(responseMessage.USER_NOT_FOUND);
      }
      let categorieRes = await findProductCategorie({
        name: req.body.name,
        status: { $ne: status.DELETE },
      });
      if (categorieRes) {
        throw apiError.conflict(responseMessage.CATEGORIE_EXIST);
      }
      value.userId = userResult._id;
      let saveRes = await createProductCategorie(value);
      return res.json(new response(saveRes, responseMessage.CREATE_CATEGORIE));
    } catch (error) {
      return next(error);
    }
  }

  /**
   * @swagger
   * /user/viewProductCategorie:
   *   get:
   *     tags:
   *       - viewProductCategorie
   *     description: viewProductCategorie
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: product name
   *         description: description
   *         in: query
   *         required: true
   *     responses:
   *       200:
   *         description: Returns success message
   */
  async viewProductCategorie(req, res, next) {
    const validationSchema = {
      categorieId: Joi.string().required(),
    };
    try {
      const validatedBody = await Joi.validate(req.query, validationSchema);
      let resultRes = await findProductCategorie({
        _id: validatedBody.categorieId,
        status: { $ne: status.DELETE },
      });
      if (!resultRes) {
        throw apiError.notFound(responseMessage.DATA_NOT_FOUND);
      }
      return res.json(new response(resultRes, responseMessage.DATA_FOUND));
    } catch (error) {
      return next(error);
    }
  }

  /**
   * @swagger
   * /user/deleteProductCategorie:
   *   delete:
   *     tags:
   *       - deleteProductCategorie
   *     description: deleteProductCategorie
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: token
   *         description: token
   *         in: header
   *         required: true
   *       - name: name
   *         description: description
   *         in: query
   *         required: true
   *     responses:
   *       200:
   *         description: Returns success message
   */
  async deleteProductCategorie(req, res, next) {
    const validationSchema = {
      categorieId: Joi.string().required(),
    };
    try {
      const validatedBody = await Joi.validate(req.query, validationSchema);
      let userResult = await findUser({
        _id: req.userId,
        userType: userType.ADMIN,
        status: { $ne: status.DELETE },
      });
      if (!userResult) {
        throw apiError.notFound(responseMessage.USER_NOT_FOUND);
      }
      let resultRes = await findProductCategorie({
        _id: validatedBody.categorieId,
        status: { $ne: status.DELETE },
      });
      if (!resultRes) {
        throw apiError.notFound(responseMessage.DATA_NOT_FOUND);
      }
      let updateRes = await updateProductCategorie(
        { _id: resultRes._id },
        { status: status.DELETE }
      );
      return res.json(
        new response(updateRes, responseMessage.CATEGORIE_DELETE)
      );
    } catch (error) {
      return next(error);
    }
  }

  /**
   * @swagger
   * /user/SearchProductCategories:
   *   get:
   *     tags:
   *       - Search
   *     description: SearchProductCategories
   *     produces:
   *       - application/json
   *     parameters:
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
  async SearchProductCategories(req, res, next) {
    const validationSchema = {
      fromDate: Joi.string().optional(),
      toDate: Joi.string().optional(),
      page: Joi.string().optional(),
      limit: Joi.string().optional(),
    };
    try {
      const validatedBody = await Joi.validate(req.query, validationSchema);
      let resultRes = await paginateSearchProductCategorie(validatedBody);
      if (resultRes.docs.length == 0) {
        throw apiError.notFound(responseMessage.DATA_NOT_FOUND);
      }
      return res.json(new response(resultRes, responseMessage.DATA_FOUND));
    } catch (error) {
      return next(error);
    }
  }

  // get All Product Categories

  async getAllProductCategories(req, res, next) {
    try {
      const categorieRes = await productCategorieList();
      return res.json(new response(categorieRes, responseMessage.DATA_FOUND));
    } catch (error) {
      // Handle the error gracefully (e.g., log or throw a custom error)
      console.error("Error in getAllproductCategories:", error);
      return next(error);
    }
  }
  //////////////////////
  /**
   * @swagger
   * /user/createSector:
   *   post:
   *     tags:
   *       - PRODUCT CATEGORIE
   *     description: createSector
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: token
   *         description: token
   *         in: header
   *         required: true
   *       - name: name
   *         description: name
   *         in: formData
   *         required: true
   *     responses:
   *       200:
   *         description: Returns success message
   */
  async createSector(req, res, next) {
    const validationSchema = {
      name: Joi.string().required(),
      description: Joi.string().optional(),
    };
    try {
      const { value, error } = Joi.object(validationSchema).validate(req.body);
      if (error) {
        throw error;
      }

      let userResult = await findUser({
        _id: req.userId,
        userType: userType.ADMIN,
        status: { $ne: status.DELETE },
      });
      if (!userResult) {
        throw apiError.notFound(responseMessage.USER_NOT_FOUND);
      }
      let categorieRes = await findSector({
        name: req.body.name,
        status: { $ne: status.DELETE },
      });
      if (categorieRes) {
        throw apiError.conflict(responseMessage.CATEGORIE_EXIST);
      }
      value.userId = userResult._id;
      let saveRes = await createSector(value);
      return res.json(new response(saveRes, responseMessage.CREATE_CATEGORIE));
    } catch (error) {
      return next(error);
    }
  }

  /**
   * @swagger
   * /user/viewSectorById:
   *   get:
   *     tags:
   *       - viewSectorById
   *     description: viewSectorById
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: product name
   *         description: description
   *         in: query
   *         required: true
   *     responses:
   *       200:
   *         description: Returns success message
   */
  async viewSectorById(req, res, next) {
    const validationSchema = {
      sectorId: Joi.string().required(),
    };
    try {
      const validatedBody = await Joi.validate(req.query, validationSchema);
      let resultRes = await findSector({
        _id: validatedBody.sectorId,
        status: { $ne: status.DELETE },
      });
      if (!resultRes) {
        throw apiError.notFound(responseMessage.DATA_NOT_FOUND);
      }
      return res.json(new response(resultRes, responseMessage.DATA_FOUND));
    } catch (error) {
      return next(error);
    }
  }

  /**
   * @swagger
   * /user/deleteSector:
   *   delete:
   *     tags:
   *       - deleteSector
   *     description: deleteSector
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: token
   *         description: token
   *         in: header
   *         required: true
   *       - name: name
   *         description: description
   *         in: query
   *         required: true
   *     responses:
   *       200:
   *         description: Returns success message
   */
  async deleteSector(req, res, next) {
    const validationSchema = {
      sectorId: Joi.string().required(),
    };
    try {
      const validatedBody = await Joi.validate(req.query, validationSchema);
      let userResult = await findUser({
        _id: req.userId,
        userType: userType.ADMIN,
        status: { $ne: status.DELETE },
      });
      if (!userResult) {
        throw apiError.notFound(responseMessage.USER_NOT_FOUND);
      }
      let resultRes = await findSector({
        _id: validatedBody.sectorId,
        status: { $ne: status.DELETE },
      });
      if (!resultRes) {
        throw apiError.notFound(responseMessage.DATA_NOT_FOUND);
      }
      let updateRes = await updateSector(
        { _id: resultRes._id },
        { status: status.DELETE }
      );
      return res.json(
        new response(updateRes, responseMessage.CATEGORIE_DELETE)
      );
    } catch (error) {
      return next(error);
    }
  }

  /**
   * @swagger
   * /user/SearchSector:
   *   get:
   *     tags:
   *       - Search
   *     description: SearchSector
   *     produces:
   *       - application/json
   *     parameters:
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
  async searchSector(req, res, next) {
    const validationSchema = {
      fromDate: Joi.string().optional(),
      toDate: Joi.string().optional(),
      page: Joi.string().optional(),
      limit: Joi.string().optional(),
    };
    try {
      const validatedBody = await Joi.validate(req.query, validationSchema);
      let resultRes = await paginateSearchSector(validatedBody);
      if (resultRes.docs.length == 0) {
        throw apiError.notFound(responseMessage.DATA_NOT_FOUND);
      }
      return res.json(new response(resultRes, responseMessage.DATA_FOUND));
    } catch (error) {
      return next(error);
    }
  }

  // get All Sectors

  async getAllSector(req, res, next) {
    try {
      const categorieRes = await sectorList();
      return res.json(new response(categorieRes, responseMessage.DATA_FOUND));
    } catch (error) {
      // Handle the error gracefully (e.g., log or throw a custom error)
      console.error("Error in getAllSectors:", error);
      return next(error);
    }
  }

  ////////////////////////////////////////////
  /**
   * @swagger
   * /user/createProfessionCategorie:
   *   post:
   *     tags:
   *       - Profession CATEGORIE
   *     description: createProfessionCategorie
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: token
   *         description: token
   *         in: header
   *         required: true
   *       - name: name
   *         description: name
   *         in: formData
   *         required: true
   *     responses:
   *       200:
   *         description: Returns success message
   */
  async createProfessionCategorie(req, res, next) {
    const validationSchema = {
      name: Joi.string().required(),
      description: Joi.string().required(),
    };
    try {
      const { value, error } = Joi.object(validationSchema).validate(req.body);
      if (error) {
        throw error;
      }

      let userResult = await findUser({
        _id: req.userId,
        userType: userType.ADMIN,
        status: { $ne: status.DELETE },
      });
      if (!userResult) {
        throw apiError.notFound(responseMessage.USER_NOT_FOUND);
      }
      let categorieRes = await findProfessionCategorie({
        name: req.body.name,
        status: { $ne: status.DELETE },
      });
      if (categorieRes) {
        throw apiError.conflict(responseMessage.CATEGORIE_EXIST);
      }
      value.userId = userResult._id;
      let saveRes = await createProfessionCategorie(value);
      return res.json(new response(saveRes, responseMessage.CREATE_CATEGORIE));
    } catch (error) {
      return next(error);
    }
  }

  /**
   * @swagger
   * /user/viewProfessionCategorie:
   *   get:
   *     tags:
   *       - viewProfessionCategorie
   *     description: viewProfessionCategorie
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: Profession name
   *         description: description
   *         in: query
   *         required: true
   *     responses:
   *       200:
   *         description: Returns success message
   */
  async viewProfessionCategorie(req, res, next) {
    const validationSchema = {
      categorieId: Joi.string().required(),
    };
    try {
      const validatedBody = await Joi.validate(req.query, validationSchema);
      let resultRes = await findProfessionCategorie({
        _id: validatedBody.categorieId,
        status: { $ne: status.DELETE },
      });
      if (!resultRes) {
        throw apiError.notFound(responseMessage.DATA_NOT_FOUND);
      }
      return res.json(new response(resultRes, responseMessage.DATA_FOUND));
    } catch (error) {
      return next(error);
    }
  }

  /**
   * @swagger
   * /user/deleteProfessionCategorie:
   *   delete:
   *     tags:
   *       - deleteProfessionCategorie
   *     description: deleteProfessionCategorie
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: token
   *         description: token
   *         in: header
   *         required: true
   *       - name: name
   *         description: description
   *         in: query
   *         required: true
   *     responses:
   *       200:
   *         description: Returns success message
   */
  async deleteProfessionCategorie(req, res, next) {
    const validationSchema = {
      categorieId: Joi.string().required(),
    };
    try {
      const validatedBody = await Joi.validate(req.query, validationSchema);
      let userResult = await findUser({
        _id: req.userId,
        userType: userType.ADMIN,
        status: { $ne: status.DELETE },
      });
      if (!userResult) {
        throw apiError.notFound(responseMessage.USER_NOT_FOUND);
      }
      let resultRes = await findProfessionCategorie({
        _id: validatedBody.categorieId,
        status: { $ne: status.DELETE },
      });
      if (!resultRes) {
        throw apiError.notFound(responseMessage.DATA_NOT_FOUND);
      }
      let updateRes = await updateProfessionCategorie(
        { _id: resultRes._id },
        { status: status.DELETE }
      );
      return res.json(
        new response(updateRes, responseMessage.CATEGORIE_DELETE)
      );
    } catch (error) {
      return next(error);
    }
  }

  /**
   * @swagger
   * /user/SearchProfessionCategories:
   *   get:
   *     tags:
   *       - Search
   *     description: SearchProfessionCategories
   *     produces:
   *       - application/json
   *     parameters:
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
  async SearchProfessionCategories(req, res, next) {
    const validationSchema = {
      fromDate: Joi.string().optional(),
      toDate: Joi.string().optional(),
      page: Joi.string().optional(),
      limit: Joi.string().optional(),
    };
    try {
      const validatedBody = await Joi.validate(req.query, validationSchema);
      let resultRes = await paginateSearchProfessionCategorie(validatedBody);
      if (resultRes.docs.length == 0) {
        throw apiError.notFound(responseMessage.DATA_NOT_FOUND);
      }
      return res.json(new response(resultRes, responseMessage.DATA_FOUND));
    } catch (error) {
      return next(error);
    }
  }

  // get All Profession Categories

  async getAllProfessionCategories(req, res, next) {
    try {
      const categorieRes = await professionCategorieList();
      return res.json(new response(categorieRes, responseMessage.DATA_FOUND));
    } catch (error) {
      // Handle the error gracefully (e.g., log or throw a custom error)
      console.error("Error in getAllProfessionCategories:", error);
      return next(error);
    }
  }

  ////////////////////////////////////////////

  /**
   * @swagger
   * /user/createProductSubCategorie:
   *   post:
   *     tags:
   *       - PRODUCT CATEGORIE
   *     description: createProductSubCategorie
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: token
   *         description: token
   *         in: header
   *         required: true
   *       - name: name
   *         description: name
   *         in: formData
   *         required: true
   *     responses:
   *       200:
   *         description: Returns success message
   */
  async createProductSubCategorie(req, res, next) {
    const validationSchema = {
      name: Joi.string().required(),
      description: Joi.string().required(),
    };
    try {
      const { value, error } = Joi.object(validationSchema).validate(req.body);
      if (error) {
        throw error;
      }

      let userResult = await findUser({
        _id: req.userId,
        userType: userType.ADMIN,
        status: { $ne: status.DELETE },
      });
      if (!userResult) {
        throw apiError.notFound(responseMessage.USER_NOT_FOUND);
      }
      let categorieRes = await findProductSubCategorie({
        name: req.body.name,
        status: { $ne: status.DELETE },
      });
      if (categorieRes) {
        throw apiError.conflict(responseMessage.CATEGORIE_EXIST);
      }
      value.userId = userResult._id;
      let saveRes = await createProductSubCategorie(value);
      return res.json(new response(saveRes, responseMessage.CREATE_CATEGORIE));
    } catch (error) {
      return next(error);
    }
  }

  /**
   * @swagger
   * /user/viewProductSubCategorie:
   *   get:
   *     tags:
   *       - viewProductSubCategorie
   *     description: viewProductSubCategorie
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: product name
   *         description: description
   *         in: query
   *         required: true
   *     responses:
   *       200:
   *         description: Returns success message
   */
  async viewProductSubCategorie(req, res, next) {
    const validationSchema = {
      categorieId: Joi.string().required(),
    };
    try {
      const validatedBody = await Joi.validate(req.query, validationSchema);
      let resultRes = await findProductSubCategorie({
        _id: validatedBody.categorieId,
        status: { $ne: status.DELETE },
      });
      if (!resultRes) {
        throw apiError.notFound(responseMessage.DATA_NOT_FOUND);
      }
      return res.json(new response(resultRes, responseMessage.DATA_FOUND));
    } catch (error) {
      return next(error);
    }
  }

  /**
   * @swagger
   * /user/deleteProductSubCategorie:
   *   delete:
   *     tags:
   *       - deleteProductCategorie
   *     description: deleteProductSubCategorie
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: token
   *         description: token
   *         in: header
   *         required: true
   *       - name: name
   *         description: description
   *         in: query
   *         required: true
   *     responses:
   *       200:
   *         description: Returns success message
   */
  async deleteProductSubCategorie(req, res, next) {
    const validationSchema = {
      categorieId: Joi.string().required(),
    };
    try {
      const validatedBody = await Joi.validate(req.query, validationSchema);
      let userResult = await findUser({
        _id: req.userId,
        userType: userType.ADMIN,
        status: { $ne: status.DELETE },
      });
      if (!userResult) {
        throw apiError.notFound(responseMessage.USER_NOT_FOUND);
      }
      let resultRes = await findProductSubCategorie({
        _id: validatedBody.categorieId,
        status: { $ne: status.DELETE },
      });
      if (!resultRes) {
        throw apiError.notFound(responseMessage.DATA_NOT_FOUND);
      }
      let updateRes = await updateProductSubCategorie(
        { _id: resultRes._id },
        { status: status.DELETE }
      );
      return res.json(
        new response(updateRes, responseMessage.CATEGORIE_DELETE)
      );
    } catch (error) {
      return next(error);
    }
  }

  /**
   * @swagger
   * /user/SearchProductSubCategories:
   *   get:
   *     tags:
   *       - Search
   *     description: SearchProductSubCategories
   *     produces:
   *       - application/json
   *     parameters:
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
  async SearchProductSubCategories(req, res, next) {
    const validationSchema = {
      fromDate: Joi.string().optional(),
      toDate: Joi.string().optional(),
      page: Joi.string().optional(),
      limit: Joi.string().optional(),
    };
    try {
      const validatedBody = await Joi.validate(req.query, validationSchema);
      let resultRes = await paginateSearchProductSubCategorie(validatedBody);
      if (resultRes.docs.length == 0) {
        throw apiError.notFound(responseMessage.DATA_NOT_FOUND);
      }
      return res.json(new response(resultRes, responseMessage.DATA_FOUND));
    } catch (error) {
      return next(error);
    }
  }

  // get All Product Sub Categories

  async getAllProdctSubCategories(req, res, next) {
    try {
      const categorieRes = await productSubCategorieList();
      return res.json(new response(categorieRes, responseMessage.DATA_FOUND));
    } catch (error) {
      // Handle the error gracefully (e.g., log or throw a custom error)
      console.error("Error in getAllproductCategories:", error);
      return next(error);
    }
  }

  ////////////////////////////////////////////

  //////////////////////
  /**
   * @swagger
   * /user/createServiceCategorie:
   *   post:
   *     tags:
   *       - SERVICE CATEGORIE
   *     description: createServiceCategorie
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: token
   *         description: token
   *         in: header
   *         required: true
   *       - name: name
   *         description: name
   *         in: formData
   *         required: true
   *     responses:
   *       200:
   *         description: Returns success message
   */
  async createServiceCategorie(req, res, next) {
    const validationSchema = {
      name: Joi.string().required(),
      description: Joi.string().required(),
    };
    try {
      const { value, error } = Joi.object(validationSchema).validate(req.body);
      if (error) {
        throw error;
      }

      let userResult = await findUser({
        _id: req.userId,
        userType: userType.ADMIN,
        status: { $ne: status.DELETE },
      });
      if (!userResult) {
        throw apiError.notFound(responseMessage.USER_NOT_FOUND);
      }
      let categorieRes = await findServiceCategorie({
        name: req.body.name,
        status: { $ne: status.DELETE },
      });
      if (categorieRes) {
        throw apiError.conflict(responseMessage.CATEGORIE_EXIST);
      }
      value.userId = userResult._id;
      let saveRes = await createServiceCategorie(value);
      return res.json(new response(saveRes, responseMessage.CREATE_CATEGORIE));
    } catch (error) {
      return next(error);
    }
  }

  /**
   * @swagger
   * /user/viewServiceCategorie:
   *   get:
   *     tags:
   *       - viewServiceCategorie
   *     description: viewServicesCategorie
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: service name
   *         description: description
   *         in: query
   *         required: true
   *     responses:
   *       200:
   *         description: Returns success message
   */
  async viewServiceCategorie(req, res, next) {
    const validationSchema = {
      categorieId: Joi.string().required(),
    };
    try {
      const validatedBody = await Joi.validate(req.query, validationSchema);
      let resultRes = await findServiceCategorie({
        _id: validatedBody.categorieId,
        status: { $ne: status.DELETE },
      });
      if (!resultRes) {
        throw apiError.notFound(responseMessage.DATA_NOT_FOUND);
      }
      return res.json(new response(resultRes, responseMessage.DATA_FOUND));
    } catch (error) {
      return next(error);
    }
  }

  /**
   * @swagger
   * /user/deleteServiceCategorie:
   *   delete:
   *     tags:
   *       - deleteServiceCategorie
   *     description: deleteServiceCategorie
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: token
   *         description: token
   *         in: header
   *         required: true
   *       - name: name
   *         description: description
   *         in: query
   *         required: true
   *     responses:
   *       200:
   *         description: Returns success message
   */
  async deleteServiceCategorie(req, res, next) {
    const validationSchema = {
      categorieId: Joi.string().required(),
    };
    try {
      const validatedBody = await Joi.validate(req.query, validationSchema);
      let userResult = await findUser({
        _id: req.userId,
        userType: userType.ADMIN,
        status: { $ne: status.DELETE },
      });
      if (!userResult) {
        throw apiError.notFound(responseMessage.USER_NOT_FOUND);
      }
      let resultRes = await findServiceCategorie({
        _id: validatedBody.categorieId,
        status: { $ne: status.DELETE },
      });
      if (!resultRes) {
        throw apiError.notFound(responseMessage.DATA_NOT_FOUND);
      }
      let updateRes = await updateServiceCategorie(
        { _id: resultRes._id },
        { status: status.DELETE }
      );
      return res.json(
        new response(updateRes, responseMessage.CATEGORIE_DELETE)
      );
    } catch (error) {
      return next(error);
    }
  }

  /**
   * @swagger
   * /user/SearchServiceCategories:
   *   get:
   *     tags:
   *       - Search
   *     description: SearchServiceCategories
   *     produces:
   *       - application/json
   *     parameters:
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
  async SearchServiceCategories(req, res, next) {
    const validationSchema = {
      fromDate: Joi.string().optional(),
      toDate: Joi.string().optional(),
      page: Joi.string().optional(),
      limit: Joi.string().optional(),
    };
    try {
      const validatedBody = await Joi.validate(req.query, validationSchema);
      let resultRes = await paginateSearchServiceCategorie(validatedBody);
      if (resultRes.docs.length == 0) {
        throw apiError.notFound(responseMessage.DATA_NOT_FOUND);
      }
      return res.json(new response(resultRes, responseMessage.DATA_FOUND));
    } catch (error) {
      return next(error);
    }
  }

  // get All Service Categories

  async getAllServiceCategories(req, res, next) {
    try {
      const categorieRes = await serviceCategorieList();
      return res.json(new response(categorieRes, responseMessage.DATA_FOUND));
    } catch (error) {
      // Handle the error gracefully (e.g., log or throw a custom error)
      console.error("Error in getAllServiceCategories:", error);
      return next(error);
    }
  }

  ////////////////////////////////////////////

  /**
   * @swagger
   * /user/createIdentification:
   *   post:
   *     tags:
   *       - IDENTIFICATION
   *     description: createIdentification
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: token
   *         description: token
   *         in: header
   *         required: true
   *       - name: name
   *         description: name
   *         in: formData
   *         required: true
   *     responses:
   *       200:
   *         description: Returns success message
   */
  async createIdentification(req, res, next) {
    const validationSchema = {
      name: Joi.string().required(),
    };
    try {
      const { value, error } = Joi.object(validationSchema).validate(req.body);
      if (error) {
        throw error;
      }

      let userResult = await findUser({
        _id: req.userId,
        userType: userType.ADMIN,
        status: { $ne: status.DELETE },
      });
      if (!userResult) {
        throw apiError.notFound(responseMessage.USER_NOT_FOUND);
      }
      let identificationRes = await findIdentification({
        name: req.body.name,
        status: { $ne: status.DELETE },
      });
      if (identificationRes) {
        throw apiError.conflict(responseMessage.IDENTIFICATION_EXIST);
      }
      value.userId = userResult._id;
      let saveRes = await createIdentification(value);
      return res.json(
        new response(saveRes, responseMessage.CREATE_IDENTIFICATION)
      );
    } catch (error) {
      return next(error);
    }
  }

  /**
   * @swagger
   * /user/viewIdentification:
   *   get:
   *     tags:
   *       - IDENTIFICATION
   *     description: viewIdentification
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: identificationId
   *         description: identificationId
   *         in: query
   *         required: true
   *     responses:
   *       200:
   *         description: Returns success message
   */
  async viewIdentification(req, res, next) {
    const validationSchema = {
      identificationId: Joi.string().required(),
    };
    try {
      const validatedBody = await Joi.validate(req.query, validationSchema);
      let resultRes = await findIdentification({
        _id: validatedBody.identificationId,
        status: { $ne: status.DELETE },
      });
      if (!resultRes) {
        throw apiError.notFound(responseMessage.DATA_NOT_FOUND);
      }
      return res.json(new response(resultRes, responseMessage.DATA_FOUND));
    } catch (error) {
      return next(error);
    }
  }

  /**
   * @swagger
   * /user/deleteIdentification:
   *   delete:
   *     tags:
   *       - IDENTIFICATION
   *     description: deleteIdentification
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: token
   *         description: token
   *         in: header
   *         required: true
   *       - name: identificationId
   *         description: identificationId
   *         in: query
   *         required: true
   *     responses:
   *       200:
   *         description: Returns success message
   */
  async deleteIdentification(req, res, next) {
    const validationSchema = {
      identificationId: Joi.string().required(),
    };
    try {
      const validatedBody = await Joi.validate(req.query, validationSchema);
      let userResult = await findUser({
        _id: req.userId,
        userType: userType.ADMIN,
        status: { $ne: status.DELETE },
      });
      if (!userResult) {
        throw apiError.notFound(responseMessage.USER_NOT_FOUND);
      }
      let resultRes = await findIdentification({
        _id: validatedBody.identificationId,
        status: { $ne: status.DELETE },
      });
      if (!resultRes) {
        throw apiError.notFound(responseMessage.DATA_NOT_FOUND);
      }
      let updateRes = await updateIdentification(
        { _id: resultRes._id },
        { status: status.DELETE }
      );
      return res.json(
        new response(updateRes, responseMessage.IDENTIFICATION_DELETE)
      );
    } catch (error) {
      return next(error);
    }
  }

  /**
   * @swagger
   * /user/paginateSearchIdentification:
   *   get:
   *     tags:
   *       - IDENTIFICATION
   *     description: paginateSearchIdentification
   *     produces:
   *       - application/json
   *     parameters:
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
  async paginateSearchIdentification(req, res, next) {
    const validationSchema = {
      fromDate: Joi.string().optional(),
      toDate: Joi.string().optional(),
      page: Joi.string().optional(),
      limit: Joi.string().optional(),
    };
    try {
      const validatedBody = await Joi.validate(req.query, validationSchema);
      let resultRes = await paginateSearchIdentification(validatedBody);
      if (resultRes.docs.length == 0) {
        throw apiError.notFound(responseMessage.DATA_NOT_FOUND);
      }
      return res.json(new response(resultRes, responseMessage.DATA_FOUND));
    } catch (error) {
      return next(error);
    }
  }

  // get All Interests

  async getAllIdentifications(req, res, next) {
    try {
      const identifications = await identificationList();
      return res.json(identifications);
    } catch (error) {
      // Handle the error gracefully (e.g., log or throw a custom error)
      console.error("Error in getAllIdentifications:", error);
      return next(error);
    }
  }

  ////////////////////////////////////////////

  /**
   * @swagger
   * /user/createInterest:
   *   post:
   *     tags:
   *       - INTEREST
   *     description: createInterest
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: token
   *         description: token
   *         in: header
   *         required: true
   *       - name: name
   *         description: name
   *         in: formData
   *         required: true
   *     responses:
   *       200:
   *         description: Returns success message
   */
  async createInterest(req, res, next) {
    const validationSchema = {
      name: Joi.string().required(),
    };
    try {
      const { value, error } = Joi.object(validationSchema).validate(req.body);
      if (error) {
        throw error;
      }

      let userResult = await findUser({
        _id: req.userId,
        userType: userType.ADMIN,
        status: { $ne: status.DELETE },
      });
      if (!userResult) {
        throw apiError.notFound(responseMessage.USER_NOT_FOUND);
      }
      let interestRes = await findInterest({
        name: req.body.name,
        status: { $ne: status.DELETE },
      });
      if (interestRes) {
        throw apiError.conflict(responseMessage.INTEREST_EXIST);
      }
      value.userId = userResult._id;
      let saveRes = await createInterest(value);
      return res.json(new response(saveRes, responseMessage.CREATE_INTEREST));
    } catch (error) {
      return next(error);
    }
  }

  /**
   * @swagger
   * /user/viewInterest:
   *   get:
   *     tags:
   *       - INTEREST
   *     description: viewInterest
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: interestId
   *         description: interestId
   *         in: query
   *         required: true
   *     responses:
   *       200:
   *         description: Returns success message
   */
  async viewInterest(req, res, next) {
    const validationSchema = {
      interestId: Joi.string().required(),
    };
    try {
      const validatedBody = await Joi.validate(req.query, validationSchema);
      let resultRes = await findInterest({
        _id: validatedBody.interestId,
        status: { $ne: status.DELETE },
      });
      if (!resultRes) {
        throw apiError.notFound(responseMessage.DATA_NOT_FOUND);
      }
      return res.json(new response(resultRes, responseMessage.DATA_FOUND));
    } catch (error) {
      return next(error);
    }
  }

  /**
   * @swagger
   * /user/deleteInterest:
   *   delete:
   *     tags:
   *       - INTEREST
   *     description: deleteInterest
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: token
   *         description: token
   *         in: header
   *         required: true
   *       - name: interestId
   *         description: interestId
   *         in: query
   *         required: true
   *     responses:
   *       200:
   *         description: Returns success message
   */
  async deleteInterest(req, res, next) {
    const validationSchema = {
      interestId: Joi.string().required(),
    };
    try {
      const validatedBody = await Joi.validate(req.query, validationSchema);
      let userResult = await findUser({
        _id: req.userId,
        status: { $ne: status.DELETE },
      });
      if (!userResult) {
        throw apiError.notFound(responseMessage.USER_NOT_FOUND);
      }
      let resultRes = await findInterest({
        _id: validatedBody.interestId,
        status: { $ne: status.DELETE },
      });
      if (!resultRes) {
        throw apiError.notFound(responseMessage.DATA_NOT_FOUND);
      }
      let updateRes = await updateInterest(
        { _id: resultRes._id },
        { status: status.DELETE }
      );
      return res.json(new response(updateRes, responseMessage.INTEREST_DELETE));
    } catch (error) {
      return next(error);
    }
  }

  /**
   * @swagger
   * /user/paginateSearchInterest:
   *   get:
   *     tags:
   *       - INTEREST
   *     description: paginateSearchInterest
   *     produces:
   *       - application/json
   *     parameters:
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
  async paginateSearchInterest(req, res, next) {
    const validationSchema = {
      fromDate: Joi.string().optional(),
      toDate: Joi.string().optional(),
      page: Joi.string().optional(),
      limit: Joi.string().optional(),
    };
    try {
      const validatedBody = await Joi.validate(req.query, validationSchema);
      let resultRes = await paginateSearchInterest(validatedBody);
      if (resultRes.docs.length == 0) {
        throw apiError.notFound(responseMessage.DATA_NOT_FOUND);
      }
      return res.json(new response(resultRes, responseMessage.DATA_FOUND));
    } catch (error) {
      return next(error);
    }
  }

  // get All Interests

  async getAllInterests(req, res, next) {
    try {
      const interests = await interestList();
      return res.json(interests);
    } catch (error) {
      // Handle the error gracefully (e.g., log or throw a custom error)
      console.error("Error in getAllInterests:", error);
      return next(error);
    }
  }

  ////////////////////////////////////////////

  /**
   * @swagger
   * /admin/addLogo:
   *   post:
   *     tags:
   *       - ADMIN MANAGEMENT
   *     description: addLogo
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: token
   *         description: token
   *         in: header
   *         required: true
   *       - name: logoTitle
   *         description: logoTitle
   *         in: formData
   *         required: true
   *       - name: logoImage
   *         description: logoImage
   *         in: formData
   *         type: file
   *         required: true
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
  async addLogo(req, res, next) {
    const validSchema = {
      logoTitle: Joi.string().required(),
      logoImage: Joi.array().items(Joi.string().required()),
    };
    try {
      const validatedBody = await Joi.validate(req.body, validSchema);
      let admin = await findUser({
        _id: req.userId,
        userType: { $in: [userType.ADMIN, userType.SUBADMIN] },
      });
      if (!admin) {
        throw apiError.invalid(responseMessage.UNAUTHORIZED);
      } else {
        let find = await findLogo({
          logoTitle: validatedBody.logoTitle,
          status: status.ACTIVE,
        });
        if (find) {
          throw apiError.conflict(responseMessage.ALREADY_EXITS);
        }
        let a = await commonFunction.getImageUrl(req.files);
        let obj = {
          logoTitle: validatedBody.logoTitle,
          logoImage: a.secure_url,
        };
        let saveResult = await createLogo(obj);
        return res.json(new response(saveResult, responseMessage.ADD_LOGO));
      }
    } catch (error) {
      console.log(error);
      return next(error);
    }
  }
  /**
   * @swagger
   * /admin/viewLogo:
   *   get:
   *     tags:
   *       - ADMIN MANAGEMENT
   *     description: viewLogo
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: _id
   *         description: _id of logo
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
   *         description: Something went wrong .
   */
  async viewLogo(req, res, next) {
    const validateSchema = {
      _id: Joi.string().required(),
    };
    try {
      const validatedBody = await Joi.validate(req.query, validateSchema);
      let find = await findLogo({
        _id: validatedBody._id,
        status: { $ne: status.DELETE },
      });
      if (!find) {
        throw apiError.notFound(responseMessage.DATA_NOT_FOUND);
      }
      return res.json(new response(find, responseMessage.VIEW_LOGO));
    } catch (error) {
      return next(error);
    }
  }

  /**
   * @swagger
   * /admin/editLogo:
   *   put:
   *     tags:
   *       - ADMIN MANAGEMENT
   *     description: editLogo
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: token
   *         description: token
   *         in: header
   *         required: true
   *       - name: _id
   *         description: _id
   *         in: query
   *         required: true
   *       - name: logoTitle
   *         description: logoTitle
   *         in: formData
   *         required: false
   *       - name: logoImage
   *         description: logoImage
   *         in: formData
   *         type: file
   *         required: false
   *     responses:
   *       200:
   *         description: Data Update Successfully.
   *       404:
   *         description: Data not Found.
   *       500:
   *         description: Internal server error.
   *       501:
   *         description: Something went wrong.
   */
  async editLogo(req, res, next) {
    const validateSchema = {
      logoTitle: Joi.string().optional(),
      logoImage: Joi.array().items(Joi.string().optional()),
    };
    try {
      const validatedBody = await Joi.validate(req.body, validateSchema);
      let adminRes = await findUser({
        _id: req.userId,
        userType: { $in: [userType.ADMIN, userType.SUBADMIN] },
      });
      if (!adminRes) {
        throw apiError.invalid(responseMessage.UNAUTHORIZED);
      }
      let data = await findLogo({
        _id: req.query._id,
        status: { $ne: status.DELETE },
      });
      if (!data) {
        throw apiError.notFound(responseMessage.DATA_NOT_FOUND);
      } else {
        if (req.files) {
          let a = await commonFunction.getImageUrl(req.files);
          validatedBody.logoImage = a.secure_url;
        }
        let update = await updateLogoById(
          { _id: data._id },
          { $set: validatedBody }
        );
        return res.json(new response(update, responseMessage.EDIT_LOGO));
      }
    } catch (error) {
      return next(error);
    }
  }

  /**
   * @swagger
   * /admin/deleteLogo:
   *   delete:
   *     tags:
   *       - ADMIN MANAGEMENT
   *     description: deleteLogo
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: token
   *         description: admin token
   *         in: header
   *         required: true
   *       - name: _id
   *         description: _id of Logo
   *         in: query
   *         required: true
   *     responses:
   *       200:
   *         description: Logo is Deleted.
   *       404:
   *         description: Data not Found.
   *       500:
   *         description: Internal server error .
   *       501:
   *         description: Something went wrong.
   */
  async deleteLogo(req, res, next) {
    const validateSchema = {
      _id: Joi.string().required(),
    };
    try {
      const validatedBody = await Joi.validate(req.query, validateSchema);
      let admin = await findUser({
        _id: req.userId,
        userType: { $in: [userType.ADMIN, userType.SUBADMIN] },
      });
      if (!admin) {
        throw apiError.invalid(responseMessage.UNAUTHORIZED);
      }
      let result = await findLogo({
        _id: validatedBody._id,
        status: { $ne: status.DELETE },
      });
      if (!result) {
        throw apiError.notFound(responseMessage.DATA_NOT_FOUND);
      }
      let updateRes = await updateLogoById(
        { _id: result._id },
        { status: status.DELETE }
      );
      return res.json(new response(updateRes, responseMessage.DELETE_LOGO));
    } catch (error) {
      return next(error);
    }
  }

  /**
   * @swagger
   * /admin/listLogo:
   *   get:
   *     tags:
   *       - ADMIN MANAGEMENT
   *     description: listLogo
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: Data found sucessfully.
   *       404:
   *         description: Data not Found.
   *       500:
   *         description: Internal server error.
   *       501:
   *         description: Something went wrong.
   */
  async listLogo(req, res, next) {
    try {
      var result = await logoList(req.body);
      if (result.length == 0) {
        throw apiError.notFound(responseMessage.DATA_NOT_FOUND);
      }
      return res.json(new response(result, responseMessage.DATA_FOUND));
    } catch (error) {
      return next(error);
    }
  }
  /**
   * @swagger
   * /admin/addBanner:
   *   post:
   *     tags:
   *       - ADMIN MANAGEMENT
   *     description: addBanner
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: token
   *         description: token
   *         in: header
   *         required: true
   *       - name: bannerTitle
   *         description: bannerTitle
   *         in: formData
   *         required: true
   *       - name: bannerDescription
   *         description: bannerDescription
   *         in: formData
   *         required: true
   *       - name: bannerImage
   *         description: bannerImage
   *         in: formData
   *         type: file
   *         required: true
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
  async addBanner(req, res, next) {
    const validSchema = {
      bannerTitle: Joi.string().required(),
      bannerDescription: Joi.string().required(),
      bannerImage: Joi.array().items(Joi.string().required()),
    };
    try {
      const validBody = await Joi.validate(req.body, validSchema);
      let admin = await findUser({
        _id: req.userId,
        userType: { $in: [userType.ADMIN, userType.SUBADMIN] },
      });
      if (!admin) {
        throw apiError.invalid(responseMessage.USER_NOT_FOUND);
      }
      let find = await findBanner({
        bannerTitle: validBody.bannerTitle,
        status: status.ACTIVE,
      });
      if (find) {
        throw apiError.conflict(responseMessage.ALREADY_EXITS);
      }
      let a = await commonFunction.getImageUrl(req.files);
      let obj = {
        bannerTitle: validBody.bannerTitle,
        bannerDescription: validBody.bannerDescription,
        bannerImage: a.secure_url,
      };
      let save = await createBanner(obj);
      return res.json(new response(save, responseMessage.ADD_BANNER));
    } catch (error) {
      return next(error);
    }
  }

  /**
   * @swagger
   * /admin/viewBanner:
   *   get:
   *     tags:
   *       - ADMIN MANAGEMENT
   *     description: viewBanner
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
  async viewBanner(req, res, next) {
    const validSchema = {
      bannerId: Joi.string().required(),
    };
    try {
      const validBody = await Joi.validate(req.query, validSchema);
      let find = await findBanner({
        _id: validBody.bannerId,
        status: { $ne: status.DELETE },
      });
      if (!find) {
        throw apiError.notFound(responseMessage.DATA_NOT_FOUND);
      }
      return res.json(new response(find, responseMessage.DATA_FOUND));
    } catch (error) {
      return next(error);
    }
  }

  /**
   * @swagger
   * /admin/editBanner:
   *   put:
   *     tags:
   *       - ADMIN MANAGEMENT
   *     description: editBanner
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: token
   *         description: token
   *         in: header
   *         required: true
   *       - name: bannerId
   *         description: bannerId
   *         in: query
   *         required: true
   *       - name: bannerTitle
   *         description: bannerTitle
   *         in: formData
   *         required: false
   *       - name: bannerDescription
   *         description: bannerDescription
   *         in: formData
   *         required: false
   *       - name: bannerImage
   *         description: bannerImage
   *         in: formData
   *         type: file
   *         required: false
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
  async editBanner(req, res, next) {
    const validSchema = {
      bannerTitle: Joi.string().optional(),
      bannerDescription: Joi.string().optional(),
      bannerImage: Joi.array().items(Joi.string().optional()),
    };
    try {
      const validBody = await Joi.validate(req.body, validSchema);
      let admin = await findUser({
        _id: req.userId,
        userType: { $in: [userType.ADMIN, userType.SUBADMIN] },
      });
      if (!admin) {
        throw apiError.invalid(responseMessage.UNAUTHORIZED);
      }
      let data = await findBanner({
        _id: req.query.bannerId,
        status: { $ne: status.DELETE },
      });
      if (!data) {
        throw apiError.notFound(responseMessage.DATA_NOT_FOUND);
      }
      if (req.files.length != 0) {
        let a = await commonFunction.getImageUrl(req.files);
        validBody.bannerImage = a.secure_url;
        let update = await updateBannerById(
          { _id: data._id },
          { $set: validBody }
        );
        return res.json(new response(update, responseMessage.EDIT_BANNER));
      }
      let update = await updateBannerById(
        { _id: data._id },
        { $set: validBody }
      );
      return res.json(new response(update, responseMessage.EDIT_BANNER));
    } catch (error) {
      return next(error);
    }
  }

  /**
   * @swagger
   * /admin/removeBanner:
   *   delete:
   *     tags:
   *       - ADMIN MANAGEMENT
   *     description: removeBanner
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
   *         description: Banner is Removed.
   *       404:
   *         description: Data not Found.
   *       401:
   *         description: Unauthorized token.
   *       500:
   *         description: Internal server error.
   *       501:
   *         description: Something went wrong.
   */
  async removeBanner(req, res, next) {
    const validSchema = {
      bannerId: Joi.string().required(),
    };
    try {
      const validBody = await Joi.validate(req.query);
      let admin = await findUser({
        _id: req.userId,
        userType: { $in: [userType.ADMIN, userType.SUBADMIN] },
      });
      if (!admin) {
        throw apiError.invalid(responseMessage.INVALID_USER);
      }
      let data = await findBanner({
        _id: validBody.bannerId,
        status: { $ne: status.DELETE },
      });
      if (!data) {
        throw apiError.notFound(responseMessage.DATA_NOT_FOUND);
      }
      let up = await updateBannerById(
        { _id: data._id },
        { $set: { status: status.DELETE } }
      );
      return res.json(new response(up, responseMessage.DELETE_BANNER));
    } catch (error) {
      return next(error);
    }
  }

  /**
   * @swagger
   * /admin/listBanner:
   *   get:
   *     tags:
   *       - ADMIN MANAGEMENT
   *     description: listBanner
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: Data found sucessfully.
   *       404:
   *         description: Data not Found.
   *       401:
   *         description: Unauthorized token.
   *       500:
   *         description: Internal server error.
   *       501:
   *         description: Something went wrong.
   */
  async listBanner(req, res, next) {
    try {
      var result = await findAllBanner();
      if (!result) {
        throw apiError.notFound(responseMessage.DATA_NOT_FOUND);
      }
      return res.json(new response(result, responseMessage.DATA_FOUND));
    } catch (error) {
      return next(error);
    }
  }

  /**
   * @swagger
   * /admin/activeDeactiveBanner:
   *   put:
   *     tags:
   *       - ADMIN MANAGEMENT
   *     description: activeDeactiveBanner
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
   *         description: Banner has been active/deactive banner .
   *       404:
   *         description: Data not Found.
   *       401:
   *         description: Unauthorized token.
   *       500:
   *         description: Internal server error.
   *       501:
   *         description: Something went wrong.
   */
  async activeDeactiveBanner(req, res, next) {
    const validSchema = {
      bannerId: Joi.string().required(),
    };
    try {
      const validBody = await Joi.validate(req.query);
      let admin = await findUser({
        _id: req.userId,
        userType: { $in: [userType.ADMIN, userType.SUBADMIN] },
      });
      if (!admin) {
        throw apiError.invalid(responseMessage.INVALID_USER);
      }
      let banner = await findBanner({ _id: validBody.bannerId });
      if (!banner) {
        throw apiError.notFound(responseMessage.DATA_NOT_FOUND);
      } else if (banner.status == status.ACTIVE) {
        let set = await updateBannerById(
          { _id: banner._id },
          { $set: { status: status.BLOCK } }
        );
        return res.json(new response(set, "Banner deactivated successfully ."));
      } else {
        let set = await updateBannerById(
          { _id: banner._id },
          { $set: { status: status.ACTIVE } }
        );
        return res.json(new response(set, "Banner activated successfully ."));
      }
    } catch (error) {
      return next(error);
    }
  }

  /**
   * @swagger
   * /admin/addSocial:
   *   post:
   *     tags:
   *       - ADMIN MANAGEMENT
   *     description: addSocial
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: token
   *         description: token
   *         in: header
   *         required: true
   *       - name: social_title
   *         description: social_title
   *         in: formData
   *         required: true
   *       - name: social_Link
   *         description: social_Link
   *         in: formData
   *         required: true
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
  async addSocial(req, res, next) {
    const validSchema = {
      social_title: Joi.string().required(),
      social_Link: Joi.string().required(),
    };
    try {
      const validBody = await Joi.validate(req.body, validSchema);
      let admin = await findUser({
        _id: req.userId,
        userType: { $in: [userType.ADMIN, userType.SUBADMIN] },
      });
      if (!admin) {
        throw apiError.invalid(responseMessage.USER_NOT_FOUND);
      }
      let find = await findSocial({
        social_title: validBody.social_title,
        status: status.ACTIVE,
      });
      if (find) {
        throw apiError.conflict(responseMessage.ALREADY_EXITS);
      }
      let obj = {
        social_title: validBody.social_title,
        social_Link: validBody.social_Link,
      };
      let save = await createSocial(obj);
      return res.json(new response(save, responseMessage.ADD_SOCIAL));
    } catch (error) {
      return next(error);
    }
  }

  /**
   * @swagger
   * /admin/viewSocial:
   *   get:
   *     tags:
   *       - ADMIN MANAGEMENT
   *     description: viewSocial
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: socialId
   *         description: _id of social
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
  async viewSocial(req, res, next) {
    const validSchema = {
      socialId: Joi.string().required(),
    };
    try {
      const validBody = await Joi.validate(req.query, validSchema);
      let find = await findSocial({
        _id: validBody.socialId,
        status: { $ne: status.DELETE },
      });
      if (!find) {
        throw apiError.notFound(responseMessage.DATA_NOT_FOUND);
      }
      return res.json(new response(find, responseMessage.VIEW_SOCIAL));
    } catch (error) {
      return next(error);
    }
  }

  /**
   * @swagger
   * /admin/editSocial:
   *   put:
   *     tags:
   *       - ADMIN MANAGEMENT
   *     description: editSocial
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: token
   *         description: token
   *         in: header
   *         required: true
   *       - name: socialId
   *         description: socialId
   *         in: query
   *         required: true
   *       - name: social_title
   *         description: social_title
   *         in: formData
   *         required: true
   *       - name: social_Link
   *         description: social_Link
   *         in: formData
   *         required: true
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
  async editSocial(req, res, next) {
    const validSchema = {
      social_title: Joi.string().required(),
      social_Link: Joi.string().required(),
    };
    try {
      const validBody = await Joi.validate(req.body, validSchema);
      let admin = await findUser({
        _id: req.userId,
        userType: { $in: [userType.ADMIN, userType.SUBADMIN] },
      });
      if (!admin) {
        throw apiError.invalid(responseMessage.UNAUTHORIZED);
      }
      let data = await findSocial({
        _id: req.query.socialId,
        status: { $ne: status.DELETE },
      });
      if (!data) {
        throw apiError.notFound(responseMessage.DATA_NOT_FOUND);
      }
      let update = await updateSocialById(
        { _id: data._id },
        { $set: validBody }
      );
      return res.json(new response(update, responseMessage.EDIT_SOCIAL));
    } catch (error) {
      return next(error);
    }
  }

  /**
   * @swagger
   * /admin/removeSocial:
   *   delete:
   *     tags:
   *       - ADMIN MANAGEMENT
   *     description: removeSocial
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: token
   *         description: admin token
   *         in: header
   *         required: true
   *       - name: socialId
   *         description: _id of social
   *         in: query
   *         required: true
   *     responses:
   *       200:
   *         description: Social is Removed.
   *       404:
   *         description: Data not Found.
   *       401:
   *         description: Unauthorized token.
   *       500:
   *         description: Internal server error.
   *       501:
   *         description: Something went wrong.
   */
  async removeSocial(req, res, next) {
    const validSchema = {
      socialId: Joi.string().required(),
    };
    try {
      const validBody = await Joi.validate(req.query);
      let admin = await findUser({
        _id: req.userId,
        userType: { $in: [userType.ADMIN, userType.SUBADMIN] },
      });
      if (!admin) {
        throw apiError.invalid(responseMessage.INVALID_USER);
      }
      let data = await findSocial({
        _id: validBody.socialId,
        status: { $ne: status.DELETE },
      });
      if (!data) {
        throw apiError.notFound(responseMessage.DATA_NOT_FOUND);
      }
      let up = await updateSocialById(
        { _id: data._id },
        { $set: { status: status.DELETE } }
      );
      return res.json(new response(up, responseMessage.DELETE_SOCIAL));
    } catch (error) {
      return next(error);
    }
  }

  /**
   * @swagger
   * /admin/listSocial:
   *   get:
   *     tags:
   *       - ADMIN MANAGEMENT
   *     description: listSocial
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: Data found sucessfully.
   *       404:
   *         description: Data not Found.
   *       401:
   *         description: Unauthorized token.
   *       500:
   *         description: Internal server error.
   *       501:
   *         description: Something went wrong.
   */
  async listSocial(req, res, next) {
    try {
      var result = await findAllSocial();
      if (!result) {
        throw apiError.notFound(responseMessage.DATA_NOT_FOUND);
      }
      return res.json(new response(result, responseMessage.DATA_FOUND));
    } catch (error) {
      return next(error);
    }
  }

  /**
   * @swagger
   * /admin/addFaq:
   *   post:
   *     tags:
   *       - ADMIN MANAGEMENT
   *     description: addSocial
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: token
   *         description: token
   *         in: header
   *         required: true
   *       - name: question
   *         description: question
   *         in: formData
   *         required: true
   *       - name: answer
   *         description: answer
   *         in: formData
   *         required: true
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
  async addFaq(req, res, next) {
    const validSchema = {
      question: Joi.string().required(),
      answer: Joi.string().required(),
    };
    try {
      const validBody = await Joi.validate(req.body, validSchema);
      let admin = await findUser({
        _id: req.userId,
        userType: { $in: [userType.ADMIN] },
      });
      if (!admin) {
        throw apiError.invalid(responseMessage.USER_NOT_FOUND);
      }
      let find = await findFaq({
        question: validBody.question,
        status: status.ACTIVE,
      });
      if (find) {
        throw apiError.conflict(responseMessage.ALREADY_EXITS);
      }
      let obj = {
        question: validBody.question,
        answer: validBody.answer,
      };
      let save = await createFaq(obj);
      return res.json(new response(save, responseMessage.FAQ_ADDED));
    } catch (error) {
      return next(error);
    }
  }
  /**
   * @swagger
   * /admin/viewFAQ:
   *   get:
   *     tags:
   *       - ADMIN MANAGEMENT
   *     description: viewFAQ
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: faqId
   *         description: _id of faq
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
  async viewFAQ(req, res, next) {
    const validSchema = {
      faqId: Joi.string().required(),
    };
    try {
      const validBody = await Joi.validate(req.query, validSchema);
      let find = await findFaq({
        _id: validBody.faqId,
        status: { $ne: status.DELETE },
      });
      if (!find) {
        throw apiError.notFound(responseMessage.DATA_NOT_FOUND);
      }
      return res.json(new response(find, responseMessage.VIEW_FAQ));
    } catch (error) {
      return next(error);
    }
  }
  /**
   * @swagger
   * /admin/editFaq:
   *   put:
   *     tags:
   *       - ADMIN MANAGEMENT
   *     description: editFaq
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: token
   *         description: token
   *         in: header
   *         required: true
   *       - name: faqId
   *         description: faqId
   *         in: query
   *         required: true
   *       - name: question
   *         description: question
   *         in: formData
   *         required: true
   *       - name: answer
   *         description: answer
   *         in: formData
   *         required: true
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
  async editFaq(req, res, next) {
    const validSchema = {
      question: Joi.string().required(),
      answer: Joi.string().required(),
    };
    try {
      const validBody = await Joi.validate(req.body, validSchema);
      let admin = await findUser({
        _id: req.userId,
        userType: { $in: [userType.ADMIN, userType.SUBADMIN] },
      });
      if (!admin) {
        throw apiError.invalid(responseMessage.UNAUTHORIZED);
      }
      let data = await findFaq({
        _id: req.query.faqId,
        status: { $ne: status.DELETE },
      });
      if (!data) {
        throw apiError.notFound(responseMessage.DATA_NOT_FOUND);
      }
      let update = await updateFaqById({ _id: data._id }, { $set: validBody });
      return res.json(new response(update, responseMessage.EDIT_FAQ));
    } catch (error) {
      return next(error);
    }
  }
  /**
   * @swagger
   * /admin/removeFaq:
   *   delete:
   *     tags:
   *       - ADMIN MANAGEMENT
   *     description: removeFaq
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: token
   *         description: admin token
   *         in: header
   *         required: true
   *       - name: faqId
   *         description: _id of faq
   *         in: query
   *         required: true
   *     responses:
   *       200:
   *         description: Faq is Removed.
   *       404:
   *         description: Data not Found.
   *       401:
   *         description: Unauthorized token.
   *       500:
   *         description: Internal server error.
   *       501:
   *         description: Something went wrong.
   */
  async removeFaq(req, res, next) {
    const validSchema = {
      faqId: Joi.string().required(),
    };
    try {
      const validBody = await Joi.validate(req.query, validSchema);
      let admin = await findUser({
        _id: req.userId,
        userType: { $in: [userType.ADMIN] },
      });
      if (!admin) {
        throw apiError.invalid(responseMessage.INVALID_USER);
      }
      let data = await findFaq({
        _id: validBody.faqId,
        status: { $ne: status.DELETE },
      });
      if (!data) {
        throw apiError.notFound(responseMessage.DATA_NOT_FOUND);
      }
      let up = await updateFaqById(
        { _id: data._id },
        { $set: { status: status.DELETE } }
      );
      return res.json(new response(up, responseMessage.DELETE_SOCIAL));
    } catch (error) {
      return next(error);
    }
  }
  /**
   * @swagger
   * /admin/listFaq:
   *   get:
   *     tags:
   *       - ADMIN MANAGEMENT
   *     description: listFaq
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: Data found sucessfully.
   *       404:
   *         description: Data not Found.
   *       401:
   *         description: Unauthorized token.
   *       500:
   *         description: Internal server error.
   *       501:
   *         description: Something went wrong.
   */
  async listFaq(req, res, next) {
    try {
      var result = await faqList();
      if (!result) {
        throw apiError.notFound(responseMessage.DATA_NOT_FOUND);
      }
      return res.json(new response(result, responseMessage.DATA_FOUND));
    } catch (error) {
      return next(error);
    }
  }
  /**
   * @swagger
   * /admin/viewTransaction/{_id}:
   *   get:
   *     tags:
   *       - TRANSACTION MANAGEMENT
   *     description: viewTransaction
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: token
   *         description: token
   *         in: header
   *         required: true
   *       - name: _id
   *         description: _id
   *         in: path
   *         required: true
   *     responses:
   *       200:
   *         description: Returns success message
   */
  async viewTransaction(req, res, next) {
    const validationSchema = {
      _id: Joi.string().required(),
    };
    try {
      const { _id } = await Joi.validate(req.params, validationSchema);
      var userResult = await findUser({ _id: req.userId });
      if (!userResult) {
        throw apiError.notFound(responseMessage.USER_NOT_FOUND);
      }
      var transaction = await findTransaction({
        _id: _id,
        status: { $ne: status.DELETE },
      });
      if (!transaction) {
        throw apiError.conflict(responseMessage.DATA_NOT_FOUND);
      }
      return res.json(
        new response(transaction, responseMessage.DETAILS_FETCHED)
      );
    } catch (error) {
      return next(error);
    }
  }
  /**
   * @swagger
   * /admin/transactionList:
   *   get:
   *     tags:
   *       - TRANSACTION MANAGEMENT
   *     description: transactionList
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: token
   *         description: token
   *         in: header
   *         required: true
   *       - name: userId
   *         description: userId
   *         in: query
   *         required: false
   *     responses:
   *       200:
   *         description: Returns success message
   */
  async transactionList(req, res, next) {
    try {
      let data;
      var userResult = await findUser({
        _id: req.userId,
        userType: { $in: [userType.ADMIN, userType.SUBADMIN] },
      });
      if (!userResult) {
        throw apiError.notFound(responseMessage.USER_NOT_FOUND);
      }
      data = await depositeList(query);
      return res.json(new response(data, responseMessage.DETAILS_FETCHED));
    } catch (error) {
      return next(error);
    }
  }

  /**
   * @swagger
   * /admin/viewReport:
   *   get:
   *     tags:
   *       - ADMIN REPORT MANAGEMENT
   *     description: viewReport
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: token
   *         description: token
   *         in: header
   *         required: true
   *       - name: _id
   *         description: _id
   *         in: query
   *         required: true
   *     responses:
   *       200:
   *         description: Returns success message
   */
  async viewReport(req, res, next) {
    let validationSchema = {
      _id: Joi.string().required(),
    };
    try {
      const validatedBody = await Joi.validate(req.query, validationSchema);
      let adminResult = await findUser({
        _id: req.userId,
        status: { $ne: status.DELETE },
      });
      if (!adminResult) {
        throw apiError.notFound(responseMessage.USER_NOT_FOUND);
      }
      var data = await findReport({
        _id: validatedBody._id,
        status: { $ne: status.DELETE },
      });
      if (!data) {
        throw apiError.notFound(responseMessage.DATA_NOT_FOUND);
      }
      return res.json(new response(data, responseMessage.DETAILS_FETCHED));
    } catch (error) {
      return next(error);
    }
  }

  /**
   * @swagger
   * /admin/reportsList:
   *   get:
   *     tags:
   *       - ADMIN REPORT MANAGEMENT
   *     description: reportsList
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: token
   *         description: token
   *         in: header
   *         required: true
   *       - name: type
   *         description: type
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
  async reportsList(req, res, next) {
    const validationSchema = {
      fromDate: Joi.string().optional(),
      toDate: Joi.string().optional(),
      page: Joi.string().optional(),
      limit: Joi.string().optional(),
      type: Joi.string().optional(),
    };
    try {
      const validatedBody = await Joi.validate(req.query, validationSchema);
      let adminResult = await findUser({ _id: req.userId });
      if (!adminResult) {
        throw apiError.notFound(responseMessage.USER_NOT_FOUND);
      } else {
        let reportRes = await paginateSearchReport(validatedBody);
        if (reportRes.docs.length == 0) {
          throw apiError.notFound(responseMessage.DATA_NOT_FOUND);
        } else {
          return res.json(new response(reportRes, responseMessage.DATA_FOUND));
        }
      }
    } catch (error) {
      return next(error);
    }
  }

  /**
   * @swagger
   * /admin/userBlockUnblock:
   *   post:
   *     tags:
   *       -  ADMIN
   *     description: userBlockUnblock
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: token
   *         description: token
   *         in: header
   *         required: true
   *       - name: _id
   *         description: _id
   *         in: formData
   *         required: true
   *     responses:
   *       200:
   *         description: Returns success message
   */
  async userBlockUnblock(req, res, next) {
    const validationSchema = {
      _id: Joi.string().required(),
    };
    try {
      const validatedBody = await Joi.validate(req.body, validationSchema);
      let adminResult = await findUser({
        _id: req.userId,
        userType: { $in: [userType.ADMIN] },
        status: { $ne: status.DELETE },
      });
      if (!adminResult) {
        throw apiError.unauthorized(responseMessage.UNAUTHORIZED);
      } else {
        let userResult = await findUser({
          _id: validatedBody._id,
          userType: { $ne: userType.ADMIN },
          status: { $ne: status.DELETE },
        });
        if (!userResult) {
          throw apiError.notFound(responseMessage.DATA_NOT_FOUND);
        } else {
          if (userResult.status == status.ACTIVE) {
            let statusRes = await updateUserById(
              { _id: userResult._id },
              { $set: { status: status.BLOCK } }
            );
            return res.json(
              new response(statusRes, responseMessage.BLOCK_BY_ADMIN)
            );
          } else {
            let resultRes = await findRequest({
              userId: userResult._id,
              status: { $ne: status.DELETE },
            });
            if (!resultRes) {
              throw apiError.notFound(responseMessage.NOT_REQUEST);
            }
            await updateRequestById(
              { _id: resultRes._id },
              { status: status.DELETE }
            );
            let statusRes = await updateUserById(
              { _id: userResult._id },
              { $set: { status: status.ACTIVE } }
            );
            return res.json(
              new response(statusRes, responseMessage.UNBLOCK_BY_ADMIN)
            );
          }
        }
      }
    } catch (error) {
      return next(error);
    }
  }

  /**
   * @swagger
   * /admin/addCoinFee:
   *   post:
   *     tags:
   *       - FEE MANAGEMENT
   *     description: feeUpdate
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: token
   *         description: token
   *         in: header
   *         required: true
   *       - name: feeId
   *         description: feeId
   *         in: query
   *         required: true
   *       - name: coinName
   *         description: coinName
   *         in: query
   *         required: false
   *       - name: amount
   *         description: amount
   *         type: number
   *         in: query
   *         required: true
   *     responses:
   *       200:
   *         description: Returns success message
   */
  async addCoinFee(req, res, next) {
    const validationSchema = {
      feeId: Joi.string().required(),
      coinName: Joi.string().required(),
      amount: Joi.string().required(),
    };
    try {
      const validatedBody = await Joi.validate(req.query, validationSchema);
      let adminResult = await findUser({
        _id: req.userId,
        status: { $ne: status.DELETE },
        userType: { $in: [userType.ADMIN, userType.SUBADMIN] },
      });
      if (!adminResult) {
        throw apiError.unauthorized(responseMessage.UNAUTHORIZED);
      } else {
        let resultRes = await findFee({
          _id: validatedBody.feeId,
          status: { $ne: status.DELETE },
        });
        if (!resultRes) {
          throw apiError.notFound(responseMessage.DATA_NOT_FOUND);
        } else {
          let updateRes;
          if (validatedBody.coinName) {
            updateRes = await updateFee(
              { _id: resultRes._id },
              {
                $addToSet: {
                  coins: {
                    coinName: validatedBody.coinName,
                    fee: validatedBody.amount,
                  },
                },
              }
            );
          }
          return res.json(new response(updateRes, responseMessage.DATA_FOUND));
        }
      }
    } catch (error) {
      return next(error);
    }
  }

  /**
   * @swagger
   * /admin/feeList:
   *   get:
   *     tags:
   *       - FEE MANAGEMENT
   *     description: feeList
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: Returns success message
   */
  async feeList(req, res, next) {
    try {
      let resultRes = await feeList({ status: status.ACTIVE });
      if (resultRes.length == 0) {
        throw apiError.notFound(responseMessage.DATA_NOT_FOUND);
      } else {
        return res.json(new response(resultRes, responseMessage.DATA_FOUND));
      }
    } catch (error) {
      return next(error);
    }
  }

  /**
   * @swagger
   * /admin/feeView:
   *   get:
   *     tags:
   *       - FEE MANAGEMENT
   *     description: feeView
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: feeId
   *         description: feeId
   *         in: query
   *         required: true
   *     responses:
   *       200:
   *         description: Returns success message
   */
  async feeView(req, res, next) {
    const validationSchema = {
      feeId: Joi.string().required(),
    };
    try {
      const validatedBody = await Joi.validate(req.query, validationSchema);

      let resultRes = await findFee({
        _id: validatedBody.feeId,
        status: { $ne: status.DELETE },
      });
      if (!resultRes) {
        throw apiError.notFound(responseMessage.DATA_NOT_FOUND);
      } else {
        return res.json(new response(resultRes, responseMessage.DATA_FOUND));
      }
    } catch (error) {
      return next(error);
    }
  }

  /**
   * @swagger
   * /admin/feeUpdate:
   *   put:
   *     tags:
   *       - FEE MANAGEMENT
   *     description: feeUpdate
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: token
   *         description: token
   *         in: header
   *         required: true
   *       - name: feeId
   *         description: feeId
   *         in: query
   *         required: true
   *       - name: coinName
   *         description: coinName
   *         in: query
   *         required: false
   *       - name: amount
   *         description: amount
   *         type: number
   *         in: query
   *         required: true
   *     responses:
   *       200:
   *         description: Returns success message
   */
  async feeUpdate(req, res, next) {
    const validationSchema = {
      feeId: Joi.string().required(),
      amount: Joi.string().allow("").optional(),
    };
    try {
      const validatedBody = await Joi.validate(req.body, validationSchema);
      let adminResult = await findUser({
        _id: req.userId,
        status: { $ne: status.DELETE },
        userType: { $in: [userType.ADMIN, userType.SUBADMIN] },
      });
      if (!adminResult) {
        throw apiError.unauthorized(responseMessage.UNAUTHORIZED);
      } else {
        let resultRes = await findFee({
          _id: validatedBody.feeId,
          status: { $ne: status.DELETE },
        });
        if (!resultRes) {
          throw apiError.notFound(responseMessage.DATA_NOT_FOUND);
        } else {
          let updateRes;
          updateRes = await updateFee(
            { _id: resultRes._id },
            { amount: validatedBody.amount }
          );
          return res.json(new response(updateRes, responseMessage.FEE_UPDATE));
        }
      }
    } catch (error) {
      return next(error);
    }
  }

  /**
   * @swagger
   * /admin/listUser:
   *   get:
   *     tags:
   *       - ADMIN
   *     description: listUser
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
   *       - name: statusType
   *         description: statusType (ACTIVE , BLOCK)
   *         in: query
   *         required: false
   *     responses:
   *       200:
   *         description: Returns success message
   */
  async listPaginateUser(req, res, next) {
    const validationSchema = {
      search: Joi.string().optional(),
      fromDate: Joi.string().optional(),
      toDate: Joi.string().optional(),
      page: Joi.string().optional(),
      limit: Joi.string().optional(),
      statusType: Joi.string().optional(),
    };
    try {
      const validatedBody = await Joi.validate(req.query, validationSchema);
      let adminResult = await findUser({
        _id: req.userId,
        status: { $ne: status.DELETE },
        userType: { $in: [userType.ADMIN] },
      });
      if (!adminResult) {
        throw apiError.unauthorized(responseMessage.UNAUTHORIZED);
      }
      validatedBody.userType = userType.USER;
      let data = await paginateSearchByAdmin(validatedBody);
      if (data.docs.length == 0) {
        throw apiError.notFound(responseMessage.DATA_NOT_FOUND);
      } else {
        return res.json(new response(data, responseMessage.DATA_FOUND));
      }
    } catch (error) {
      return next(error);
    }
  }

  //list All users
  async listAllUser(req, res, next) {
    try {
      let adminResult = await findUser({
        _id: req.userId,
        status: { $ne: status.DELETE },
        userType: { $in: [userType.ADMIN] },
      });
      if (!adminResult) {
        throw apiError.unauthorized(responseMessage.UNAUTHORIZED);
      }
      let data = await listAllUsers();
      if (data.length == 0) {
        throw apiError.notFound(responseMessage.DATA_NOT_FOUND);
      } else {
        return res.json(new response(data, responseMessage.DATA_FOUND));
      }
    } catch (error) {
      return next(error);
    }
  }

  /**
   * @swagger
   * /admin/requestView:
   *   get:
   *     tags:
   *       - ADMIN
   *     description: requestView
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: token
   *         description: token
   *         in: header
   *         required: true
   *       - name: requestId
   *         description: requestId
   *         in: query
   *         required: true
   *     responses:
   *       200:
   *         description: Returns success message
   */
  async requestView(req, res, next) {
    try {
      let adminResult = await findUser({
        _id: req.userId,
        status: { $ne: status.DELETE },
        userType: { $in: [userType.ADMIN] },
      });
      if (!adminResult) {
        throw apiError.unauthorized(responseMessage.UNAUTHORIZED);
      } else {
        let resultRes = await findRequest({
          _id: req.query.requestId,
          status: { $ne: status.DELETE },
        });
        if (!resultRes) {
          throw apiError.notFound(responseMessage.DATA_NOT_FOUND);
        } else {
          return res.json(new response(resultRes, responseMessage.DATA_FOUND));
        }
      }
    } catch (error) {
      return next(error);
    }
  }
  /**
   * @swagger
   * /admin/postRequestView:
   *   get:
   *     tags:
   *       - ADMIN
   *     description: postRequestView
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: token
   *         description: token
   *         in: header
   *         required: true
   *       - name: postRequestId
   *         description: postRequestId
   *         in: query
   *         required: true
   *     responses:
   *       200:
   *         description: Returns success message
   */
  async postRequestView(req, res, next) {
    const validationSchema = {
      postRequestId: Joi.string().required(),
    };
    try {
      const validatedBody = await Joi.validate(req.query, validationSchema);
      let adminResult = await findUser({
        _id: req.userId,
        status: { $ne: status.DELETE },
        userType: { $in: [userType.ADMIN] },
      });
      if (!adminResult) {
        throw apiError.unauthorized(responseMessage.UNAUTHORIZED);
      } else {
        let resultRes = await findPostRequest({
          _id: validatedBody.postRequestId,
          status: { $ne: status.DELETE },
        });
        if (!resultRes) {
          throw apiError.notFound(responseMessage.DATA_NOT_FOUND);
        } else {
          return res.json(new response(resultRes, responseMessage.DATA_FOUND));
        }
      }
    } catch (error) {
      return next(error);
    }
  }

  async postRequestDetails(req, res, next) {
    const validationSchema = {
      postRequestId: Joi.string().required(),
    };
    try {
      const validatedBody = await Joi.validate(req.query, validationSchema);
      let adminResult = await findUser({
        _id: req.userId,
        status: { $ne: status.DELETE },
        userType: { $in: [userType.ADMIN] },
      });
      if (!adminResult) {
        throw apiError.unauthorized(responseMessage.UNAUTHORIZED);
      } else {
        let resultRes = await viewRequestDetails({
          _id: validatedBody.postRequestId,
          status: { $ne: status.DELETE },
        });
        if (!resultRes) {
          throw apiError.notFound(responseMessage.DATA_NOT_FOUND);
        } else {
          return res.json(new response(resultRes, responseMessage.DATA_FOUND));
        }
      }
    } catch (error) {
      return next(error);
    }
  }

  /**
   * @swagger
   * /admin/requestList:
   *   get:
   *     tags:
   *       - ADMIN
   *     description: requestList
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
  async requestList(req, res, next) {
    try {
      let adminResult = await findUser({
        _id: req.userId,
        status: { $ne: status.DELETE },
        userType: { $in: [userType.ADMIN, userType.SUBADMIN] },
      });
      if (!adminResult) {
        throw apiError.unauthorized(responseMessage.UNAUTHORIZED);
      } else {
        let resultRes = await requestList({ status: { $ne: status.DELETE } });
        if (resultRes.length == 0) {
          throw apiError.notFound(responseMessage.DATA_NOT_FOUND);
        } else {
          return res.json(new response(resultRes, responseMessage.DATA_FOUND));
        }
      }
    } catch (error) {
      return next(error);
    }
  }
  /**
   * @swagger
   * /admin/postRequestList:
   *   get:
   *     tags:
   *       - ADMIN
   *     description: postRequestList
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
  async postRequestList(req, res, next) {
    try {
      let adminResult = await findUser({
        _id: req.userId,
        status: { $ne: status.DELETE },
        userType: { $in: [userType.ADMIN] },
      });
      if (!adminResult) {
        throw apiError.unauthorized(responseMessage.UNAUTHORIZED);
      } else {
        let resultRes = await postRequestList({
          status: { $ne: status.DELETE },
        });
        if (resultRes.length == 0) {
          throw apiError.notFound(responseMessage.DATA_NOT_FOUND);
        } else {
          return res.json(new response(resultRes, responseMessage.DATA_FOUND));
        }
      }
    } catch (error) {
      return next(error);
    }
  }

  async postRequestUpdate(req, res, next) {
    const validationSchema = {
      postRequestId: Joi.string().required(),
      status: Joi.string().required(),
    };
    try {
      const validatedBody = await Joi.validate(req.body, validationSchema);
      let adminResult = await findUser({
        _id: req.userId,
        status: { $ne: status.DELETE },
        userType: { $in: [userType.ADMIN] },
      });
      if (!adminResult) {
        throw apiError.unauthorized(responseMessage.UNAUTHORIZED);
      } else {
        let reqRes = await findPostRequest({
          _id: validatedBody.postRequestId,
          status: { $ne: status.DELETE },
        });
        if (!reqRes) {
          throw apiError.notFound(responseMessage.DATA_NOT_FOUND);
        } else {
          let postRes = await findOnePost({
            _id: reqRes.postId,
            status: { $ne: status.DELETE },
          });

          if (!postRes) {
            throw apiError.notFound(responseMessage.DATA_NOT_FOUND);
          } else {
            if (validatedBody.status === "ACTIVE") {
              postRes = await updatePost(
                { _id: reqRes.postId },
                { status: status.ACTIVE }
              );
              reqRes = await updatePostRequestById(
                { _id: validatedBody.postRequestId },
                { status: status.APPROVED }
              );
            } else {
              postRes = await updatePost(
                { _id: reqRes.postId },
                { status: status.BLOCK }
              );

              reqRes = await updatePostRequestById(
                { _id: validatedBody.postRequestId },
                { status: status.REGECTED }
              );
            }
            return res.json(
              new response(
                { postRes, reqRes },
                responseMessage.POST_REQUEST_UPDATED
              )
            );
          }
        }
      }
    } catch (error) {
      return next(error);
    }
  }

  //////////product Requests ///////////////
  /**
   * @swagger
   * /admin/productRequestView:
   *   get:
   *     tags:
   *       - ADMIN
   *     description: productRequestView
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: token
   *         description: token
   *         in: header
   *         required: true
   *       - name: productRequestId
   *         description: productRequestId
   *         in: query
   *         required: true
   *     responses:
   *       200:
   *         description: Returns success message
   */
  async productRequestView(req, res, next) {
    const validationSchema = {
      productRequestId: Joi.string().required(),
    };
    try {
      const validatedBody = await Joi.validate(req.query, validationSchema);

      let adminResult = await findUser({
        _id: req.userId,
        status: { $ne: status.DELETE },
        userType: { $in: [userType.ADMIN] },
      });
      if (!adminResult) {
        throw apiError.unauthorized(responseMessage.UNAUTHORIZED);
      } else {
        let resultRes = await findProductRequest({
          _id: validatedBody.productRequestId,
          status: { $ne: status.DELETE },
        });
        if (!resultRes) {
          throw apiError.notFound(responseMessage.DATA_NOT_FOUND);
        } else {
          return res.json(new response(resultRes, responseMessage.DATA_FOUND));
        }
      }
    } catch (error) {
      return next(error);
    }
  }

  // product request details shows user and the product details
  async productRequestDetails(req, res, next) {
    try {
      let adminResult = await findUser({
        _id: req.userId,
        status: { $ne: status.DELETE },
        userType: { $in: [userType.ADMIN] },
      });
      if (!adminResult) {
        throw apiError.unauthorized(responseMessage.UNAUTHORIZED);
      } else {
        let resultRes = await viewProductRequestDetails({
          _id: req.query.productRequestId,
          status: { $ne: status.DELETE },
        });
        if (!resultRes) {
          throw apiError.notFound(responseMessage.DATA_NOT_FOUND);
        } else {
          return res.json(new response(resultRes, responseMessage.DATA_FOUND));
        }
      }
    } catch (error) {
      return next(error);
    }
  }

  /**
   * @swagger
   * /admin/productRequestList:
   *   get:
   *     tags:
   *       - ADMIN
   *     description: productRequestList
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
  async productRequestList(req, res, next) {
    try {
      let adminResult = await findUser({
        _id: req.userId,
        status: { $ne: status.DELETE },
        userType: { $in: [userType.ADMIN] },
      });
      if (!adminResult) {
        throw apiError.unauthorized(responseMessage.UNAUTHORIZED);
      } else {
        let resultRes = await productRequestList({
          status: { $ne: status.DELETE },
        });
        if (resultRes.length == 0) {
          throw apiError.notFound(responseMessage.DATA_NOT_FOUND);
        } else {
          return res.json(new response(resultRes, responseMessage.DATA_FOUND));
        }
      }
    } catch (error) {
      return next(error);
    }
  }

  /**
   * @swagger
   * /admin/productRequestUpdate:
   *   get:
   *     tags:
   *       - ADMIN
   *     description: productRequestUpdate
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

  async productRequestUpdate(req, res, next) {
    const validationSchema = {
      productRequestId: Joi.string().required(),
      status: Joi.string().required(),
    };
    try {
      const validatedBody = await Joi.validate(req.body, validationSchema);
      let adminResult = await findUser({
        _id: req.userId,
        status: { $ne: status.DELETE },
        userType: { $in: [userType.ADMIN] },
      });
      if (!adminResult) {
        throw apiError.unauthorized(responseMessage.UNAUTHORIZED);
      } else {
        let reqRes = await findProductRequest({
          _id: validatedBody.productRequestId,
          status: { $ne: status.DELETE },
        });
        if (!reqRes) {
          throw apiError.notFound(responseMessage.DATA_NOT_FOUND);
        } else {
          let productRes = await findOneProduct({
            _id: reqRes.productId,
            status: { $ne: status.DELETE },
          });

          if (!productRes) {
            throw apiError.notFound(responseMessage.DATA_NOT_FOUND);
          } else {
            if (validatedBody.status === "ACTIVE") {
              productRes = await updateProduct(
                { _id: reqRes.productId },
                { status: status.ACTIVE }
              );
              reqRes = await updateProductRequestById(
                { _id: validatedBody.productRequestId },
                { status: status.APPROVED }
              );
            } else {
              productRes = await updateProduct(
                { _id: reqRes.productId },
                { status: status.BLOCK }
              );

              reqRes = await updateProductRequestById(
                { _id: validatedBody.productRequestId },
                { status: status.REGECTED }
              );
            }
            return res.json(
              new response(
                { productRes, reqRes },
                responseMessage.PRODUCT_REQUEST_UPDATED
              )
            );
          }
        }
      }
    } catch (error) {
      return next(error);
    }
  }

  ///////////////////////////////
  //////////Service Requests ///////////////
  /**
   * @swagger
   * /admin/serviceRequestView:
   *   get:
   *     tags:
   *       - ADMIN
   *     description: serviceRequestView
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: token
   *         description: token
   *         in: header
   *         required: true
   *       - name: serviceRequestId
   *         description: serviceRequestId
   *         in: query
   *         required: true
   *     responses:
   *       200:
   *         description: Returns success message
   */
  async serviceRequestView(req, res, next) {
    const validationSchema = {
      serviceRequestId: Joi.string().required(),
    };
    try {
      const validatedBody = await Joi.validate(req.body, validationSchema);
      let adminResult = await findUser({
        _id: req.userId,
        status: { $ne: status.DELETE },
        userType: { $in: [userType.ADMIN] },
      });
      if (!adminResult) {
        throw apiError.unauthorized(responseMessage.UNAUTHORIZED);
      } else {
        let resultRes = await findServiceRequest({
          _id: validatedBody.serviceRequestId,
          status: { $ne: status.DELETE },
        });
        if (!resultRes) {
          throw apiError.notFound(responseMessage.DATA_NOT_FOUND);
        } else {
          return res.json(new response(resultRes, responseMessage.DATA_FOUND));
        }
      }
    } catch (error) {
      return next(error);
    }
  }

  // service request details shows user and the product details
  async serviceRequestDetails(req, res, next) {
    const validationSchema = {
      serviceRequestId: Joi.string().required(),
    };
    try {
      const validatedBody = await Joi.validate(req.body, validationSchema);
      let adminResult = await findUser({
        _id: req.userId,
        status: { $ne: status.DELETE },
        userType: { $in: [userType.ADMIN] },
      });
      if (!adminResult) {
        throw apiError.unauthorized(responseMessage.UNAUTHORIZED);
      } else {
        let resultRes = await viewServiceRequestDetails({
          _id: validatedBody.serviceRequestId,
          status: { $ne: status.DELETE },
        });
        if (!resultRes) {
          throw apiError.notFound(responseMessage.DATA_NOT_FOUND);
        } else {
          return res.json(new response(resultRes, responseMessage.DATA_FOUND));
        }
      }
    } catch (error) {
      return next(error);
    }
  }

  /**
   * @swagger
   * /admin/serviceRequestList:
   *   get:
   *     tags:
   *       - ADMIN
   *     description: serviceRequestList
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
  async serviceRequestList(req, res, next) {
    try {
      let adminResult = await findUser({
        _id: req.userId,
        status: { $ne: status.DELETE },
        userType: { $in: [userType.ADMIN] },
      });
      if (!adminResult) {
        throw apiError.unauthorized(responseMessage.UNAUTHORIZED);
      } else {
        let resultRes = await serviceRequestList({
          status: { $ne: status.DELETE },
        });
        if (resultRes.length == 0) {
          throw apiError.notFound(responseMessage.DATA_NOT_FOUND);
        } else {
          return res.json(new response(resultRes, responseMessage.DATA_FOUND));
        }
      }
    } catch (error) {
      return next(error);
    }
  }

  /**
   * @swagger
   * /admin/serviceRequestUpdate:
   *   get:
   *     tags:
   *       - ADMIN
   *     description: serviceRequestUpdate
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

  async serviceRequestUpdate(req, res, next) {
    const validationSchema = {
      serviceRequestId: Joi.string().required(),
      status: Joi.string().required(),
    };
    try {
      const validatedBody = await Joi.validate(req.body, validationSchema);
      let adminResult = await findUser({
        _id: req.userId,
        status: { $ne: status.DELETE },
        userType: { $in: [userType.ADMIN] },
      });
      if (!adminResult) {
        throw apiError.unauthorized(responseMessage.UNAUTHORIZED);
      } else {
        let reqRes = await findServiceRequest({
          _id: validatedBody.serviceRequestId,
          status: { $ne: status.DELETE },
        });
        if (!reqRes) {
          throw apiError.notFound(responseMessage.DATA_NOT_FOUND);
        } else {
          console.log("reqRes: ", reqRes);
          let serviceRes = await findOneService({
            _id: reqRes.serviceId,
            status: { $ne: status.DELETE },
          });

          if (!serviceRes) {
            throw apiError.notFound(responseMessage.DATA_NOT_FOUND);
          } else {
            if (validatedBody.status === "ACTIVE") {
              serviceRes = await updateService(
                { _id: reqRes.serviceId },
                { status: status.ACTIVE }
              );
              reqRes = await updateServiceRequestById(
                { _id: validatedBody.serviceRequestId },
                { status: status.APPROVED }
              );
            } else {
              serviceRes = await updateService(
                { _id: reqRes.serviceId },
                { status: status.BLOCK }
              );

              reqRes = await updateServiceRequestById(
                { _id: validatedBody.serviceRequestId },
                { status: status.REGECTED }
              );
            }
            return res.json(
              new response(
                { serviceRes, reqRes },
                responseMessage.SERVICE_REQUEST_UPDATED
              )
            );
          }
        }
      }
    } catch (error) {
      return next(error);
    }
  }
  //////////Job Requests ///////////////
  /**
   * @swagger
   * /admin/jobRequestView:
   *   get:
   *     tags:
   *       - ADMIN
   *     description: jobRequestView
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: token
   *         description: token
   *         in: header
   *         required: true
   *       - name: jobRequestId
   *         description: jobRequestId
   *         in: query
   *         required: true
   *     responses:
   *       200:
   *         description: Returns success message
   */
  async jobRequestView(req, res, next) {
    const validationSchema = {
      jobRequestId: Joi.string().required(),
    };
    try {
      const validatedBody = await Joi.validate(req.query, validationSchema);

      let adminResult = await findUser({
        _id: req.userId,
        status: { $ne: status.DELETE },
        userType: { $in: [userType.ADMIN] },
      });
      if (!adminResult) {
        throw apiError.unauthorized(responseMessage.UNAUTHORIZED);
      } else {
        let resultRes = await findJobRequest({
          _id: validatedBody.jobRequestId,
          status: { $ne: status.DELETE },
        });
        if (!resultRes) {
          throw apiError.notFound(responseMessage.DATA_NOT_FOUND);
        } else {
          return res.json(new response(resultRes, responseMessage.DATA_FOUND));
        }
      }
    } catch (error) {
      return next(error);
    }
  }

  // job request details shows user and the product details
  async jobRequestDetails(req, res, next) {
    const validationSchema = {
      jobRequestId: Joi.string().required(),
    };
    try {
      const validatedBody = await Joi.validate(req.query, validationSchema);

      let adminResult = await findUser({
        _id: req.userId,
        status: { $ne: status.DELETE },
        userType: { $in: [userType.ADMIN] },
      });
      if (!adminResult) {
        throw apiError.unauthorized(responseMessage.UNAUTHORIZED);
      } else {
        let resultRes = await viewJobRequestDetails({
          _id: validatedBody.jobRequestId,
          status: { $ne: status.DELETE },
        });
        if (!resultRes) {
          throw apiError.notFound(responseMessage.DATA_NOT_FOUND);
        } else {
          return res.json(new response(resultRes, responseMessage.DATA_FOUND));
        }
      }
    } catch (error) {
      return next(error);
    }
  }

  /**
   * @swagger
   * /admin/jobRequestList:
   *   get:
   *     tags:
   *       - ADMIN
   *     description: jobRequestList
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
  async jobRequestList(req, res, next) {
    try {
      let adminResult = await findUser({
        _id: req.userId,
        status: { $ne: status.DELETE },
        userType: { $in: [userType.ADMIN] },
      });
      if (!adminResult) {
        throw apiError.unauthorized(responseMessage.UNAUTHORIZED);
      } else {
        let resultRes = await jobRequestList({
          status: { $ne: status.DELETE },
        });
        if (resultRes.length == 0) {
          throw apiError.notFound(responseMessage.DATA_NOT_FOUND);
        } else {
          return res.json(new response(resultRes, responseMessage.DATA_FOUND));
        }
      }
    } catch (error) {
      return next(error);
    }
  }

  /**
   * @swagger
   * /admin/jobRequestUpdate:
   *   get:
   *     tags:
   *       - ADMIN
   *     description: jobRequestUpdate
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

  async jobRequestUpdate(req, res, next) {
    const validationSchema = {
      jobRequestId: Joi.string().required(),
      status: Joi.string().required(),
    };
    try {
      const validatedBody = await Joi.validate(req.body, validationSchema);
      let adminResult = await findUser({
        _id: req.userId,
        status: { $ne: status.DELETE },
        userType: { $in: [userType.ADMIN] },
      });
      if (!adminResult) {
        throw apiError.unauthorized(responseMessage.UNAUTHORIZED);
      } else {
        let reqRes = await findJobRequest({
          _id: validatedBody.jobRequestId,
          status: { $ne: status.DELETE },
        });
        if (!reqRes) {
          throw apiError.notFound(responseMessage.DATA_NOT_FOUND);
        } else {
          let jobRes = await findOneJob({
            _id: reqRes.jobId,
            status: { $ne: status.DELETE },
          });

          if (!jobRes) {
            throw apiError.notFound(responseMessage.DATA_NOT_FOUND);
          } else {
            if (validatedBody.status === "ACTIVE") {
              jobRes = await updateJob(
                { _id: reqRes.jobId },
                { status: status.ACTIVE }
              );
              reqRes = await updateJobRequestById(
                { _id: validatedBody.jobRequestId },
                { status: status.APPROVED }
              );
            } else {
              jobRes = await updateJob(
                { _id: reqRes.jobId },
                { status: status.BLOCK }
              );

              reqRes = await updateJobRequestById(
                { _id: validatedBody.jobRequestId },
                { status: status.REGECTED }
              );
            }
            return res.json(
              new response(
                { jobRes, reqRes },
                responseMessage.JOB_REQUEST_UPDATED
              )
            );
          }
        }
      }
    } catch (error) {
      return next(error);
    }
  }

  //////////Project Requests ///////////////
  /**
   * @swagger
   * /admin/projectRequestView:
   *   get:
   *     tags:
   *       - ADMIN
   *     description: projectRequestView
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: token
   *         description: token
   *         in: header
   *         required: true
   *       - name: projectRequestId
   *         description: projectRequestId
   *         in: query
   *         required: true
   *     responses:
   *       200:
   *         description: Returns success message
   */
  async projectRequestView(req, res, next) {
    const validationSchema = {
      projectRequestId: Joi.string().required(),
    };
    try {
      const validatedBody = await Joi.validate(req.query, validationSchema);
      let adminResult = await findUser({
        _id: req.userId,
        status: { $ne: status.DELETE },
        userType: { $in: [userType.ADMIN] },
      });
      if (!adminResult) {
        throw apiError.unauthorized(responseMessage.UNAUTHORIZED);
      } else {
        let resultRes = await findProjectRequest({
          _id: validatedBody.projectRequestId,
          status: { $ne: status.DELETE },
        });
        if (!resultRes) {
          throw apiError.notFound(responseMessage.DATA_NOT_FOUND);
        } else {
          return res.json(new response(resultRes, responseMessage.DATA_FOUND));
        }
      }
    } catch (error) {
      return next(error);
    }
  }

  // Project request details shows user and the project details
  async projectRequestDetails(req, res, next) {
    const validationSchema = {
      projectRequestId: Joi.string().required(),
    };
    try {
      const validatedBody = await Joi.validate(req.query, validationSchema);
      let adminResult = await findUser({
        _id: req.userId,
        status: { $ne: status.DELETE },
        userType: { $in: [userType.ADMIN] },
      });
      if (!adminResult) {
        throw apiError.unauthorized(responseMessage.UNAUTHORIZED);
      } else {
        let resultRes = await viewProjectRequestDetails({
          _id: validatedBody.projectRequestId,
          status: { $ne: status.DELETE },
        });
        if (!resultRes) {
          throw apiError.notFound(responseMessage.DATA_NOT_FOUND);
        } else {
          return res.json(new response(resultRes, responseMessage.DATA_FOUND));
        }
      }
    } catch (error) {
      return next(error);
    }
  }

  /**
   * @swagger
   * /admin/projectRequestList:
   *   get:
   *     tags:
   *       - ADMIN
   *     description: projectRequestList
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
  async projectRequestList(req, res, next) {
    try {
      let adminResult = await findUser({
        _id: req.userId,
        status: { $ne: status.DELETE },
        userType: { $in: [userType.ADMIN] },
      });
      if (!adminResult) {
        throw apiError.unauthorized(responseMessage.UNAUTHORIZED);
      } else {
        let resultRes = await projectRequestList({
          status: { $ne: status.DELETE },
        });
        if (resultRes.length == 0) {
          throw apiError.notFound(responseMessage.DATA_NOT_FOUND);
        } else {
          return res.json(new response(resultRes, responseMessage.DATA_FOUND));
        }
      }
    } catch (error) {
      return next(error);
    }
  }

  /**
   * @swagger
   * /admin/projectRequestUpdate:
   *   get:
   *     tags:
   *       - ADMIN
   *     description: projectRequestUpdate
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

  async projectRequestUpdate(req, res, next) {
    const validationSchema = {
      projectRequestId: Joi.string().required(),
      status: Joi.string().required(),
    };
    try {
      const validatedBody = await Joi.validate(req.body, validationSchema);
      let adminResult = await findUser({
        _id: req.userId,
        status: { $ne: status.DELETE },
        userType: { $in: [userType.ADMIN] },
      });
      if (!adminResult) {
        throw apiError.unauthorized(responseMessage.UNAUTHORIZED);
      } else {
        let reqRes = await findProjectRequest({
          _id: validatedBody.projectRequestId,
          status: { $ne: status.DELETE },
        });
        if (!reqRes) {
          throw apiError.notFound(responseMessage.DATA_NOT_FOUND);
        } else {
          let projectRes = await findOneProject({
            _id: reqRes.projectId,
            status: { $ne: status.DELETE },
          });

          if (!projectRes) {
            throw apiError.notFound(responseMessage.DATA_NOT_FOUND);
          } else {
            if (validatedBody.status === "ACTIVE") {
              projectRes = await updateProject(
                { _id: reqRes.projectId },
                { status: status.ACTIVE }
              );
              reqRes = await updateProjectRequestById(
                { _id: validatedBody.projectRequestId },
                { status: status.APPROVED }
              );
            } else {
              projectRes = await updateProject(
                { _id: reqRes.projectId },
                { status: status.BLOCK }
              );

              reqRes = await updateProjectRequestById(
                { _id: validatedBody.projectRequestId },
                { status: status.REGECTED }
              );
            }
            return res.json(
              new response(
                { projectRes, reqRes },
                responseMessage.PROJECT_REQUEST_UPDATED
              )
            );
          }
        }
      }
    } catch (error) {
      return next(error);
    }
  }

  ///////////////////////////////

  /**
   * @swagger
   * /admin/postList:
   *   get:
   *     tags:
   *       - ADMIN
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
   *       - name: limit
   *         description: limit
   *         in: query
   *         required: false
   *       - name: postType
   *         description: postType ("PRIVATE", "PUBLIC")
   *         in: query
   *         required: false
   *     responses:
   *       200:
   *         description: Returns success message
   */
  async postList(req, res, next) {
    const validationSchema = {
      search: Joi.string().optional(),
      fromDate: Joi.string().optional(),
      toDate: Joi.string().optional(),
      page: Joi.string().optional(),
      limit: Joi.string().optional(),
      postType: Joi.string().optional(),
    };
    try {
      const validatedBody = await Joi.validate(req.query, validationSchema);
      let adminResult = await findUser({
        _id: req.userId,
        status: { $ne: status.DELETE },
        userType: { $in: [userType.ADMIN, userType.SUBADMIN] },
      });
      if (!adminResult) {
        throw apiError.unauthorized(responseMessage.UNAUTHORIZED);
      }
      let data = await paginatePostSearchByAdmin(validatedBody);
      if (data.docs.length == 0) {
        throw apiError.notFound(responseMessage.DATA_NOT_FOUND);
      } else {
        return res.json(new response(data, responseMessage.DATA_FOUND));
      }
    } catch (error) {
      return next(error);
    }
  }

  //post management APIs
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
  async allPostList(req, res, next) {
    try {
      let adminResult = await findUser({
        _id: req.userId,
        status: { $ne: status.DELETE },
        userType: { $in: [userType.ADMIN, userType.SUBADMIN] },
      });
      if (!adminResult) {
        throw apiError.unauthorized(responseMessage.UNAUTHORIZED);
      }
      let data = await listPost({
        status: { $ne: status.DELETE },
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
  /**
   * @swagger
   * /admin/postView:
   *   get:
   *     tags:
   *       - ADMIN
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
  async postView(req, res, next) {
    const validationSchema = {
      postId: Joi.string().required(),
    };
    try {
      const validatedBody = await Joi.validate(req.query, validationSchema);
      let adminResult = await findUser({
        _id: req.userId,
        status: { $ne: status.DELETE },
        userType: { $in: [userType.ADMIN, userType.SUBADMIN] },
      });
      if (!adminResult) {
        throw apiError.unauthorized(responseMessage.UNAUTHORIZED);
      }
      let data = await findOnePost({
        _id: validatedBody.postId,
        status: { $ne: status.DELETE },
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

  /**
   * @swagger
   * /admin/deletePost:
   *   delete:
   *     tags:
   *       - ADMIN
   *     description: deletePost
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
  async deletePost(req, res, next) {
    const validationSchema = {
      postId: Joi.string().required(),
    };
    try {
      const validatedBody = await Joi.validate(req.query, validationSchema);
      let adminResult = await findUser({
        _id: req.userId,
        status: { $ne: status.DELETE },
        userType: { $in: [userType.ADMIN, userType.SUBADMIN] },
      });
      if (!adminResult) {
        throw apiError.unauthorized(responseMessage.UNAUTHORIZED);
      }
      let data = await findOnePost({
        _id: validatedBody.postId,
        status: { $ne: status.DELETE },
      });
      if (!data) {
        throw apiError.notFound(responseMessage.DATA_NOT_FOUND);
      } else {
        // await updateManyReport({ postId: data._id }, { status: status.DELETE });
        let updateRes = await updatePost(
          { _id: data._id },
          { status: status.DELETE }
        );
        return res.json(new response(updateRes, responseMessage.POST_DELETED));
      }
    } catch (error) {
      return next(error);
    }
  }

  /**
   * @swagger
   * /admin/ignorePost:
   *   delete:
   *     tags:
   *       - ADMIN
   *     description: ignorePost
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
  async ignorePost(req, res, next) {
    const validationSchema = {
      postId: Joi.string().required(),
    };
    try {
      const validatedBody = await Joi.validate(req.query, validationSchema);
      let adminResult = await findUser({
        _id: req.userId,
        status: { $ne: status.DELETE },
        userType: { $in: [userType.ADMIN, userType.SUBADMIN] },
      });
      if (!adminResult) {
        throw apiError.unauthorized(responseMessage.UNAUTHORIZED);
      }
      let data = await findOnePost({
        _id: validatedBody.postId,
        status: { $ne: status.DELETE },
      });
      if (!data) {
        throw apiError.notFound(responseMessage.DATA_NOT_FOUND);
      } else {
        // await updateManyReport({ postId: data._id }, { status: status.DELETE });
        let updateRes = await updatePost(
          { _id: data._id },
          { $set: { reportedId: [] } }
        );
        return res.json(new response(updateRes, responseMessage.DATA_FOUND));
      }
    } catch (error) {
      return next(error);
    }
  }
  //Project management APIs
  /**
   * @swagger
   * /admin/allProjectList:
   *   get:
   *     tags:
   *       - ADMIN
   *     description: allProjectList
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
  async allProjectList(req, res, next) {
    try {
      let adminResult = await findUser({
        _id: req.userId,
        status: { $ne: status.DELETE },
        userType: { $in: [userType.ADMIN, userType.SUBADMIN] },
      });
      if (!adminResult) {
        throw apiError.unauthorized(responseMessage.UNAUTHORIZED);
      }
      let data = await listProject({
        status: { $ne: status.DELETE },
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
  /**
   * @swagger
   * /admin/projectView:
   *   get:
   *     tags:
   *       - ADMIN
   *     description: projectView
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
  async projectView(req, res, next) {
    const validationSchema = {
      projectId: Joi.string().required(),
    };
    try {
      const validatedBody = await Joi.validate(req.query, validationSchema);
      let adminResult = await findUser({
        _id: req.userId,
        status: { $ne: status.DELETE },
        userType: { $in: [userType.ADMIN, userType.SUBADMIN] },
      });
      if (!adminResult) {
        throw apiError.unauthorized(responseMessage.UNAUTHORIZED);
      }
      let data = await findOneProject({
        _id: validatedBody.projectId,
        status: { $ne: status.DELETE },
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

  /**
   * @swagger
   * /admin/deleteProject:
   *   delete:
   *     tags:
   *       - ADMIN
   *     description: deleteProject
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
  async deleteProject(req, res, next) {
    const validationSchema = {
      projectId: Joi.string().required(),
    };
    try {
      const validatedBody = await Joi.validate(req.query, validationSchema);
      let adminResult = await findUser({
        _id: req.userId,
        status: { $ne: status.DELETE },
        userType: { $in: [userType.ADMIN, userType.SUBADMIN] },
      });
      if (!adminResult) {
        throw apiError.unauthorized(responseMessage.UNAUTHORIZED);
      }
      let data = await findOneProject({
        _id: validatedBody.projectId,
        status: { $ne: status.DELETE },
      });
      if (!data) {
        throw apiError.notFound(responseMessage.DATA_NOT_FOUND);
      } else {
        // await updateManyReport({ postId: data._id }, { status: status.DELETE });
        let updateRes = await updateProject(
          { _id: data._id },
          { status: status.DELETE }
        );
        return res.json(
          new response(updateRes, responseMessage.PROJECT_DELETE)
        );
      }
    } catch (error) {
      return next(error);
    }
  }

  /**
   * @swagger
   * /admin/ignoreProject:
   *   delete:
   *     tags:
   *       - ADMIN
   *     description: ignoreProject
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
  async ignoreProject(req, res, next) {
    const validationSchema = {
      projectId: Joi.string().required(),
    };
    try {
      const validatedBody = await Joi.validate(req.query, validationSchema);
      let adminResult = await findUser({
        _id: req.userId,
        status: { $ne: status.DELETE },
        userType: { $in: [userType.ADMIN, userType.SUBADMIN] },
      });
      if (!adminResult) {
        throw apiError.unauthorized(responseMessage.UNAUTHORIZED);
      }
      let data = await findOneProject({
        _id: validatedBody.projectId,
        status: { $ne: status.DELETE },
      });
      if (!data) {
        throw apiError.notFound(responseMessage.DATA_NOT_FOUND);
      } else {
        // await updateManyReport({ postId: data._id }, { status: status.DELETE });
        let updateRes = await updateProject(
          { _id: data._id },
          { $set: { reportedId: [] } }
        );
        return res.json(new response(updateRes, responseMessage.DATA_FOUND));
      }
    } catch (error) {
      return next(error);
    }
  }
  //Product management APIs
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
  async allProductList(req, res, next) {
    try {
      let adminResult = await findUser({
        _id: req.userId,
        status: { $ne: status.DELETE },
        userType: { $in: [userType.ADMIN, userType.SUBADMIN] },
      });
      if (!adminResult) {
        throw apiError.unauthorized(responseMessage.UNAUTHORIZED);
      }
      let data = await listProduct({
        status: { $ne: status.DELETE },
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
  /**
   * @swagger
   * /admin/productView:
   *   get:
   *     tags:
   *       - ADMIN
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
  async productView(req, res, next) {
    const validationSchema = {
      productId: Joi.string().required(),
    };
    try {
      const validatedBody = await Joi.validate(req.query, validationSchema);
      let adminResult = await findUser({
        _id: req.userId,
        status: { $ne: status.DELETE },
        userType: { $in: [userType.ADMIN, userType.SUBADMIN] },
      });
      if (!adminResult) {
        throw apiError.unauthorized(responseMessage.UNAUTHORIZED);
      }
      let data = await findOneProduct({
        _id: validatedBody.productId,
        status: { $ne: status.DELETE },
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

  /**
   * @swagger
   * /admin/deleteProduct:
   *   delete:
   *     tags:
   *       - ADMIN
   *     description: deleteProduct
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
  async deleteProduct(req, res, next) {
    const validationSchema = {
      productId: Joi.string().required(),
    };
    try {
      const validatedBody = await Joi.validate(req.query, validationSchema);
      let adminResult = await findUser({
        _id: req.userId,
        status: { $ne: status.DELETE },
        userType: { $in: [userType.ADMIN, userType.SUBADMIN] },
      });
      if (!adminResult) {
        throw apiError.unauthorized(responseMessage.UNAUTHORIZED);
      }
      let data = await findOneProduct({
        _id: validatedBody.productId,
        status: { $ne: status.DELETE },
      });
      if (!data) {
        throw apiError.notFound(responseMessage.DATA_NOT_FOUND);
      } else {
        // await updateManyReport({ postId: data._id }, { status: status.DELETE });
        let updateRes = await updateProduct(
          { _id: data._id },
          { status: status.DELETE }
        );
        return res.json(
          new response(updateRes, responseMessage.PRODUCT_DELETE)
        );
      }
    } catch (error) {
      return next(error);
    }
  }

  /**
   * @swagger
   * /admin/ignoreProduct:
   *   delete:
   *     tags:
   *       - ADMIN
   *     description: ignoreProduct
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
  async ignoreProduct(req, res, next) {
    const validationSchema = {
      productId: Joi.string().required(),
    };
    try {
      const validatedBody = await Joi.validate(req.query, validationSchema);
      let adminResult = await findUser({
        _id: req.userId,
        status: { $ne: status.DELETE },
        userType: { $in: [userType.ADMIN, userType.SUBADMIN] },
      });
      if (!adminResult) {
        throw apiError.unauthorized(responseMessage.UNAUTHORIZED);
      }
      let data = await findOneProduct({
        _id: validatedBody.productId,
        status: { $ne: status.DELETE },
      });
      if (!data) {
        throw apiError.notFound(responseMessage.DATA_NOT_FOUND);
      } else {
        // await updateManyReport({ postId: data._id }, { status: status.DELETE });
        let updateRes = await updateProduct(
          { _id: data._id },
          { $set: { reportedId: [] } }
        );
        return res.json(new response(updateRes, responseMessage.DATA_FOUND));
      }
    } catch (error) {
      return next(error);
    }
  }
  //Product management APIs
  /**
   * @swagger
   * /admin/allServiceList:
   *   get:
   *     tags:
   *       - ADMIN
   *     description: allServiceList
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
  async allServiceList(req, res, next) {
    try {
      let adminResult = await findUser({
        _id: req.userId,
        status: { $ne: status.DELETE },
        userType: { $in: [userType.ADMIN, userType.SUBADMIN] },
      });
      if (!adminResult) {
        throw apiError.unauthorized(responseMessage.UNAUTHORIZED);
      }
      let data = await listService({
        status: { $ne: status.DELETE },
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
  /**
   * @swagger
   * /admin/serviceView:
   *   get:
   *     tags:
   *       - ADMIN
   *     description: serviceView
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
  async serviceView(req, res, next) {
    const validationSchema = {
      serviceId: Joi.string().required(),
    };
    try {
      const validatedBody = await Joi.validate(req.query, validationSchema);
      let adminResult = await findUser({
        _id: req.userId,
        status: { $ne: status.DELETE },
        userType: { $in: [userType.ADMIN, userType.SUBADMIN] },
      });
      if (!adminResult) {
        throw apiError.unauthorized(responseMessage.UNAUTHORIZED);
      }
      let data = await findOneService({
        _id: validatedBody.serviceId,
        status: { $ne: status.DELETE },
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

  /**
   * @swagger
   * /admin/deleteService:
   *   delete:
   *     tags:
   *       - ADMIN
   *     description: deleteService
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
  async deleteService(req, res, next) {
    const validationSchema = {
      serviceId: Joi.string().required(),
    };
    try {
      const validatedBody = await Joi.validate(req.query, validationSchema);
      let adminResult = await findUser({
        _id: req.userId,
        status: { $ne: status.DELETE },
        userType: { $in: [userType.ADMIN, userType.SUBADMIN] },
      });
      if (!adminResult) {
        throw apiError.unauthorized(responseMessage.UNAUTHORIZED);
      }
      let data = await findOneService({
        _id: validatedBody.serviceId,
        status: { $ne: status.DELETE },
      });
      if (!data) {
        throw apiError.notFound(responseMessage.DATA_NOT_FOUND);
      } else {
        // await updateManyReport({ postId: data._id }, { status: status.DELETE });
        let updateRes = await updateService(
          { _id: data._id },
          { status: status.DELETE }
        );
        return res.json(
          new response(updateRes, responseMessage.SERVICE_DELETE)
        );
      }
    } catch (error) {
      return next(error);
    }
  }

  /**
   * @swagger
   * /admin/ignoreService:
   *   delete:
   *     tags:
   *       - ADMIN
   *     description: ignoreService
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
  async ignoreService(req, res, next) {
    const validationSchema = {
      serviceId: Joi.string().required(),
    };
    try {
      const validatedBody = await Joi.validate(req.query, validationSchema);
      let adminResult = await findUser({
        _id: req.userId,
        status: { $ne: status.DELETE },
        userType: { $in: [userType.ADMIN, userType.SUBADMIN] },
      });
      if (!adminResult) {
        throw apiError.unauthorized(responseMessage.UNAUTHORIZED);
      }
      let data = await findOneService({
        _id: validatedBody.serviceId,
        status: { $ne: status.DELETE },
      });
      if (!data) {
        throw apiError.notFound(responseMessage.DATA_NOT_FOUND);
      } else {
        // await updateManyReport({ postId: data._id }, { status: status.DELETE });
        let updateRes = await updateService(
          { _id: data._id },
          { $set: { reportedId: [] } }
        );
        return res.json(new response(updateRes, responseMessage.DATA_FOUND));
      }
    } catch (error) {
      return next(error);
    }
  }
  //Product management APIs
  /**
   * @swagger
   * /admin/allJobList:
   *   get:
   *     tags:
   *       - ADMIN
   *     description: allJobList
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
  async allJobList(req, res, next) {
    try {
      let adminResult = await findUser({
        _id: req.userId,
        status: { $ne: status.DELETE },
        userType: { $in: [userType.ADMIN, userType.SUBADMIN] },
      });
      if (!adminResult) {
        throw apiError.unauthorized(responseMessage.UNAUTHORIZED);
      }
      let data = await listJob({
        status: { $ne: status.DELETE },
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
  /**
   * @swagger
   * /admin/jobView:
   *   get:
   *     tags:
   *       - ADMIN
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
  async jobView(req, res, next) {
    const validationSchema = {
      jobId: Joi.string().required(),
    };
    try {
      const validatedBody = await Joi.validate(req.query, validationSchema);
      let adminResult = await findUser({
        _id: req.userId,
        status: { $ne: status.DELETE },
        userType: { $in: [userType.ADMIN, userType.SUBADMIN] },
      });
      if (!adminResult) {
        throw apiError.unauthorized(responseMessage.UNAUTHORIZED);
      }
      let data = await findOneJob({
        _id: validatedBody.jobId,
        status: { $ne: status.DELETE },
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

  /**
   * @swagger
   * /admin/deleteJob:
   *   delete:
   *     tags:
   *       - ADMIN
   *     description: deleteJob
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
  async deleteJob(req, res, next) {
    const validationSchema = {
      jobId: Joi.string().required(),
    };
    try {
      const validatedBody = await Joi.validate(req.query, validationSchema);
      let adminResult = await findUser({
        _id: req.userId,
        status: { $ne: status.DELETE },
        userType: { $in: [userType.ADMIN, userType.SUBADMIN] },
      });
      if (!adminResult) {
        throw apiError.unauthorized(responseMessage.UNAUTHORIZED);
      }
      let data = await findOneJob({
        _id: validatedBody.jobId,
        status: { $ne: status.DELETE },
      });
      if (!data) {
        throw apiError.notFound(responseMessage.DATA_NOT_FOUND);
      } else {
        // await updateManyReport({ postId: data._id }, { status: status.DELETE });
        let updateRes = await updateJob(
          { _id: data._id },
          { status: status.DELETE }
        );
        return res.json(new response(updateRes, responseMessage.JOB_DELETE));
      }
    } catch (error) {
      return next(error);
    }
  }

  /**
   * @swagger
   * /admin/ignoreJob:
   *   delete:
   *     tags:
   *       - ADMIN
   *     description: ignoreJob
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
  async ignoreJob(req, res, next) {
    const validationSchema = {
      jobId: Joi.string().required(),
    };
    try {
      const validatedBody = await Joi.validate(req.query, validationSchema);
      let adminResult = await findUser({
        _id: req.userId,
        status: { $ne: status.DELETE },
        userType: { $in: [userType.ADMIN, userType.SUBADMIN] },
      });
      if (!adminResult) {
        throw apiError.unauthorized(responseMessage.UNAUTHORIZED);
      }
      let data = await findOneJob({
        _id: validatedBody.ignoreJob,
        status: { $ne: status.DELETE },
      });
      if (!data) {
        throw apiError.notFound(responseMessage.DATA_NOT_FOUND);
      } else {
        // await updateManyReport({ postId: data._id }, { status: status.DELETE });
        let updateRes = await updateJob(
          { _id: data._id },
          { $set: { reportedId: [] } }
        );
        return res.json(new response(updateRes, responseMessage.DATA_FOUND));
      }
    } catch (error) {
      return next(error);
    }
  }

  /**
   * @swagger
   * /admin/addSubamin:
   *   post:
   *     tags:
   *       - SubAdmin
   *     description: addSubamin
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: token
   *         description: token
   *         in: header
   *         required: true
   *       - name: addSubamin
   *         description: addSubamin
   *         in: body
   *         required: true
   *         schema:
   *           $ref: '#/definitions/addSubamin'
   *     responses:
   *       200:
   *         description: Returns success message
   */
  async addSubamin(req, res, next) {
    const validationSchema = {
      userName: Joi.string().required(),
      email: Joi.string().required(),
      countryCode: Joi.string().required(),
      mobileNumber: Joi.string().required(),
      password: Joi.string().required(),
      dob: Joi.string().optional(),
      gender: Joi.string().optional(),
      name: Joi.string().optional(),
      profilePic: Joi.string().optional(),
      permissions: Joi.optional(),
    };
    try {
      var result;
      const { userName, password, email, mobileNumber, profilePic } =
        await Joi.validate(req.body, validationSchema);
      let adminResult = await findUser({
        _id: req.userId,
        status: { $ne: status.DELETE },
        userType: userType.ADMIN,
      });
      if (!adminResult) {
        throw apiError.unauthorized(responseMessage.UNAUTHORIZED);
      }
      var userInfo = await checkUserExists(mobileNumber, email, userName);
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
        if (email) {
          commonFunction.sendMailWithTemplateCredential(
            email,
            userName,
            password
          );
        }
        if (profilePic) {
          req.body.profilePic = await commonFunction.getSecureUrl(profilePic);
        }
        let count = await userCount();
        let binanceRes = await binance.generateBNBWallet(count, `${mnemonic}`);
        if (binanceRes.generatedMessage == false) {
          throw apiError.internal(responseMessage.BLOCKCHAIN_ERROR);
        } else {
          req.body.bnbAccount = {
            address: binanceRes.address,
            privateKey: binanceRes.privateKey,
          };
          req.body.password = bcrypt.hashSync(password);
          req.body.userType = userType.SUBADMIN;
          (req.body.otpVerification = true),
            (result = await createUser(req.body));
          return res.json(new response(result, responseMessage.ADD_SUBADMIN));
        }
      }
    } catch (error) {
      console.log(error);
      return next(error);
    }
  }

  /**
   * @swagger
   * /admin/subAdminList:
   *   get:
   *     tags:
   *       - ADMIN
   *     description: subAdminList
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
   *       - name: statusType
   *         description: statusType (ACTIVE , BLOCK)
   *         in: query
   *         required: false
   *     responses:
   *       200:
   *         description: Returns success message
   */
  async subAdminList(req, res, next) {
    const validationSchema = {
      search: Joi.string().optional(),
      fromDate: Joi.string().optional(),
      toDate: Joi.string().optional(),
      page: Joi.string().optional(),
      limit: Joi.string().optional(),
      statusType: Joi.string().optional(),
    };
    try {
      const validatedBody = await Joi.validate(req.query, validationSchema);
      let adminResult = await findUser({
        _id: req.userId,
        status: { $ne: status.DELETE },
        userType: { $in: [userType.ADMIN, userType.SUBADMIN] },
      });
      if (!adminResult) {
        throw apiError.unauthorized(responseMessage.UNAUTHORIZED);
      }
      validatedBody.userType = userType.SUBADMIN;
      let data = await paginateSearchByAdmin(validatedBody);
      if (data.docs.length == 0) {
        throw apiError.notFound(responseMessage.DATA_NOT_FOUND);
      } else {
        return res.json(new response(data, responseMessage.DATA_FOUND));
      }
    } catch (error) {
      return next(error);
    }
  }

  /**
   * @swagger
   * /admin/updateSubadminByUser:
   *   put:
   *     tags:
   *       - SubAdmin
   *     description: updateSubadminByUser
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: token
   *         description: token
   *         in: header
   *         required: true
   *       - name: updateSubadminByUser
   *         description: updateSubadminByUser
   *         in: body
   *         required: true
   *         schema:
   *           $ref: '#/definitions/updateSubadminByUser'
   *     responses:
   *       200:
   *         description: Returns success message
   */
  async updateSubadminByUser(req, res, next) {
    const validationSchema = {
      subAdminId: Joi.string().optional(),
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
      permissions: Joi.optional(),
    };
    try {
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
      let adminResult = await findUser({
        _id: req.userId,
        status: { $ne: status.DELETE },
        userType: { $in: [userType.ADMIN] },
      });
      if (!adminResult) {
        throw apiError.unauthorized(responseMessage.UNAUTHORIZED);
      }
      let userResult = await findUser({
        _id: validatedBody.subAdminId,
        userType: userType.SUBADMIN,
        status: { $ne: status.DELETE },
      });
      if (!userResult) {
        throw apiError.notFound(responseMessage.USER_NOT_FOUND);
      }
      var userInfo = await emailMobileExist(
        mobileNumber,
        email,
        userName,
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
  }

  /**
   * @swagger
   * /admin/deleteUser:
   *   delete:
   *     tags:
   *       - ADMIN
   *     description: deleteUser
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: token
   *         description: token
   *         in: header
   *         required: true
   *       - name: userId
   *         description: userId
   *         in: query
   *         required: true
   *     responses:
   *       200:
   *         description: Returns success message
   */
  async deleteUser(req, res, next) {
    const validationSchema = {
      userId: Joi.string().required(),
    };
    try {
      const validatedBody = await Joi.validate(req.query, validationSchema);
      let adminResult = await findUser({
        _id: req.userId,
        status: { $ne: status.DELETE },
        userType: { $in: [userType.ADMIN] },
      });
      if (!adminResult) {
        throw apiError.unauthorized(responseMessage.UNAUTHORIZED);
      }
      let data = await findUser({
        _id: validatedBody.userId,
        status: { $ne: status.DELETE },
      });
      if (!data) {
        throw apiError.notFound(responseMessage.USER_NOT_FOUND);
      } else {
        let updateRes = await updateUserById(
          { _id: data._id },
          { status: status.DELETE }
        );
        return res.json(new response(updateRes, responseMessage.USER_DELETE));
      }
    } catch (error) {
      return next(error);
    }
  }

  /**
   * @swagger
   * /admin/subAdminBlockUnblock:
   *   post:
   *     tags:
   *       -  ADMIN
   *     description: subAdminBlockUnblock
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: token
   *         description: token
   *         in: header
   *         required: true
   *       - name: _id
   *         description: _id
   *         in: formData
   *         required: true
   *     responses:
   *       200:
   *         description: Returns success message
   */
  async subAdminBlockUnblock(req, res, next) {
    const validationSchema = {
      _id: Joi.string().required(),
    };
    try {
      const validatedBody = await Joi.validate(req.body, validationSchema);
      let adminResult = await findUser({
        _id: req.userId,
        userType: { $in: [userType.ADMIN, userType.SUBADMIN] },
        status: { $ne: status.DELETE },
      });
      if (!adminResult) {
        throw apiError.unauthorized(responseMessage.UNAUTHORIZED);
      } else {
        let userResult = await findUser({
          _id: validatedBody._id,
          userType: { $ne: userType.ADMIN },
          status: { $ne: status.DELETE },
        });
        if (!userResult) {
          throw apiError.notFound(responseMessage.DATA_NOT_FOUND);
        } else {
          if (userResult.status == status.ACTIVE) {
            let updateRes = await updateUser(
              { _id: userResult._id },
              { $set: { status: status.BLOCK } }
            );
            return res.json(
              new response(updateRes, responseMessage.BLOCK_BY_ADMIN)
            );
          } else {
            let updateRes = await updateUser(
              { _id: userResult._id },
              { $set: { status: status.ACTIVE } }
            );
            return res.json(
              new response(updateRes, responseMessage.UNBLOCK_BY_ADMIN)
            );
          }
        }
      }
    } catch (error) {
      return next(error);
    }
  }

  /**
   * @swagger
   * /admin/addDuration:
   *   post:
   *     tags:
   *       - DURATION
   *     description: addDuration
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: token
   *         description: token
   *         in: header
   *         required: true
   *       - name: duration
   *         description: duration
   *         in: formData
   *         required: true
   *       - name: amount
   *         description: amount
   *         in: formData
   *         required: true
   *     responses:
   *       200:
   *         description: Duration added successfully.
   *       409:
   *         description: Data already exist.
   *       401:
   *         description: Unauthorized person.
   *       500:
   *         description: Internal server error.
   *       501:
   *         description: Something went wrong.
   */
  async addDuration(req, res, next) {
    const validSchema = {
      duration: Joi.string().required(),
      amount: Joi.string().required(),
    };
    try {
      const validatedBody = await Joi.validate(req.body, validSchema);
      let admin = await findUser({
        _id: req.userId,
        userType: { $in: [userType.ADMIN] },
      });
      if (!admin) {
        throw apiError.invalid(responseMessage.UNAUTHORIZED);
      } else {
        let find = await findDuration({
          duration: validatedBody.duration,
          status: status.ACTIVE,
        });
        if (find) {
          throw apiError.conflict(responseMessage.ALREADY_EXITS);
        }
        let saveResult = await createDuration(validatedBody);
        return res.json(new response(saveResult, responseMessage.ADD_DURATION));
      }
    } catch (error) {
      console.log(error);
      return next(error);
    }
  }

  /**
   * @swagger
   * /admin/listDuration:
   *   get:
   *     tags:
   *       - DURATION
   *     description: listDuration
   *     produces:
   *       - application/json
   *     parameters:
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
   *         description: Data found successfully.
   *       404:
   *         description: Data not found.
   *       500:
   *         description: Internal server error.
   *       501:
   *         description: Something went wrong.
   */
  async listPaginateDuration(req, res, next) {
    const validationSchema = {
      fromDate: Joi.string().optional(),
      toDate: Joi.string().optional(),
      page: Joi.string().optional(),
      limit: Joi.string().optional(),
    };
    try {
      const validatedBody = await Joi.validate(req.query, validationSchema);
      let find = await paginateSearchDuration(validatedBody);
      if (find.docs.length == 0) {
        throw apiError.conflict(responseMessage.DATA_NOT_FOUND);
      }
      return res.json(new response(find, responseMessage.DATA_FOUND));
    } catch (error) {
      console.log(error);
      return next(error);
    }
  }

  // fetch All duration list
  async listAllDuration(req, res, next) {
    try {
      let find = await fetchAllDurationList();
      if (find.length == 0) {
        throw apiError.conflict(responseMessage.DATA_NOT_FOUND);
      }
      return res.json(new response(find, responseMessage.DATA_FOUND));
    } catch (error) {
      console.log(error);
      return next(error);
    }
  }

  /**
   * @swagger
   * /admin/viewDuration:
   *   get:
   *     tags:
   *       - DURATION
   *     description: viewDuration
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: durationId
   *         description: durationId
   *         in: query
   *         required: true
   *     responses:
   *       200:
   *         description: Data found successfully.
   *       404:
   *         description: Data not found.
   *       500:
   *         description: Internal server error.
   *       501:
   *         description: Something went wrong.
   */
  async viewDuration(req, res, next) {
    try {
      let find = await findDuration({
        _id: req.query.durationId,
        status: { $ne: status.DELETE },
      });
      if (!find) {
        throw apiError.conflict(responseMessage.DATA_NOT_FOUND);
      }
      return res.json(new response(find, responseMessage.DATA_FOUND));
    } catch (error) {
      console.log(error);
      return next(error);
    }
  }

  /**
   * @swagger
   * /admin/deleteDuration:
   *   delete:
   *     tags:
   *       - DURATION
   *     description: deleteDuration
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: token
   *         description: token
   *         in: header
   *         required: true
   *       - name: durationId
   *         description: durationId
   *         in: formData
   *         required: true
   *     responses:
   *       200:
   *         description: Duration deleted successfully.
   *       404:
   *         description: Data not found.
   *       500:
   *         description: Internal server error.
   *       501:
   *         description: Something went wrong.
   */
  async deleteDuration(req, res, next) {
    const validSchema = {
      durationId: Joi.string().required(),
    };
    try {
      const validatedBody = await Joi.validate(req.body, validSchema);
      let admin = await findUser({
        _id: req.userId,
        userType: { $in: [userType.ADMIN] },
      });
      if (!admin) {
        throw apiError.invalid(responseMessage.UNAUTHORIZED);
      }
      let find = await findDuration({
        _id: validatedBody.durationId,
        status: { $ne: status.DELETE },
      });
      if (!find) {
        throw apiError.conflict(responseMessage.DATA_NOT_FOUND);
      }
      let updateRes = await updateDuration(
        { _id: find._id },
        { status: status.DELETE }
      );
      return res.json(new response(updateRes, responseMessage.DURATION_DELETE));
    } catch (error) {
      console.log(error);
      return next(error);
    }
  }

  /**
   * @swagger
   * /admin/editDuration:
   *   put:
   *     tags:
   *       - DURATION
   *     description: editDuration
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: token
   *         description: token
   *         in: header
   *         required: true
   *       - name: durationId
   *         description: durationId
   *         in: formData
   *         required: true
   *       - name: duration
   *         description: duration
   *         in: formData
   *         required: false
   *       - name: amount
   *         description: amount
   *         in: formData
   *         required: false
   *     responses:
   *       200:
   *         description: Duration updated successfully.
   *       409:
   *         description: Data already exist.
   *       401:
   *         description: Unauthorized person.
   *       500:
   *         description: Internal server error.
   *       501:
   *         description: Something went wrong.
   */
  async editDuration(req, res, next) {
    const validSchema = {
      durationId: Joi.string().required(),
      duration: Joi.string().optional(),
      amount: Joi.string().optional(),
    };
    try {
      const validatedBody = await Joi.validate(req.body, validSchema);
      let admin = await findUser({
        _id: req.userId,
        userType: { $in: [userType.ADMIN] },
      });
      if (!admin) {
        throw apiError.invalid(responseMessage.UNAUTHORIZED);
      } else {
        let findRes = await findDuration({
          _id: validatedBody.durationId,
          status: { $ne: status.DELETE },
        });
        if (!findRes) {
          throw apiError.conflict(responseMessage.DURATION_NOT_FOUND);
        }
        let find = await findDuration({
          _id: { $ne: findRes._id },
          duration: validatedBody.duration,
          amount: validatedBody.amount,
          status: status.ACTIVE,
        });
        if (find) {
          throw apiError.conflict(responseMessage.ALREADY_EXITS);
        }
        let updateRes = await updateDuration(
          { _id: findRes._id },
          validatedBody
        );
        return res.json(
          new response(updateRes, responseMessage.DURATION_UPDATE)
        );
      }
    } catch (error) {
      console.log(error);
      return next(error);
    }
  }

  /**
   * @swagger
   * /admin/dashboard:
   *   get:
   *     tags:
   *       - DASHBOARD
   *     description: dashboard
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: Data found successfully.
   *       404:
   *         description: Data not found.
   *       500:
   *         description: Internal server error.
   *       501:
   *         description: Something went wrong.
   */
  async dashboard(req, res, next) {
    try {
      let adminRes = await findUserData({
        userType: userType.ADMIN,
        status: { $ne: status.DELETE },
      });
      let [
        totalActiveUser,
        totalBlockUser,
        totalUser,
        totalCollection,
        totalPost,
        totalPostPromomtion,
        totalAuction,
        transactionRes,
        user24Hours,
        log3Days,
        log7Days,
      ] = await Promise.all([
        findCount({
          status: status.ACTIVE,
          otpVerification: true,
          userType: userType.USER,
        }),
        findCount({
          status: status.BLOCK,
          otpVerification: true,
          userType: userType.USER,
        }),
        findCount({
          status: { $ne: status.DELETE },
          otpVerification: true,
          userType: userType.USER,
        }),
        findCollectionCount({ status: { $ne: status.DELETE } }),
        findPostCount({
          status: { $ne: status.DELETE },
          isSold: false,
          isBuy: false,
        }),
        findPostPromotionCount({ status: { $ne: status.DELETE } }),
        findAuctionCount({ status: { $ne: status.DELETE } }),
        findTransactionCount({
          userId: adminRes._id,
          status: { $ne: status.DELETE },
        }),
        findCount({
          status: status.ACTIVE,
          otpVerification: true,
          userType: userType.USER,
          createdAt: {
            $gte: new Date(new Date().getTime() - 24 * 60 * 60 * 1000),
          },
        }),
        logHistoryList({
          createdAt: {
            $gte: new Date(new Date().getTime() - 72 * 60 * 60 * 1000),
          },
        }),
        logHistoryList({
          createdAt: {
            $gte: new Date(new Date().getTime() - 168 * 60 * 60 * 1000),
          },
        }),
      ]);

      const uniqueIds = [],
        uniqueIds7 = [];

      const unique = log3Days.filter((element) => {
        const isDuplicate = uniqueIds.includes(String(element.userId));

        if (!isDuplicate) {
          uniqueIds.push(String(element.userId));
          return true;
        } else {
          return false;
        }
      });

      const unique7 = log7Days.filter((element) => {
        const isDuplicate = uniqueIds7.includes(String(element.userId));

        if (!isDuplicate) {
          uniqueIds7.push(String(element.userId));
          return true;
        } else {
          return false;
        }
      });
      let obj = {
        totalActiveUser: totalActiveUser,
        totalBlockUser: totalBlockUser,
        totalUser: totalUser,
        totalCollection: totalCollection,
        totalPost: totalPost,
        totalPostPromomtion: totalPostPromomtion,
        binanceRes: adminRes.bnbBalace,
        totalAuction: totalAuction,
        totalTransaction: transactionRes,
        user24Hours: user24Hours,
        activeUser3days: unique.length,
        activeUser7Days: unique7.length,
      };
      return res.json(new response(obj, responseMessage.DATA_FOUND));
    } catch (error) {
      console.log("========>1223", error);
      return next(error);
    }
  }

  /**
   * @swagger
   * /admin/postListWithUser:
   *   get:
   *     tags:
   *       - ADMIN
   *     description: postListWithUser
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: token
   *         description: token
   *         in: header
   *         required: true
   *       - name: userId
   *         description: userId
   *         in: query
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
   *       - name: postType
   *         description: postType ("PRIVATE", "PUBLIC")
   *         in: query
   *         required: false
   *     responses:
   *       200:
   *         description: Returns success message
   */
  async postListWithUser(req, res, next) {
    const validationSchema = {
      userId: Joi.string().required(),
      search: Joi.string().optional(),
      fromDate: Joi.string().optional(),
      toDate: Joi.string().optional(),
      page: Joi.string().optional(),
      limit: Joi.string().optional(),
      postType: Joi.string().optional(),
    };
    try {
      const validatedBody = await Joi.validate(req.query, validationSchema);
      let adminResult = await findUser({
        _id: req.userId,
        status: { $ne: status.DELETE },
        userType: { $in: [userType.ADMIN, userType.SUBADMIN] },
      });
      if (!adminResult) {
        throw apiError.unauthorized(responseMessage.UNAUTHORIZED);
      }
      let data = await paginatePostWithUserByAdmin(validatedBody);
      if (data.docs.length == 0) {
        throw apiError.notFound(responseMessage.DATA_NOT_FOUND);
      } else {
        return res.json(new response(data, responseMessage.DATA_FOUND));
      }
    } catch (error) {
      return next(error);
    }
  }

  /**
   * @swagger
   * /admin/auctionListWithUser:
   *   get:
   *     tags:
   *       - ADMIN
   *     description: auctionListWithUser
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: token
   *         description: token
   *         in: header
   *         required: true
   *       - name: userId
   *         description: userId
   *         in: query
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
  async auctionListWithUser(req, res, next) {
    const validationSchema = {
      userId: Joi.string().required(),
      search: Joi.string().optional(),
      fromDate: Joi.string().optional(),
      toDate: Joi.string().optional(),
      page: Joi.string().optional(),
      limit: Joi.string().optional(),
    };
    try {
      const validatedBody = await Joi.validate(req.query, validationSchema);
      let adminResult = await findUser({
        _id: req.userId,
        status: { $ne: status.DELETE },
        userType: { $in: [userType.ADMIN, userType.SUBADMIN] },
      });
      if (!adminResult) {
        throw apiError.unauthorized(responseMessage.UNAUTHORIZED);
      }
      let data = await allmyNftAuctionList(validatedBody);
      if (data.docs.length == 0) {
        throw apiError.notFound(responseMessage.DATA_NOT_FOUND);
      } else {
        return res.json(new response(data, responseMessage.DATA_FOUND));
      }
    } catch (error) {
      return next(error);
    }
  }

  /**
   * @swagger
   * /admin/userActivityListWithUser:
   *   get:
   *     tags:
   *       - ADMIN
   *     description: userActivityListWithUser
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: token
   *         description: token
   *         in: header
   *         required: true
   *       - name: userId
   *         description: userId
   *         in: query
   *         required: true
   *       - name: type
   *         description: type
   *         enum: ["COLLECTION", "RATING", "TRACKING", "FOLLOW", "UNFOLLOW", "AUCTION", "STORY","BUY", "LIKE", "DISLIKE", "HIDE", "UNHIDE", "COMMENT", "COMMENT_REPLY","POST","BID","BLOCK","UNBLOCK","UN_IGNORE","IGNORE","POSTPROMOTION","REPORT","SUBSCRIBE","STORYCOMMENT","REELS"]
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
  async userActivityListWithUser(req, res, next) {
    const validationSchema = {
      userId: Joi.string().required(),
      fromDate: Joi.string().optional(),
      toDate: Joi.string().optional(),
      page: Joi.string().optional(),
      limit: Joi.string().optional(),
      type: Joi.string().optional(),
    };
    try {
      const validatedBody = await Joi.validate(req.query, validationSchema);
      let adminResult = await findUser({
        _id: req.userId,
        status: { $ne: status.DELETE },
        userType: { $in: [userType.ADMIN, userType.SUBADMIN] },
      });
      if (!adminResult) {
        throw apiError.unauthorized(responseMessage.UNAUTHORIZED);
      }
      let data = await paginateSearch(validatedBody);
      if (data.docs.length == 0) {
        throw apiError.notFound(responseMessage.DATA_NOT_FOUND);
      } else {
        return res.json(new response(data, responseMessage.DATA_FOUND));
      }
    } catch (error) {
      return next(error);
    }
  }

  /**
   * @swagger
   * /admin/transactionListWithUser:
   *   get:
   *     tags:
   *       - ADMIN
   *     description: transactionListWithUser
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: token
   *         description: token
   *         in: header
   *         required: true
   *       - name: userId
   *         description: userId
   *         in: query
   *         required: true
   *       - name: transactionType
   *         description: transactionType
   *         enum: ["BUY_AUCTION","SOLD_AUCTION","BUY_POST","SOLD_POST","COLLECTION_SHARE_AMOUNT","COLLECTION_RECEIVE_AMOUNT","COLLECTION_SUBSCRIBE_RECEIVE_COMMISSION","COLLECTION_SUBSCRIBE_SHARE","COLLECTION_SUBSCRIBE_RECEIVE","DEPOSIT_FOR_ADMIN","DEPOSIT_FOR_USER","WITHDRAW_FOR_ADMIN","WITHDRAW_FOR_USER"]
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
  async transactionListWithUser(req, res, next) {
    const validationSchema = {
      userId: Joi.string().required(),
      fromDate: Joi.string().optional(),
      toDate: Joi.string().optional(),
      page: Joi.string().optional(),
      limit: Joi.string().optional(),
      transactionType: Joi.string().optional(),
    };
    try {
      const validatedBody = await Joi.validate(req.query, validationSchema);
      let adminResult = await findUser({
        _id: req.userId,
        status: { $ne: status.DELETE },
        userType: { $in: [userType.ADMIN, userType.SUBADMIN] },
      });
      if (!adminResult) {
        throw apiError.unauthorized(responseMessage.UNAUTHORIZED);
      }
      let data = await paginateTransactionSearch(validatedBody);
      if (data.docs.length == 0) {
        throw apiError.notFound(responseMessage.DATA_NOT_FOUND);
      } else {
        return res.json(new response(data, responseMessage.DATA_FOUND));
      }
    } catch (error) {
      return next(error);
    }
  }

  /**
   * @swagger
   * /admin/AllUser:
   *   get:
   *     tags:
   *       - ADMIN
   *     description: AllUser
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: Returns success message
   */
  async AllUser(req, res, next) {
    try {
      let resultRes = await creatorList({
        status: { $ne: status.DELETE },
        userType: userType.USER,
      });
      if (resultRes.length == 0) {
        throw apiError.notFound(responseMessage.DATA_NOT_FOUND);
      } else {
        return res.json(new response(resultRes, responseMessage.DATA_FOUND));
      }
    } catch (error) {
      return next(error);
    }
  }

  /**
   * @swagger
   * /admin/adminTransactionList:
   *   get:
   *     tags:
   *       - ADMIN
   *     description: adminTransactionList
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: token
   *         description: token
   *         in: header
   *         required: true
   *       - name: transactionType
   *         description: transactionType
   *         enum: ["BUY_AUCTION","SOLD_AUCTION","BUY_POST","SOLD_POST","COLLECTION_SHARE_AMOUNT","COLLECTION_RECEIVE_AMOUNT","COLLECTION_SUBSCRIBE_RECEIVE_COMMISSION","COLLECTION_SUBSCRIBE_SHARE","COLLECTION_SUBSCRIBE_RECEIVE","DEPOSIT_FOR_ADMIN","DEPOSIT_FOR_USER","WITHDRAW_FOR_ADMIN","WITHDRAW_FOR_USER"]
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
  async adminTransactionList(req, res, next) {
    const validationSchema = {
      fromDate: Joi.string().optional(),
      toDate: Joi.string().optional(),
      page: Joi.string().optional(),
      limit: Joi.string().optional(),
      transactionType: Joi.string().optional(),
    };
    try {
      const validatedBody = await Joi.validate(req.query, validationSchema);
      let data;
      var userResult = await findUser({
        _id: req.userId,
        userType: { $in: [userType.ADMIN, userType.SUBADMIN] },
      });
      if (!userResult) {
        throw apiError.notFound(responseMessage.USER_NOT_FOUND);
      }
      validatedBody.userId = userResult._id;
      data = await paginateTransactionSearch(validatedBody);
      if (data.docs.length == 0) {
        throw apiError.notFound(responseMessage.DATA_NOT_FOUND);
      }
      return res.json(new response(data, responseMessage.DATA_FOUND));
    } catch (error) {
      return next(error);
    }
  }

  /**
   * @swagger
   * /admin/activeUserDailyList:
   *   get:
   *     tags:
   *       - ADMIN
   *     description: activeUserDailyList
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: token
   *         description: token
   *         in: header
   *         required: true
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
  async activeUserDailyList(req, res, next) {
    try {
      let userResult = await findUser({
        _id: req.userId,
        status: { $ne: status.DELETE },
        userType: { $in: [userType.ADMIN, userType.SUBADMIN] },
      });
      if (!userResult) {
        throw apiError.unauthorized(responseMessage.UNAUTHORIZED);
      }
      const paginateGood = (array, page_size, page_number) => {
        return array.slice(
          (page_number - 1) * page_size,
          page_number * page_size
        );
      };
      let activeUserRes = await logHistoryList({
        createdAt: {
          $gte: new Date(new Date().getTime() - 24 * 60 * 60 * 1000),
        },
      });
      const uniqueIds = [];

      const unique = activeUserRes.filter((element) => {
        const isDuplicate = uniqueIds.includes(String(element.userId));

        if (!isDuplicate) {
          uniqueIds.push(String(element.userId));
          return true;
        } else {
          return false;
        }
      });
      let options = {
        page: parseInt(req.query.page) || 1,
        limit: parseInt(req.query.limit) || 10,
      };
      let properResult = {
        docs: paginateGood(unique, options.limit, options.page),
        total: unique.length,
        limit: options.limit,
        page: options.page,
        pages: Math.ceil(unique.length / options.limit),
      };
      if (properResult.docs.length == 0) {
        throw apiError.notFound(responseMessage.USER_NOT_FOUND);
      }
      return res.json(new response(properResult, responseMessage.USER_DETAILS));
    } catch (error) {
      return next(error);
    }
  }

  /**
   * @swagger
   * /admin/topCreatorList:
   *   get:
   *     tags:
   *       - ADMIN
   *     description: topCreatorList
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
   *       - name: limit
   *         description: limit
   *         in: query
   *         required: false
   *       - name: postType
   *         description: postType ("PRIVATE", "PUBLIC")
   *         in: query
   *         required: false
   *     responses:
   *       200:
   *         description: Returns success message
   */
  async topCreatorList(req, res, next) {
    const validationSchema = {
      search: Joi.string().optional(),
      fromDate: Joi.string().optional(),
      toDate: Joi.string().optional(),
      page: Joi.string().optional(),
      limit: Joi.string().optional(),
      postType: Joi.string().optional(),
    };
    try {
      const paginateGood = (array, page_size, page_number) => {
        return array.slice(
          (page_number - 1) * page_size,
          page_number * page_size
        );
      };
      const validatedBody = await Joi.validate(req.query, validationSchema);
      let adminResult = await findUser({
        _id: req.userId,
        status: { $ne: status.DELETE },
        userType: { $in: [userType.ADMIN, userType.SUBADMIN] },
      });
      if (!adminResult) {
        throw apiError.unauthorized(responseMessage.UNAUTHORIZED);
      }
      let data = await topSellingPostAndResalepost(validatedBody);
      let result = [
        ...data
          .reduce((mp, o) => {
            if (!mp.has(o.creatorId))
              mp.set(o.creatorId, { ...o["_doc"], count: 0 });
            mp.get(o.creatorId).count++;
            return mp;
          }, new Map())
          .values(),
      ];
      result.sort((a, b) =>
        a.count > b.count ? -1 : b.count > a.count ? 1 : 0
      );
      let options = {
        page: parseInt(req.query.page) || 1,
        limit: parseInt(req.query.limit) || 10,
      };
      let properResult = {
        docs: paginateGood(result, options.limit, options.page),
        total: result.length,
        limit: options.limit,
        page: options.page,
        pages: Math.ceil(result.length / options.limit),
      };
      if (properResult.docs.length == 0) {
        throw apiError.notFound(responseMessage.USER_NOT_FOUND);
      }
      return res.json(new response(properResult, responseMessage.USER_FOUND));
    } catch (error) {
      console.log("error ==>", error);
      return next(error);
    }
  }

  /**
   * @swagger
   * /admin/engagingUserList:
   *   get:
   *     tags:
   *       - ADMIN
   *     description: engagingUserList
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: token
   *         description: token
   *         in: header
   *         required: true
   *       - name: type
   *         description: type
   *         enum: ["BUY", "LIKE", "DISLIKE", "HIDE", "UNHIDE", "COMMENT", "COMMENT_REPLY","POST","BLOCK","UNBLOCK","UN_IGNORE","IGNORE"]
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
  async engagingUserList(req, res, next) {
    const validationSchema = {
      fromDate: Joi.string().optional(),
      toDate: Joi.string().optional(),
      page: Joi.string().optional(),
      limit: Joi.string().optional(),
      type: Joi.string().optional(),
    };
    try {
      const paginateGood = (array, page_size, page_number) => {
        return array.slice(
          (page_number - 1) * page_size,
          page_number * page_size
        );
      };
      const validatedBody = await Joi.validate(req.query, validationSchema);
      let adminResult = await findUser({
        _id: req.userId,
        status: { $ne: status.DELETE },
        userType: { $in: [userType.ADMIN, userType.SUBADMIN] },
      });
      if (!adminResult) {
        throw apiError.unauthorized(responseMessage.UNAUTHORIZED);
      }
      validatedBody.hours = 4;
      let data = await findSearchActivity(validatedBody);
      let result = [
        ...data
          .reduce((mp, o) => {
            if (!mp.has(o.userId)) mp.set(o.userId, { ...o["_doc"], count: 0 });
            mp.get(o.userId).count++;
            return mp;
          }, new Map())
          .values(),
      ];
      result.sort((a, b) =>
        a.count > b.count ? -1 : b.count > a.count ? 1 : 0
      );
      let options = {
        page: parseInt(req.query.page) || 1,
        limit: parseInt(req.query.limit) || 10,
      };
      let properResult = {
        docs: paginateGood(result, options.limit, options.page),
        total: result.length,
        limit: options.limit,
        page: options.page,
        pages: Math.ceil(result.length / options.limit),
      };
      if (properResult.docs.length == 0) {
        throw apiError.notFound(responseMessage.USER_NOT_FOUND);
      }
      return res.json(new response(properResult, responseMessage.USER_FOUND));
    } catch (error) {
      return next(error);
    }
  }

  /**
   * @swagger
   * /admin/analysisForTrends:
   *   get:
   *     tags:
   *       - ADMIN
   *     description: analysisForTrends
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: token
   *         description: token
   *         in: header
   *         required: true
   *       - name: type
   *         description: type
   *         enum: ["BUY", "LIKE", "DISLIKE", "HIDE", "UNHIDE", "COMMENT", "COMMENT_REPLY","POST","BLOCK","UNBLOCK","UN_IGNORE","IGNORE"]
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
   *       - name: days
   *         description: days
   *         in: query
   *         required: true
   *     responses:
   *       200:
   *         description: Returns success message
   */
  async analysisForTrends(req, res, next) {
    const validationSchema = {
      fromDate: Joi.string().optional(),
      toDate: Joi.string().optional(),
      page: Joi.string().optional(),
      limit: Joi.string().optional(),
      type: Joi.string().optional(),
      days: Joi.string().optional(),
    };
    try {
      const paginateGood = (array, page_size, page_number) => {
        return array.slice(
          (page_number - 1) * page_size,
          page_number * page_size
        );
      };
      const validatedBody = await Joi.validate(req.query, validationSchema);
      let adminResult = await findUser({
        _id: req.userId,
        status: { $ne: status.DELETE },
        userType: { $in: [userType.ADMIN, userType.SUBADMIN] },
      });
      if (!adminResult) {
        throw apiError.unauthorized(responseMessage.UNAUTHORIZED);
      }
      validatedBody.hours = Number(validatedBody.days) * 24;
      let data = await findSearchActivity(validatedBody);
      let result = [
        ...data
          .reduce((mp, o) => {
            if (!mp.has(o.userId)) mp.set(o.userId, { ...o["_doc"], count: 0 });
            mp.get(o.userId).count++;
            return mp;
          }, new Map())
          .values(),
      ];
      result.sort((a, b) =>
        a.count > b.count ? -1 : b.count > a.count ? 1 : 0
      );
      let options = {
        page: parseInt(req.query.page) || 1,
        limit: parseInt(req.query.limit) || 10,
      };
      let properResult = {
        docs: paginateGood(result, options.limit, options.page),
        total: result.length,
        limit: options.limit,
        page: options.page,
        pages: Math.ceil(result.length / options.limit),
      };
      if (properResult.docs.length == 0) {
        throw apiError.notFound(responseMessage.USER_NOT_FOUND);
      }
      return res.json(new response(properResult, responseMessage.USER_FOUND));
    } catch (error) {
      return next(error);
    }
  }

  //////////Store Requests ///////////////
  /**
   * @swagger
   * /admin/storeRequestView:
   *   get:
   *     tags:
   *       - ADMIN
   *     description: storeRequestView
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: token
   *         description: token
   *         in: header
   *         required: true
   *       - name: storeRequestId
   *         description: storeRequestId
   *         in: query
   *         required: true
   *     responses:
   *       200:
   *         description: Returns success message
   */
  async storeRequestView(req, res, next) {
    const validationSchema = {
      storeRequestId: Joi.string().required(),
    };
    try {
      const validatedBody = await Joi.validate(req.query, validationSchema);
      let adminResult = await findUser({
        _id: req.userId,
        status: { $ne: status.DELETE },
        userType: { $in: [userType.ADMIN] },
      });
      if (!adminResult) {
        throw apiError.unauthorized(responseMessage.UNAUTHORIZED);
      } else {
        let resultRes = await findStoreRequest({
          _id: validatedBody.storeRequestId,
          status: { $ne: status.DELETE },
        });
        if (!resultRes) {
          throw apiError.notFound(responseMessage.DATA_NOT_FOUND);
        } else {
          return res.json(new response(resultRes, responseMessage.DATA_FOUND));
        }
      }
    } catch (error) {
      return next(error);
    }
  }

  // Project request details shows user and the project details
  async storeRequestDetails(req, res, next) {
    const validationSchema = {
      storeRequestId: Joi.string().required(),
    };
    try {
      const validatedBody = await Joi.validate(req.query, validationSchema);
      let adminResult = await findUser({
        _id: req.userId,
        status: { $ne: status.DELETE },
        userType: { $in: [userType.ADMIN] },
      });
      if (!adminResult) {
        throw apiError.unauthorized(responseMessage.UNAUTHORIZED);
      } else {
        let resultRes = await viewStoreRequestDetails({
          _id: validatedBody.storeRequestId,
          status: { $ne: status.DELETE },
        });
        if (!resultRes) {
          throw apiError.notFound(responseMessage.DATA_NOT_FOUND);
        } else {
          return res.json(new response(resultRes, responseMessage.DATA_FOUND));
        }
      }
    } catch (error) {
      return next(error);
    }
  }

  /**
   * @swagger
   * /admin/storeRequestList:
   *   get:
   *     tags:
   *       - ADMIN
   *     description: storeRequestList
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
  async storeRequestList(req, res, next) {
    try {
      let adminResult = await findUser({
        _id: req.userId,
        status: { $ne: status.DELETE },
        userType: { $in: [userType.ADMIN] },
      });
      if (!adminResult) {
        throw apiError.unauthorized(responseMessage.UNAUTHORIZED);
      } else {
        let resultRes = await storeRequestList({
          status: { $ne: status.DELETE },
        });
        if (resultRes.length == 0) {
          throw apiError.notFound(responseMessage.DATA_NOT_FOUND);
        } else {
          return res.json(new response(resultRes, responseMessage.DATA_FOUND));
        }
      }
    } catch (error) {
      return next(error);
    }
  }

  /**
   * @swagger
   * /admin/storeRequestUpdate:
   *   get:
   *     tags:
   *       - ADMIN
   *     description: storeRequestUpdate
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

  async storeRequestUpdate(req, res, next) {
    const validationSchema = {
      storeRequestId: Joi.string().required(),
      status: Joi.string().required(),
    };
    try {
      const validatedBody = await Joi.validate(req.body, validationSchema);
      let adminResult = await findUser({
        _id: req.userId,
        status: { $ne: status.DELETE },
        userType: { $in: [userType.ADMIN] },
      });
      if (!adminResult) {
        throw apiError.unauthorized(responseMessage.UNAUTHORIZED);
      } else {
        let reqRes = await findStoreRequest({
          _id: validatedBody.storeRequestId,
          status: { $ne: status.DELETE },
        });
        if (!reqRes) {
          throw apiError.notFound(responseMessage.DATA_NOT_FOUND);
        } else {
          let storeRes = await findStore({
            _id: reqRes.storeId,
            status: { $ne: status.DELETE },
          });

          if (!storeRes) {
            throw apiError.notFound(responseMessage.DATA_NOT_FOUND);
          } else {
            if (validatedBody.status === "ACTIVE") {
              storeRes = await updateStoreById(
                { _id: reqRes.storeId },
                { status: status.ACTIVE }
              );
              reqRes = await updateStoreRequestById(
                { _id: validatedBody.storeRequestId },
                { status: status.APPROVED }
              );
            } else {
              storeRes = await updateProject(
                { _id: reqRes.storeId },
                { status: status.BLOCK }
              );

              reqRes = await updateStoreRequestById(
                { _id: validatedBody.storeRequestId },
                { status: status.REGECTED }
              );
            }
            return res.json(
              new response(
                { storeRes, reqRes },
                responseMessage.STORE_REQUEST_UPDATED
              )
            );
          }
        }
      }
    } catch (error) {
      return next(error);
    }
  }

  ///////////////////////////////Business card APIs////////////////

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
  async viewBusinessCard(req, res, next) {
    const validSchema = {
      businessCardId: Joi.string().required(),
    };
    try {
      const validBody = await Joi.validate(req.query, validSchema);
      let userResult = await findUser({
        _id: req.userId,
        userType: userType.ADMIN,
        status: { $ne: status.DELETE },
      });
      if (!userResult) {
        throw apiError.notFound(responseMessage.USER_NOT_FOUND);
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
  }
  /**
   * @swagger
   * /admin/listAllBusinessCard:
   *   get:
   *     tags:
   *       - USER MANAGEMENT
   *     description: listAllBusinessCard
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
  async listAllBusinessCard(req, res, next) {
    const validSchema = {
      businessCardId: Joi.string().required(),
    };
    try {
      const validBody = await Joi.validate(req.query, validSchema);
      let userResult = await findUser({
        _id: req.userId,
        userType: userType.ADMIN,
        status: { $ne: status.DELETE },
      });
      if (!userResult) {
        throw apiError.notFound(responseMessage.USER_NOT_FOUND);
      }
      let find = await findAllBusinessCard({
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
  }

  /**
   * @swagger
   * /admin/blockBusinessCard:
   *   delete:
   *     tags:
   *       - ADMIN MANAGEMENT
   *     description: blockBusinessCard
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
  async blockBusinessCard(req, res, next) {
    const validSchema = {
      businessCardId: Joi.string().required(),
    };
    try {
      const validBody = await Joi.validate(req.body, validSchema);
      let userResult = await findUser({
        _id: req.userId,
        userType: userType.ADMIN,
        status: { $ne: status.DELETE },
      });
      if (!userResult) {
        throw apiError.notFound(responseMessage.USER_NOT_FOUND);
      }
      let data = await findBusinessCard({
        _id: validBody.businessCardId,
        status: { $ne: status.DELETE },
      });
      if (!data) {
        throw apiError.notFound(responseMessage.DATA_NOT_FOUND);
      }
      let up = await updateBusinessCardById(
        { _id: data._id },
        { $set: { status: status.BLOCK } }
      );
      return res.json(new response(up, responseMessage.DELETE_BUSINESS_CARD));
    } catch (error) {
      return next(error);
    }
  }
  /**
   * @swagger
   * /admin/unblockBusinessCard:
   *   delete:
   *     tags:
   *       - ADMIN MANAGEMENT
   *     description: unblockBusinessCard
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
  async unblockBusinessCard(req, res, next) {
    const validSchema = {
      businessCardId: Joi.string().required(),
    };
    try {
      const validBody = await Joi.validate(req.body, validSchema);
      let userResult = await findUser({
        _id: req.userId,
        userType: userType.ADMIN,
        status: { $ne: status.DELETE },
      });
      if (!userResult) {
        throw apiError.notFound(responseMessage.USER_NOT_FOUND);
      }
      let data = await findBusinessCard({
        _id: validBody.businessCardId,
        status: { $ne: status.DELETE },
      });
      if (!data) {
        throw apiError.notFound(responseMessage.DATA_NOT_FOUND);
      }
      let up = await updateBusinessCardById(
        { _id: data._id },
        { $set: { status: status.ACTIVE } }
      );
      return res.json(new response(up, responseMessage.DELETE_BUSINESS_CARD));
    } catch (error) {
      return next(error);
    }
  }

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
  async getAllPromotions(req, res, next) {
    try {
      let userResult = await findUser({
        _id: req.userId,
        userType: userType.ADMIN,
        status: { $ne: status.DELETE },
      });
      if (!userResult) {
        throw apiError.notFound(responseMessage.USER_NOT_FOUND);
      } else {
        let promotionCheck = await fetchAllPromotionList({
          status: status.ACTIVE,
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
  }

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
  async getActivePromotions(req, res, next) {
    try {
      let userResult = await findUser({
        _id: req.userId,
        userType: userType.ADMIN,
        status: { $ne: status.DELETE },
      });
      if (!userResult) {
        throw apiError.notFound(responseMessage.USER_NOT_FOUND);
      } else {
        let promotionCheck = await findAllPromotion({
          status: status.ACTIVE,
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
  }
  /**
   * @swagger
   * /user/getExpiredPromotions:
   *   post:
   *     tags:
   *       - USER VIEW
   *     description: getExpiredPromotions
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: token
   *         description: token
   *         in: header
   *         required: true
   *       - name: getExpiredPromotions
   *         description: getExpiredPromotions
   *         in: body
   *         required: true
   *         schema:
   *           $ref: '#/definitions/getExpiredPromotions'
   *     responses:
   *       200:
   *         description: Returns success message
   */
  async getExpiredPromotions(req, res, next) {
    try {
      let userResult = await findUser({
        _id: req.userId,
        userType: userType.ADMIN,
        status: { $ne: status.DELETE },
      });
      if (!userResult) {
        throw apiError.notFound(responseMessage.USER_NOT_FOUND);
      } else {
        let promotionCheck = await findAllPromotion({
          status: status.EXPIRED,
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
  }
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
  async viewPromotionById(req, res, next) {
    const validSchema = {
      promotionId: Joi.string().required(),
    };
    try {
      const validBody = await Joi.validate(req.query, validSchema);
      let userResult = await findUser({
        _id: req.userId,
        userType: userType.ADMIN,
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
  }
  /**
   * @swagger
   * /user/getPromotionByType:
   *   post:
   *     tags:
   *       - USER VIEW
   *     description: getPromotionByType
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: token
   *         description: token
   *         in: header
   *         required: true
   *       - name: getPromotionByType
   *         description: getPromotionByType
   *         in: body
   *         required: true
   *         schema:
   *           $ref: '#/definitions/getPromotionByType'
   *     responses:
   *       200:
   *         description: Returns success message
   */
  async getPromotionByType(req, res, next) {
    const validSchema = {
      type: Joi.string().required(),
    };
    try {
      const validBody = await Joi.validate(req.query, validSchema);
      let userResult = await findUser({
        _id: req.userId,
        userType: userType.ADMIN,
        status: { $ne: status.DELETE },
      });
      if (!userResult) {
        throw apiError.notFound(responseMessage.USER_NOT_FOUND);
      } else {
        let promotionCheck = await findPromotion({
          type: validBody.type,
          status: status.EXPIRED,
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
  }
  /**
   * @swagger
   * /user/updatePromotionById:
   *   post:
   *     tags:
   *       - USER VIEW
   *     description: updatePromotionById
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: token
   *         description: token
   *         in: header
   *         required: true
   *       - name: updatePromotionById
   *         description: updatePromotionById
   *         in: body
   *         required: true
   *         schema:
   *           $ref: '#/definitions/updatePromotionById'
   *     responses:
   *       200:
   *         description: Returns success message
   */
  async updatePromotionById(req, res, next) {
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
        userType: userType.ADMIN,
        status: { $ne: status.DELETE },
      });
      if (!userResult) {
        throw apiError.notFound(responseMessage.USER_NOT_FOUND);
      } else {
        let promotionCheck = await updatePromotionById(
          {
            _id: promotionId,
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
  }

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
  async createProject(req, res, next) {
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
        userType: userType.ADMIN,
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
        validatedBody.type = "GOVT";
        validatedBody.status = status.ACTIVE;
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

        // let obj = {
        //   message: "Please approve my Project",
        //   userId: userResult._id,
        //   projectId: saveProject._id,
        //   type: "CREATE",
        // };
        // let saveRequest = await createProjectRequest(obj);
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
          new response({ saveProject }, responseMessage.PROJECT_CREATE)
        );
        // }
      }
    } catch (error) {
      console.log("====================>", error);
      return next(error);
    }
  }

  /**
   * @swagger
   * /user/updateProject:
   *   put:
   *     tags:
   *       - USER POSTS
   *     description: updateProject
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: token
   *         description: token
   *         in: header
   *         required: true
   *       - name: updateProject
   *         description: updateProject
   *         in: body
   *         required: true
   *         schema:
   *           $ref: '#/definitions/updateProject'
   *     responses:
   *       200:
   *         description: Returns success message
   */
  async updateProject(req, res, next) {
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
        userType: userType.ADMIN,
      });
      if (!userResult) {
        throw apiError.notFound(responseMessage.USER_NOT_FOUND);
      } else {
        let projectRes = await findOneProject({
          _id: validatedBody.projectId,
          userId: userResult._id,
          status: { $ne: status.DELETE },
          type: "GOVT",
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
  }
  /**
   * @swagger
   * /user/deleteProject:
   *   put:
   *     tags:
   *       - USER POSTS
   *     description: deleteProject
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: token
   *         description: token
   *         in: header
   *         required: true
   *       - name: deleteProject
   *         description: deleteProject
   *         in: body
   *         required: true
   *         schema:
   *           $ref: '#/definitions/deleteProject'
   *     responses:
   *       200:
   *         description: Returns success message
   */
  async deleteProject(req, res, next) {
    try {
      const validationSchema = {
        projectId: Joi.string().required(),
      };
      const validatedBody = await Joi.validate(req.body, validationSchema);
      var userResult = await findUser({
        _id: req.userId,
        status: { $ne: status.DELETE },
        userType: userType.ADMIN,
      });
      if (!userResult) {
        throw apiError.notFound(responseMessage.USER_NOT_FOUND);
      } else {
        let projectRes = await findOneProject({
          _id: validatedBody.projectId,
          userId: userResult._id,
          status: { $ne: status.DELETE },
          type: "GOVT",
        });
        if (!projectRes) {
          throw apiError.notFound(responseMessage.PROGECT_NOT_FOUND);
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
  }

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
  async projectListPaginate(req, res, next) {
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
  }
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
  async projectView(req, res, next) {
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
  }
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
  async allProjectListPaginate(req, res, next) {
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
        if (
          !userResult.blockedUser.includes(postPromotionResult[i].userId._id)
        ) {
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
            cObj["collectionId"]["_id"].toString() ==
            dataResults[i].collectionId
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
  }

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
  async getAllProjectList(req, res, next) {
    try {
      let userResult = await findUser({
        _id: req.userId,
        status: { $ne: status.DELETE },
        userType: userType.ADMIN,
      });
      if (!userResult) {
        throw apiError.notFound(responseMessage.USER_NOT_FOUND);
      }
      let data = await listProject({
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
  }
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
  async getAllGovtProjectList(req, res, next) {
    try {
      let userResult = await findUser({
        _id: req.userId,
        status: { $ne: status.DELETE },
        userType: userType.ADMIN,
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
}

module.exports = adminController;
