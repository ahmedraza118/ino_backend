const mongoose = require("mongoose");
const { Schema } = mongoose;
const status = require('../enums/status.js');

const options = {
  collection: "subscription",
  timestamps: true
};

const schemaDefination = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'user'
    },
    planId: {
      type: Schema.Types.ObjectId,
      ref: 'plan'
    },
    name: { type: String },
    duration: { type: String },
    validTillDate: { type: Date },
    amount: { type: String },
    fees: { type: String },
    isAlert: { type: Boolean, default: false },
    subscriptionStatus: { type: String, enum: [status.ACTIVE, status.EXPIRED], default: status.ACTIVE },
    status: { type: String, default: status.ACTIVE }
  },
  options
);

module.exports = mongoose.model("subscription", schemaDefination);
