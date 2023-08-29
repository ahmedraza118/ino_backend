const cron = require("node-cron");
const User = require("../models/user"); // Import your User model here
const walletModel = require("../models/wallet"); // Import your User model here
const status = require("../enums/status");
const apiError = require("../helper/apiError");
const Promotion = require("../models/promotion"); // Import your Promotion model here
const responseMessage = require("../../assets/responseMessage");

module.exports = () => {
  // Define a cron schedule (e.g., daily at midnight)
  cron.schedule("0 0 * * *", async () => {
    try {
      // Find promotions that have ended
      const promotions = await Promotion.find({ status: status.ACTIVE });
      // Deduct amounts from user accounts for ended promotions
      for (const promotion of promotions) {
        // Calculate the end date for the promotion
        const endDate = new Date(
          promotion.createdAt.getTime() +
            promotion.duration * 24 * 60 * 60 * 1000
        );

        if (promotion.bidAmount > wallet.balance) {

          throw apiError.forbidden(responseMessage.LOW_BALANCE);
        }

        if (new Date() >= endDate) {
          // const wallet = await walletModel.findOne(
          //   { ownerId: promotion.ownerId },
          //   { status: status.ACTIVE }
          // );
          // if (!wallet) {
          //   apiError.notFound(responseMessage.DATA_NOT_FOUND)
          //   console.log(`User not found for promotion: ${promotion._id}`);
          //   continue;
          // }
          
          // // Deduct bidding amount from user's account
          // if (wallet.balance >= promotion.bidAmount) {
            //   // wallet.balance -= promotion.biddingAmount;
            //   // await wallet.save();
            //   console.log(`Amount deducted for promotion: ${promotion._id}`);
            // } else {
              //   console.log(`Insufficient funds for promotion: ${promotion._id}`);
              // }
              promotion.status = status.EXPIRED;
              await promotion.save();
        }
      }
    } catch (error) {
      console.error("Error in cron job:", error);
    }
  });
};
