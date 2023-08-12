const storeRequestModel = require("../../../../models/storeRequest.js");
const status = require("../../../../enums/status.js");

const storeRequestServices = {
  createStoreRequest: async (insertObj) => {
    return await storeRequestModel.create(insertObj);
  },

  //create approval request
  //view request

  findStoreRequest: async (query) => {
    return await storeRequestModel.findOne(query).populate("userId");
  },

  viewStoreRequestDetails: async (requestId) => {
    const request = await storeRequestModel
      .findById(requestId)
      .populate("userId")
      .populate("storeId");
    return request;
  },

  updateStoreRequestById: async (query, updateObj) => {
    return await storeRequestModel.findByIdAndUpdate(query, updateObj, {
      new: true,
    });
  },

  storeRequestList: async (query) => {
    return await storeRequestModel.find(query).populate("userId");
  },
};

module.exports = { storeRequestServices };
