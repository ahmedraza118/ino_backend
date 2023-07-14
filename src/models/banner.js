const mongoose = require("mongoose");
const { Schema } = mongoose;
const status = require('../enums/status.js');
const mongoosePaginate = require("mongoose-paginate");

const options = {
  collection: "banner",
  timestamps: true
};

const schemaDefination = new Schema(
  {
    bannerTitle: { type: String },
    bannerDescription: { type: String },
    bannerImage: { type: String },
    status: { type: String, default: status.BLOCK }
  },
  options
);

schemaDefination.plugin(mongoosePaginate);

module.exports = mongoose.model("banner", schemaDefination);
