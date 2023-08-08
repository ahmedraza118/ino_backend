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

const { walletServices } = require("../../services/wallet/wallet");

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

  const { createWallet, deposit, withdraw, transferFunds, getWallet } =
  walletServices;



  class walletController {

     /**
   * @swagger
   * /wallet/deposit:
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
   *           $ref: '#/definitions/deposit'
   *     responses:
   *       200:
   *         description: Returns success message
   */
     async depositFunds(req, res, next) {
    
        try {
          let userResult = await findUser({
            _id: req.userId, 
            userType: { $in: [userType.USER] },
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


  }

  module.exports = walletController;