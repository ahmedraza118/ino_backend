const productRequestModel = require("../../../../models/productRequest.js");
const status = require("../../../../enums/status.js");

const productRequestServices = {
  createProductRequest: async (insertObj) => {
    return await productRequestModel.create(insertObj);
  },

  //create approval request
  //view request

  findProductRequest: async (query) => {
    return await productRequestModel.findOne(query).populate("userId");
  },

  viewProductRequestDetails: async (requestId) => {
    const request = await productRequestModel
      .findById(requestId)
      .populate("userId")
      .populate("productId");
    return request;
  },

  updateProductRequestById: async (query, updateObj) => {
    return await productRequestModel.findByIdAndUpdate(query, updateObj, {
      new: true,
    });
  },

  productRequestList: async (query) => {
    return await productRequestModel.find(query).populate("userId");
  },
};

module.exports = { productRequestServices };
