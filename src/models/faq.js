const mongoose = require("mongoose");
const { Schema } = mongoose;
const status = require('../enums/status.js');

const options = {
  collection: "faq",
  timestamps: true
};

const schemaDefination = new Schema(
  {
    question: { type: String },
    answer: { type: String },
    status: { type: String, default: status.ACTIVE }
  },
  options
);

module.exports = mongoose.model("faq", schemaDefination);
