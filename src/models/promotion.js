const mongoose = require("mongoose");
const { Schema } = mongoose;
const mongoosePaginate = require("mongoose-paginate");
const mongooseAggregatePaginate = require("mongoose-aggregate-paginate");

const options = {
  collection: "promotion",
  timestamps: true,
};

const reportSchema = new Schema(
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
      enum: ["PROMOTION"],
    },
    status: {
      type: String,
      enum: ["ACTIVE", "BLOCK", "DELETE","EXPIRED"],
      default: "ACTIVE",
    },
    bidAmount: {
        type: Number,
        required: true,
      },
    spentAmount: {
        type: Number,
        required: true,
      },
      clicks: {
        type: Number,
        default: 0,
      },
      duration: {
        type: Number,
        required: true,
      },
  },
  options
);

reportSchema.plugin(mongoosePaginate);
reportSchema.plugin(mongooseAggregatePaginate);

module.exports = mongoose.model("promotion", reportSchema);
