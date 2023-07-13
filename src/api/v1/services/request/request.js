const requestModel = require("../../../models/request.js");
const status = require("../../../enums/status.js");

const requestServices = {
  createRequest: async (insertObj) => {
    return await requestModel.create(insertObj);
  },

  findRequest: async (query) => {
    return await requestModel.findOne(query).populate('userId');
  },

  updateRequestById: async (query, updateObj) => {
    return await requestModel.findByIdAndUpdate(query, updateObj, { new: true });
  },

  requestList: async (query) => {
    return await requestModel.find(query).populate('userId');
  },
};

module.exports = { requestServices };
