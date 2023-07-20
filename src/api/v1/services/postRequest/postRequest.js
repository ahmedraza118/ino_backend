const postRequestModel = require("../../../../models/postRequest.js");
const status = require("../../../../enums/status.js");

const postRequestServices = {
  createPostRequest: async (insertObj) => {
    return await postRequestModel.create(insertObj);
  },

  //create approval request
  //view request

  findPostRequest: async (query) => {
    return await postRequestModel.findOne(query).populate("userId");
  },

  viewRequestDetails: async (requestId) => {
    const request = await postRequestModel
      .findById(requestId)
      .populate("userId")
      .populate("postId");
    return request;
  },

  updatePostRequestById: async (query, updateObj) => {
    return await postRequestModel.findByIdAndUpdate(query, updateObj, {
      new: true,
    });
  },

  postRequestList: async (query) => {
    return await postRequestModel.find(query).populate("userId");
  },
};

module.exports = { postRequestServices };
