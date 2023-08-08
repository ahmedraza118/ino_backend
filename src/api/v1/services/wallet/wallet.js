const walletModel = require("../../../../models/wallet");
const status = require("../../../../enums/status.js");
const apiError = require("../../../../helper/apiError");
const responseMessage = require("../../../../../assets/responseMessage");


const walletServices = {
  createWallet: async (userId) => {
    try {
      const newWallet = new walletModel({
        balance: 0,
        ownerId: userId,
        transactionHistory: [],
      });

      const createdWallet = await newWallet.save();
      return createdWallet;
    } catch (error) {
      console.error("Error creating wallet:", error.message);
      throw error;
    }
  },

  deposit: async (userId, amount) => {
    try {
      const userWallet = await walletModel.findOne({ ownerId: userId });

      if (!userWallet) {
        throw apiError.notFound(responseMessage.WALLET_NOT_FOUND);
      }

      // Update the balance and transaction history
      userWallet.balance += amount;
      userWallet.transactionHistory.push({
        amount: amount,
        type: "deposit",
      });

      const updatedWallet = await userWallet.save();
      return updatedWallet;
    } catch (error) {
      console.error("Error depositing funds:", error.message);
      throw error;
    }
  },

  withdraw: async (userId, amount) => {
    try {
      const userWallet = await walletModel.findOne({ ownerId: userId });

      if (!userWallet) {
        throw apiError.notFound(responseMessage.WALLET_NOT_FOUND);
      }

      if (userWallet.balance < amount) {
        throw apiError.forbidden(responseMessage.INSUFICIENT_FUNDS);
      }

      // Update the balance and transaction history
      userWallet.balance -= amount;
      userWallet.transactionHistory.push({
        amount: amount,
        type: "withdraw",
      });

      const updatedWallet = await userWallet.save();
      return updatedWallet;
    } catch (error) {
      console.error("Error withdrawing funds:", error.message);
      throw error;
    }
  },

  getWallet: async (userId) => {
    try {
      const userWallet = await walletModel.findOne({ ownerId: userId });

      if (!userWallet) {
        throw apiError.notFound(responseMessage.WALLET_NOT_FOUND);
      }

      return userWallet;
    } catch (error) {
      console.error("Error getting wallet details:", error.message);
      throw error;
    }
  },

  transferFunds: async (senderId, recipientId, amount) => {
    try {
      const senderWallet = await walletModel.findOne({ ownerId: senderId });
      const recipientWallet = await walletModel.findOne({ ownerId: recipientId });
  
      if (!senderWallet) {
        throw apiError.notFound(responseMessage.WALLET_NOT_FOUND);
      }
  
      if (!recipientWallet) {
        throw apiError.notFound(responseMessage.WALLET_NOT_FOUND);
      }
  
      if (senderWallet.balance < amount) {
        throw apiError.forbidden(responseMessage.INSUFICIENT_FUNDS);
      }
  
      // Update sender's wallet balance and transaction history
      senderWallet.balance -= amount;
      senderWallet.transactionHistory.push({
        amount: -amount,
        type: "transfer",
        recipient: recipientId,
      });
  
      // Update recipient's wallet balance and transaction history
      recipientWallet.balance += amount;
      recipientWallet.transactionHistory.push({
        amount: amount,
        type: "receive",
        sender: senderId,
      });
  
      // Save both wallet documents
      await senderWallet.save();
      await recipientWallet.save();
  
      return { senderWallet, recipientWallet };
    } catch (error) {
      console.error("Error transferring funds:", error.message);
      throw error;
    }
  },

}

module.exports = { walletServices };
