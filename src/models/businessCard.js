const mongoose = require("mongoose");
const { Schema } = mongoose;
const status = require('../enums/status.js');
const mongoosePaginate = require("mongoose-paginate");

const options = {
  collection: "businessCard",
  timestamps: true
};

const schemaDefination = new Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    name: { type: String },
    identification: { type: String },
    location: { type: String },
    email: { type: String },
    phoneNumber: { type: String },
    companyName: { type: String },
    position: { type: String },
    website: { type: String },
    socialLink: { type: String },
    status: { type: String, default: status.ACTIVE }
  },
  options
);

schemaDefination.plugin(mongoosePaginate);

const businessCardModel = mongoose.model("businessCard", schemaDefination);
module.exports = businessCardModel;