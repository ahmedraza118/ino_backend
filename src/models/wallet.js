const mongoose = require("mongoose");
const status = require("../enums/status");

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
    order_id: { type: String, default: null },
    entity: { type: String, default: null },
    currency: { type: String, default: null },
    status: { type: String, default: null },
    receipt: { type: String, default: null },
    attempts: { type: Number, default: null },
    notes: { type: Object, default: null },
    offer_id: { type: String, default: null },
    created_at: { type: Date, default: null },
  },
  { timestamps: true }
);

const walletSchema = new Schema(
  {
    balance: { type: Number, default: 0 },
    status: {type: String, default: status.ACTIVE},
    currency: {type: String, default: 'INR'},
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
