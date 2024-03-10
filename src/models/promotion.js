const mongoose = require("mongoose");
const { Schema } = mongoose;
const mongoosePaginate = require("mongoose-paginate");
const mongooseAggregatePaginate = require("mongoose-aggregate-paginate");

const options = {
  collection: "promotion",
  timestamps: true,
};

const promotionSchema = new Schema(
  {
    ownerId: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    postId: {
      type: Schema.Types.ObjectId,
      ref: "post",
    },
    serviceId: {
      type: Schema.Types.ObjectId,
      ref: "post",
    },
    jobId: {
      type: Schema.Types.ObjectId,
      ref: "reels",
    },
    projectId: {
      type: Schema.Types.ObjectId,
      ref: "auctionNft",
    },
    productId: {
      type: Schema.Types.ObjectId,
      ref: "auctionNft",
    },
    type: {
      type: String,
      enum: ["POST", "PROJECT", "PRODUCT", "JOB", "SERVICE", "CAMPAIGN"],
    },
    description: {
      type: String,
    },
    headline: {
      type: String,
    },
    photo: {
      type: String,
    },
    status: {
      type: String,
      enum: ["ACTIVE", "BLOCK", "DELETE", "EXPIRED"],
      default: "ACTIVE",
    },
    keyword: [
      {
        type: String,
      },
    ],
    bidAmount: {
      type: Number,
      required: true,
    },
    budget: {
      type: Number,
    },
    spentAmount: {
      type: Number,
    },
    clickedBy: [
      {
        type: Schema.Types.ObjectId,
        ref: "user",
      },
    ],
    clicks: {
      type: Number,
      default: 0,
    },
    duration: {
      type: Number,
      required: true,
    },
    startDate: {
      type: Date,
    },
  },
  options
);

promotionSchema.plugin(mongoosePaginate);
promotionSchema.plugin(mongooseAggregatePaginate);

module.exports = mongoose.model("promotion", promotionSchema);
