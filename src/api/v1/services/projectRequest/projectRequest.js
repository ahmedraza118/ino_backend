const projectRequestModel = require("../../../../models/projectRequest.js");
const status = require("../../../../enums/status.js");

const projectRequestServices = {
  createProjectRequest: async (insertObj) => {
    return await projectRequestModel.create(insertObj);
  },

  //create approval request
  //view request

  findProjectRequest: async (query) => {
    return await projectRequestModel.findOne(query).populate("userId");
  },

  viewProjectRequestDetails: async (requestId) => {
    const request = await projectRequestModel
      .findById(requestId)
      .populate("userId")
      .populate("postId");
    return request;
  },

  updateProjectRequestById: async (query, updateObj) => {
    return await projectRequestModel.findByIdAndUpdate(query, updateObj, {
      new: true,
    });
  },

  projectRequestList: async (query) => {
    return await projectRequestModel.find(query).populate("userId");
  },
};

module.exports = { projectRequestServices };
