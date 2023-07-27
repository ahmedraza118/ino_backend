const serviceRequestModel = require("../../../../models/serviceRequest.js");
const status = require("../../../../enums/status.js");

const serviceRequestServices = {
  createServiceRequest: async (insertObj) => {
    return await serviceRequestModel.create(insertObj);
  },

  //create approval request
  //view request

  findServiceRequest: async (query) => {
    return await serviceRequestModel.findOne(query).populate("userId");
  },

  viewServiceRequestDetails: async (requestId) => {
    const request = await serviceRequestModel
      .findById(requestId)
      .populate("userId")
      .populate("postId");
    return request;
  },

  updateServiceRequestById: async (query, updateObj) => {
    return await serviceRequestModel.findByIdAndUpdate(query, updateObj, {
      new: true,
    });
  },

  serviceRequestList: async (query) => {
    return await serviceRequestModel.find(query).populate("userId");
  },
};

module.exports = { serviceRequestServices };
