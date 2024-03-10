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
      const promotion = await promotionModel.findOne({
        _id: promotionId,
        status: status.ACTIVE,
      });

      const wallet = await walletModel.findOne({
        ownerId: promotion.ownerId,
        status: status.ACTIVE,
      });

      if (!promotion) {
        throw apiError.notFound(responseMessage.PROMOTION_NOT_FOUND);
      }

      if (!wallet) {
        throw apiError.notFound(responseMessage.WALLET_NOT_FOUND);
      }

      if (promotion.clickedBy && promotion.clickedBy.includes(userId)) {
        throw apiError.forbidden(responseMessage.ALREADY_CLICKED);
      }

      const bidAmount = promotion.bidAmount;

      // Ensure bidAmount is a valid number
      if (isNaN(bidAmount)) {
        throw new Error("Invalid bidAmount value");
      }

      const updatedSpentAmount = promotion.spentAmount + bidAmount;

      // Ensure updatedSpentAmount is a valid number
      if (isNaN(updatedSpentAmount)) {
        throw new Error("Invalid updatedSpentAmount value");
      }

      const updatedBudget = promotion.budget - bidAmount;

      // Ensure updatedBudget is a valid number
      if (isNaN(updatedBudget)) {
        throw new Error("Invalid updatedBudget value");
      }

      console.log(
        "Budget type:",
        typeof promotion.budget,
        "Value:",
        promotion.budget
      );
      console.log(
        "Updated Budget type:",
        typeof updatedBudget,
        "Value:",
        updatedBudget
      );

      const updatedPromotion = await promotionModel.findByIdAndUpdate(
        promotionId,
        {
          $push: { clickedBy: userId },
          $inc: { clicks: 1 },
          $set: { spentAmount: updatedSpentAmount, budget: updatedBudget },
        },
        { new: true }
      );

      const updatedBalance = wallet.balance - bidAmount;

      console.log(
        "Balance type:",
        typeof wallet.balance,
        "Value:",
        wallet.balance
      );
      console.log(
        "Updated Balance type:",
        typeof updatedBalance,
        "Value:",
        updatedBalance
      );

      const updatedWallet = await walletModel.findByIdAndUpdate(
        wallet._id,
        {
          $set: { balance: updatedBalance },
        },
        { new: true }
      );

      if (updatedPromotion.bidAmount > updatedWallet.balance) {
        await promotionModel.findByIdAndUpdate(promotionId, {
          $set: { status: status.EXPIRED },
        });
      }

      console.log("Click updated successfully.");
      return updatedPromotion;
    } catch (error) {
      console.error("Error updating promotion:", error);
    }
  },
};

module.exports = { promotionServices };
