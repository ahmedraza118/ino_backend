const mongoose = require("mongoose");
const status = require("../enums/status");

const options = {
  Collection: "logo",
  timestamps: true,
};

const { Schema } = mongoose;

const schemaDefination = new Schema(
  {
    logoImage: {
      type: String,
      default: "",
    },
    logoTitle: {
      type: String,
    },
    status: { type: String, default: status.ACTIVE },
  },
  options
);

module.exports = mongoose.model("logo", schemaDefination);
