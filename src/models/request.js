const mongoose = require("mongoose");
const { Schema } = mongoose;
const status = require('../enums/status.js');

const options = {
  collection: "request",
  timestamps: true
};

const schemaDefination = new Schema(
  {
    message: { type: String },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'user'
    },
    status: { type: String, default: status.ACTIVE }
  },
  options
);

module.exports = mongoose.model("request", schemaDefination);
