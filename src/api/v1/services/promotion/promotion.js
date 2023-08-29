const promotionModel = require("../../../../models/promotion.js");
const walletModel = require("../../../../models/wallet.js");
const status = require("../../../../enums/status.js");
const apiError = require("../../../../helper/apiError");
const responseMessage = require("../../../../../assets/responseMessage");
const promotionServices = {
  createPromotion: async (insertObj) => {
    return await promotionModel.create(insertObj);
  },

  findPromotion: async (query) => {
    return await promotionModel.findOne(query);
  },

  findAllPromotion: async (query) => {
    return await promotionModel.find(query);
  },
  fetchAllPromotionList: async () => {
    return await promotionModel.find({});
  },

  updatePromotion: async (query, updateObj) => {
    return await promotionModel.findOneAndUpdate(query, updateObj, {
      new: true,
    });
  },

  updatePromotionById: async (query, updateObj) => {
    return await promotionModel.findByIdAndUpdate(query, updateObj, {
      new: true,
    });
  },

  updateManyPromotion: async (query, updateObj) => {
    return await promotionModel.updateMany(query, updateObj, { new: true });
  },

  recordClickAndUpdatePromotion: async (promotionId, userId) => {
    try {
      const promotion = await promotionModel.find({
        _id: promotionId,
        status: status.ACTIVE,
      });
      const wallet = await walletModel.find({
        ownerId: promotion.ownerId,
        status: status.ACTIVE,
      });
      if (!promotion) {
        throw apiError.notFound(responseMessage.PROMOTION_NOT_FOUND);
      }
      if (!wallet) {
        throw apiError.notFound(responseMessage.WALLET_NOT_FOUND);
      }
      if (promotion.clickedBy.includes(userId)) {
        throw apiError.forbidden(responseMessage.ALREADY_CLICKED);
      }
      const bidAmount = promotion.bidAmount;
      
      // Update the promotion with new click and add user to clickedBy
      const updatedPromotion = await promotionModel.findByIdAndUpdate(promotionId, {
        $push: { clickedBy: userId },
        $inc: { clicks: 1, spentAmount: bidAmount, budget: - bidAmount },
      });
      const updatedWallet = await walletModel.findByIdAndUpdate(wallet._id, {
        $inc: {balance: -bidAmount },
      });

      if (updatedPromotion.bidAmount > updatedWallet.balance) {
        const updatedPromotion = await promotionModel.findByIdAndUpdate(promotionId, {
          $set: { status: status.EXPIRED},
        });
      console.log("Click updated successfully.");
      return updatedPromotion;
      }
      console.log("Click updated successfully.");
      return updatedPromotion;
    } catch (error) {
      console.error("Error updating promotion:", error);
    }
  },
};

module.exports = { promotionServices };
