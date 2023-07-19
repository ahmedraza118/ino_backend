const postRequestModel = require("../../../../models/postRequest.js");
const status = require("../../../../enums/status.js");

const postRequestServices = {
  createRequest: async (insertObj) => {
    return await postRequestModel.create(insertObj);
  },

//create approval request
//view request

  findRequest: async (query) => {
    return await postRequestModel.findOne(query).populate('userId');
  },

  updateRequestById: async (query, updateObj) => {
    return await postRequestModel.findByIdAndUpdate(query, updateObj, { new: true });
  },

  requestList: async (query) => {
    return await postRequestModel.find(query).populate('userId');
  },
};

module.exports = { postRequestServices };