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
      const validationSchema = {
        amount: Joi.number().required(),
      };

      const validatedBody = await Joi.validate(req.body, validationSchema);

      let userResult = await findUser({
        _id: req.userId,
        userType: { $in: [userType.USER] },
        status: { $ne: status.DELETE },
      });

      if (!userResult) {
        throw apiError.notFound(responseMessage.USER_NOT_FOUND);
      }
      let updateRes = await deposit(userResult._id, validatedBody.amount);
      return res.json(new response(updateRes, responseMessage.FUND_DEPOSIT));
    } catch (error) {
      return next(error);
    }
  }

  /**
   * @swagger
   * /wallet/withdrawFunds:
   *   post:
   *     tags:
   *       - USER
   *     description: withdrawFunds
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: login
   *         description: login
   *         in: body
   *         required: true
   *         schema:
   *           $ref: '#/definitions/withdraw'
   *     responses:
   *       200:
   *         description: Returns success message
   */
  async withdrawFunds(req, res, next) {
    try {
      const validationSchema = {
        amount: Joi.number().required(),
      };

      const validatedBody = await Joi.validate(req.body, validationSchema);

      let userResult = await findUser({
        _id: req.userId,
        userType: { $in: [userType.USER] },
        status: { $ne: status.DELETE },
      });

      if (!userResult) {
        throw apiError.notFound(responseMessage.USER_NOT_FOUND);
      }
      let updateRes = await withdraw(userResult._id, validatedBody.amount);
      return res.json(new response(updateRes, responseMessage.FUND_WITHDRAW));
    } catch (error) {
      return next(error);
    }
  }
  /**
   * @swagger
   * /wallet/transferFunds:
   *   post:
   *     tags:
   *       - USER
   *     description: transferFunds
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: login
   *         description: login
   *         in: body
   *         required: true
   *         schema:
   *           $ref: '#/definitions/transferFunds'
   *     responses:
   *       200:
   *         description: Returns success message
   */
  async transferFunds(req, res, next) {
    try {
      const validationSchema = {
        recipient: Joi.string().required(), 
        amount: Joi.number().required(),
      };

      const validatedBody = await Joi.validate(req.body, validationSchema);

      let userResult = await findUser({
        _id: req.userId,
        userType: { $in: [userType.USER] },
        status: { $ne: status.DELETE },
      });

      if (!userResult) {
        throw apiError.notFound(responseMessage.USER_NOT_FOUND);
      }
      let updateRes = await transferFunds(userResult._id, validatedBody.recipient, validatedBody.amount);
      return res.json(new response(updateRes, responseMessage.FUND_TRANSFER));
    } catch (error) {
      return next(error);
    }
  }
  /**
   * @swagger
   * /wallet/getWallet:
   *   post:
   *     tags:
   *       - USER
   *     description: getWallet
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: login
   *         description: login
   *         in: body
   *         required: true
   *         schema:
   *           $ref: '#/definitions/getWallet'
   *     responses:
   *       200:
   *         description: Returns success message
   */
  async getWallet(req, res, next) {
    try {
      let userResult = await findUser({
        _id: req.userId,
        userType: { $in: [userType.USER] },
        status: { $ne: status.DELETE },
      });

      if (!userResult) {
        throw apiError.notFound(responseMessage.USER_NOT_FOUND);
      }
      let walletRes = await getWallet(userResult._id);
      return res.json(new response(walletRes, responseMessage.WALLET_FOUND));
    } catch (error) {
      return next(error);
    }
  }
}

module.exports = walletController;
