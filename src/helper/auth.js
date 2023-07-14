const config = require("config");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user");
const apiError = require("./apiError");
const responseMessage = require("../../assets/responseMessage");

module.exports = {
  verifyToken: async function (req, res, next) {
    console.log("In verify token! ");
    try {
      if (req.headers.token) {
        let result;
        try {
          result = jwt.verify(req.headers.token, config.get("jwtsecret"));
        } catch (error) {
          throw apiError.unauthorized(responseMessage.INVALID_TOKEN);
        }

        if (result && result["id"]) {
          let user = await userModel.findOne({ _id: result.id });
          if (!user) {
            throw apiError.notFound(responseMessage.USER_NOT_FOUND);
          } else {
            if (user.status === "BLOCK") {
              throw apiError.forbidden(responseMessage.NOT_ALLOWED);
            } else if (user.status === "DELETE") {
              throw apiError.unauthorized(responseMessage.DELETE_BY_ADMIN);
            } else {
              req.userId = result.id;
              req.userDetails = result;
              console.log("Token verified! ");
              next();
            }
          }
        } else {
          throw apiError.badRequest(responseMessage.NO_TOKEN);
        }
      } else {
        throw apiError.unauthorized(responseMessage.NO_TOKEN);
      }
    } catch (error) {
      return next(error);
    }
  },

  verifyTokenBySocket: function (token) {
    return new Promise(function (resolve, reject) {
      try {
        if (token) {
          jwt.verify(token, config.get("jwtsecret"), function (err, result) {
            if (err) {
              reject(apiError.unauthorized());
            } else {
              userModel.findOne({ _id: result.id }, function (error, result2) {
                if (error)
                  reject(apiError.internal(responseMessage.INTERNAL_ERROR));
                else if (!result2) {
                  reject(apiError.notFound(responseMessage.USER_NOT_FOUND));
                } else {
                  if (result2.status == "BLOCK") {
                    reject(apiError.forbidden(responseMessage.BLOCK_BY_ADMIN));
                  } else if (result2.status == "DELETE") {
                    reject(
                      apiError.unauthorized(responseMessage.DELETE_BY_ADMIN)
                    );
                  } else {
                    resolve(result.id);
                  }
                }
              });
            }
          });
        } else {
          reject(apiError.badRequest(responseMessage.NO_TOKEN));
        }
      } catch (e) {
        reject(e);
      }
    });
  },
};
