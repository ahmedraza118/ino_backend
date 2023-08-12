const jobRequestModel = require("../../../../models/jobRequest.js");
const status = require("../../../../enums/status.js");

const jobRequestServices = {
  createJobRequest: async (insertObj) => {
    return await jobRequestModel.create(insertObj);
  },

  //create approval request
  //view request

  findJobRequest: async (query) => {
    return await jobRequestModel.findOne(query).populate("userId");
  },

  viewJobRequestDetails: async (requestId) => {
    const request = await jobRequestModel
      .findById(requestId)
      .populate("userId")
      .populate("jobId");
    return request;
  },

  updateJobRequestById: async (query, updateObj) => {
    return await jobRequestModel.findByIdAndUpdate(query, updateObj, {
      new: true,
    });
  },

  jobRequestList: async (query) => {
    return await jobRequestModel.find(query).populate("userId");
  },
};

module.exports = { jobRequestServices };
