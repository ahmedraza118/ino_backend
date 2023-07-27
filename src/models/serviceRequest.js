const mongoose = require("mongoose");
const { Schema } = mongoose;
const status = require('../enums/status.js');

const options = {
  collection: "serviceRequest",
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
    serviceId: {
      type: Schema.Types.ObjectId,
      ref: 'service' // Reference to the associated product ID
    },
    status: { type: String, default: status.PENDING }
  },
  options
);

module.exports = mongoose.model("serviceRequest", schemaDefinition);
