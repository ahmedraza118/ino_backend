const mongoose = require("mongoose");
const { Schema } = mongoose;

const options = {
  collection: "wallet",
  timestamps: true,
};

// Define the Transaction schema (you can create a separate schema if needed)
const transactionSchema = new Schema(
  {
    amount: { type: Number, required: true },
    type: { type: String, enum: ['deposit', 'withdraw', 'purchase','transfer','receive'], required: true },
    // Add more fields relevant to your transaction history, like date, description, etc.
  },
  { timestamps: true }
);

const walletSchema = new Schema(
  {
    balance: { type: Number, default: 0 },
    ownerId: {
      type: Schema.Types.ObjectId,
      ref: "user", // Reference to the associated User model
    },
    transactionHistory: [transactionSchema],
  },
  options
);

const walletModel = mongoose.model("wallet", walletSchema);
module.exports = walletModel;
