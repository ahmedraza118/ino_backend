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

const {
  storeRequestServices,
} = require("../../services/storeRequest/storeRequest.js");
const {
  activityServices,
} = require("../../services/userActivity/userActivity");

const {
  createStoreRequest,
  findStoreRequest,
  updateStoreRequestById,
  storeRequestList,
  viewStoreRequestDetails,
} = storeRequestServices;

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

const {
  createStore,
  findStoreByName,
  updateStoreById,
  deleteStoreById,
  findStore,
  emailStoreNameExist,
  listAllStores,
  updateStoreCatalogueById,
} = require("../../services/store/store");

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




class storeController {
  /**
   * @swagger
   * /user/registerStore:
   *   post:
   *     tags:
   *       - USER POSTS
   *     description: registerStore
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: token
   *         description: token
   *         in: header
   *         required: true
   *       - name: registerStore
   *         description: registerStore
   *         in: body
   *         required: true
   *         schema:
   *           $ref: '#/definitions/registerStore'
   *     responses:
   *       200:
   *         description: Returns success message
   */
  async registerStore(req, res, next) {
    try {
      const validationSchema = {
        name: Joi.string().required(),
        mail: Joi.string().required(),
        type: Joi.string().required(),
        banner: Joi.string().optional(),
        location: Joi.string().required(),
        timing: Joi.string().required(),
        established: Joi.string().optional(),
        facebook: Joi.string().optional(),
        twitter: Joi.string().optional(),
        instagram: Joi.string().optional(),
        linkedIn: Joi.string().optional(),
        website: Joi.string().optional(),
        awards: Joi.array().items(Joi.string()), // Array of strings for awards
        certificates: Joi.array().items(Joi.string()), // Array of strings for certificates
        catalogue: Joi.array().items(Joi.object({  // Define the array of objects schema
          name: Joi.string().required(),
          description: Joi.string().required(),
          price: Joi.number().required(),
        })).optional(),
        phoneNumber: Joi.string().optional(),
      };
      
      const validatedBody = await Joi.validate(req.body, validationSchema);
      var userResult = await findUser({
        _id: req.userId,
        status: { $ne: status.DELETE },
      });
      if (!userResult) {
        throw apiError.notFound(responseMessage.USER_NOT_FOUND);
      } else {
        // var userInfo = await emailStoreNameExist(
        //   validatedBody.mail,
        //   validatedBody.name
        // );

        // if (userInfo) {
        //   if (userInfo.email == validatedBody.email) {
        //     throw apiError.conflict(responseMessage.EMAIL_EXIST);
        //   }
        //   if (userInfo.name == validatedBody.name) {
        //     throw apiError.conflict(responseMessage.STORE_NAME_EXIST);
        //   }
        // } else {
          if (validatedBody.banner) {
            validatedBody.banner = await commonFunction.getSecureUrl(
              validatedBody.banner
            );
          }
          validatedBody.ownerId = userResult._id;
          var saveStore = await createStore(validatedBody);
          await updateUserById(
            { _id: userResult._id },
            { store: saveStore._id }
          );
          await createActivity({
            userId: userResult._id,
            storeId: saveStore._id,
            // collectionId: result._id,
            title: "Store create",
            desctiption: "Store register successfully.",
            type: "STORE",
          });

          let obj = {
            message: "Please approve my Store",
            userId: userResult._id,
            storeId: saveStore._id,
            type: "REGISTER",
          };
          let saveRequest = await createStoreRequest(obj);
          return res.json(
            new response(
              { saveStore, saveRequest },
              responseMessage.STORE_CREATE
            )
          );
          // }
        }
      // }
    } catch (error) {
      console.log("====================>", error);
      return next(error);
    }
  }

  /**
 * @swagger
 * /user/updateStore:
 *   put:
 *     tags:
 *       - USER POSTS
 *     description: updateStore
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token
 *         in: header
 *         required: true
 *       - name: updateStore
 *         description: updateStore
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/updateStore'
 *     responses:
 *       200:
 *         description: Returns success message
 */
async updateUserStore (req, res, next) {
  try {
    const validationSchema = {
       // collectionId: Joi.string().required(),
       storeId: Joi.string().optional(),
       name: Joi.string().optional(),
        mail: Joi.string().optional(),
        type: Joi.string().optional(),
        banner: Joi.string().optional(),
        location: Joi.string().optional(),
        timing: Joi.string().optional(),
        established: Joi.string().optional(),
        facebook: Joi.string().optional(),
        twitter: Joi.string().optional(),
        instagram: Joi.string().optional(),
        linkedIn: Joi.string().optional(),
        website: Joi.string().optional(),
        awards: Joi.array().items(Joi.string()), // Array of strings for awards
        certificates: Joi.array().items(Joi.string()), // Array of strings for certificates
        catalogue: Joi.array().items(Joi.object({  // Define the array of objects schema
          name: Joi.string().optional(),
          description: Joi.string().optional(),
          price: Joi.number().optional(),
        })).optional(),
        phoneNumber: Joi.string().optional(),
    };
    const validatedBody = await Joi.validate(req.body, validationSchema);
    var userResult = await findUser({
      _id: req.userId,
      status: { $ne: status.DELETE },
    });
    if (!userResult) {
      throw apiError.notFound(responseMessage.USER_NOT_FOUND);
    } else {
      let storeRes = await findStore({
        _id: validatedBody.storeId,
        userId: userResult._id,
        status: { $ne: status.DELETE },
      });
      if (!storeRes) {
        throw apiError.notFound(responseMessage.STORE_NOT_FOUND);
      }
      if (validatedBody.banner) {
        validatedBody.banner = await commonFunction.getSecureUrl(
          validatedBody.banner
        );
      }
      var saveStore = await updateStoreById({ _id: storeRes._id }, validatedBody);
      await updateUserById({ _id: userResult._id }, { isPost: true });
      await createActivity({
        userId: userResult._id,
        postId: saveStore._id,
        title: "Store update",
        desctiption: "Store updated successfully.",
        type: "STORE",
      });
      
      return res.json(new response(saveStore, responseMessage.STORE_UPDATED));
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
async deleteUserStore  (req, res, next) {
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
async postListPaginate  (req, res, next) {
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
async storeView  (req, res, next) {
  const validationSchema = {
    storeId: Joi.string().optional(),
  };
  try {
    const validatedBody = await Joi.validate(req.query, validationSchema);
    const { storeId } = validatedBody;
    let userResult = await findUser({
      _id: req.userId,
      status: { $ne: status.DELETE },
    });
    if (!userResult) {
      throw apiError.notFound(responseMessage.USER_NOT_FOUND);
    }
    let dataResults = await findStore({
      _id: storeId,
      status: { $ne: status.DELETE },
    });
    if (!dataResults) {
      throw apiError.notFound(responseMessage.DATA_NOT_FOUND);
    }
    return res.json(new response(dataResults, responseMessage.DATA_FOUND));
  } catch (error) {
    return next(error);
  }
}

}

module.exports = storeController;
