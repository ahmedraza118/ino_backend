const mongoose = require("mongoose");
const { Schema } = mongoose;
const mongoosePaginate = require("mongoose-paginate");
const mongooseAggregatePaginate = require("mongoose-aggregate-paginate");

const options = {
  collection: "report",
  timestamps: true,
};

const reportSchema = new Schema(
  {
    postId: {
      type: Schema.Types.ObjectId,
      ref: "post",
    },
    commentId: {
      type: Schema.Types.ObjectId,
      ref: "post",
    },
    reelsId: {
      type: Schema.Types.ObjectId,
      ref: "reels",
    },
    auctionId: {
      type: Schema.Types.ObjectId,
      ref: "auctionNft",
    },
    auctionNftId: {
      type: Schema.Types.ObjectId,
      ref: "auctionNft",
    },
    orderId: {
      type: Schema.Types.ObjectId,
      ref: "order",
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    userName: {
      type: String,
    },
    message: {
      type: String,
    },
    actionApply: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      enum: ["POST", "AUCTION", "REELS"],
    },
    status: {
      type: String,
      enum: ["ACTIVE", "BLOCK", "DELETE"],
      default: "ACTIVE",
    },
  },
  options
);

reportSchema.plugin(mongoosePaginate);
reportSchema.plugin(mongooseAggregatePaginate);

module.exports = mongoose.model("report", reportSchema);
