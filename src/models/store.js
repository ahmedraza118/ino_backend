const mongoose = require("mongoose");
const { Schema } = mongoose;
const status = require("../enums/status.js");
const storeType = require("../enums/storeType.js");

const options = {
  collection: "store",
  timestamps: true,
};

// Define the item schema
const itemSchema = new Schema({
  name: { type: String },
  description: { type: String },
  price: { type: Number },
  photo: { type: String },
});

const schemaDefination = new Schema(
  {
    ownerId: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    status: { type: String, default: status.PENDING },
    message: { type: String },
    type: { type: String, default: storeType.STORE },
    banner: { type: String },
    name: { type: String },
    location: { type: String },
    catalogue: [itemSchema],  
    timing: { type: String },
    phoneNumber: { type: String },
    mail: { type: String },
    established: { type: String },
    awards: [{ type: String }],
    certificates: [{ type: String }],
    facebook: { type: String },
    twitter: { type: String },
    instagram: { type: String },
    linkedIn: { type: String },
    website: { type: String },
  },
  options
);

const storeModel = mongoose.model("store", schemaDefination);
module.exports = storeModel;
