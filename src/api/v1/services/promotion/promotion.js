const promotionModel = require("../../../../models/promotion.js");
const status = require("../../../../enums/status.js");

const promotionServices = {
  createPromotion: async (insertObj) => {
    return await promotionModel.create(insertObj);
  },

  findPromotion: async (query) => {
    return await promotionModel.findOne(query);
  },

  findAllPromotion: async (query) => {
    query.status = { $ne: status.DELETE };
    return await promotionModel.find(query);
  },

  updatePromotion: async (query, updateObj) => {
    return await promotionModel.findOneAndUpdate(query, updateObj, { new: true });
  },

  updatePromotionById: async (query, updateObj) => {
    return await promotionModel.findByIdAndUpdate(query, updateObj, { new: true });
  },

  updateManyPromotion: async (query, updateObj) => {
    return await promotionModel.updateMany(query, updateObj, { new: true });
  },

};

module.exports = { promotionServices };
