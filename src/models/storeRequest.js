const mongoose = require("mongoose");
const { Schema } = mongoose;
const status = require('../enums/status.js');

const options = {
  collection: "storeRequest",
  timestamps: true
};

const schemaDefinition = new Schema(
  {
    message: { type: String },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'user'
    },
    type: { type: String }, // Added field to differentiate request type
    storeId: {
      type: Schema.Types.ObjectId,
      ref: 'store' // Reference to the associated product ID
    },
    status: { type: String, default: status.PENDING }
  },
  options
);

module.exports = mongoose.model("storeRequest", schemaDefinition);
