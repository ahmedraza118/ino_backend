const mongoose = require("mongoose");
const { Schema } = mongoose;
const status = require('../enums/status.js');

const options = {
  collection: "disappear",
  timestamps: true,
};

const appearModel = new Schema(
  {
    disappear: { type: Boolean, default: false },
    time: { type: Number, default: 0 },
    senderId: {
      type: Schema.Types.ObjectId,
      ref: 'user'
    },
    receiverId: {
      type: Schema.Types.ObjectId,
      ref: 'user'
    },
    status: { type: String, default: status.ACTIVE },
  },
  options
);

module.exports = mongoose.model("disappear", appearModel);
