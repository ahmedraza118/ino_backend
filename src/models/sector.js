const mongoose = require("mongoose");
const { Schema } = mongoose;
const status = require("../enums/status.js");

const options = {
  collection: "sector",
  timestamps: true,
};

const schemaDefination = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
    },
    status: { type: String, default: status.ACTIVE },
  },
  options
);

module.exports = mongoose.model("sector", schemaDefination);
