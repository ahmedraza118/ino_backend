const businessCardModel = require("../../../../models/businessCard.js");
const status = require("../../../../enums/status.js");

const businessCardServices = {
  createBusinessCard: async (insertObj) => {
    return await businessCardModel.create(insertObj);
  },

  findBusinessCard: async (query) => {
    return await businessCardModel.findOne(query);
  },

  findAllBusinessCard: async () => {
    let query = { status: { $ne: status.DELETE } };
    return await businessCardModel.find(query);
  },

  updateBusinessCard: async (query, updateObj) => {
    return await businessCardModel.findOneAndUpdate(query, updateObj, { new: true });
  },

  updateBusinessCardById: async (query, updateObj) => {
    return await businessCardModel.findByIdAndUpdate(query, updateObj, { new: true });
  },
};

module.exports = { businessCardServices };
