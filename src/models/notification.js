const mongoose = require("mongoose");
const { Schema } = mongoose;
const status = require("../enums/status");
const mongoosePaginate = require("mongoose-paginate");
const mongooseAggregatePaginate = require("mongoose-aggregate-paginate");

const options = {
  collection: "notification",
  timestamps: true,
};

const schemaDefination = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    adminId: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    likeBy: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    bidBy: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    buyId: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    bidId: {
      type: Schema.Types.ObjectId,
      ref: "bid",
    },
    commentBy: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    nftIds: [
      {
        type: Schema.Types.ObjectId,
        ref: "auctionNft",
      },
    ],
    auctionId: {
      type: Schema.Types.ObjectId,
      ref: "auctionNft",
    },
    orderId: {
      type: Schema.Types.ObjectId,
      ref: "order",
    },
    chatId: {
      type: Schema.Types.ObjectId,
      ref: "chatting",
    },
    subscriberId: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    reportedBy: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    planId: {
      type: Schema.Types.ObjectId,
      ref: "plan",
    },
    postId: {
      type: Schema.Types.ObjectId,
      ref: "post",
    },
    promotionId: {
      type: Schema.Types.ObjectId,
      ref: "postPromotion",
    },
    reelsId: {
      type: Schema.Types.ObjectId,
      ref: "reels",
    },
    collectionId: {
      type: Schema.Types.ObjectId,
      ref: "collection",
    },
    subscriptionId: {
      type: Schema.Types.ObjectId,
      ref: "collectionSubscription",
    },
    storyId: {
      type: Schema.Types.ObjectId,
      ref: "story",
    },
    transactionId: {
      type: Schema.Types.ObjectId,
      ref: "transaction",
    },
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    image: {
      type: String,
    },
    walletAddress: {
      type: String,
    },
    notificationType: {
      type: String,
      enum: [
        "EXPORT_POST",
        "POST_COMMENT",
        "SUBCRIPTION_LIKE",
        "STORY_COMMENT",
        "FOLLOW",
        "LIKE_AUCTION",
        "AMOUNT_DEPOSIT",
        "AMOUNT_WITHDRAW",
        "POST_LIKE",
        "POST_PROMOTION_LIKE",
        "POST_PROMOTION_COMMENT",
        "REEL_COMMENT",
        "REEL_LIKE",
        "STORY_LIKE",
        "USER_LIKE",
        "COLLECTION_LIKE",
        "BUY_POST",
        "BUY_AUCTION",
        "BID_ACCEPT",
        "BID_REJECT",
        "BID_AUCTION",
      ],
    },
    isRead: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      default: status.ACTIVE,
    },
  },
  options
);

schemaDefination.plugin(mongoosePaginate);
schemaDefination.plugin(mongooseAggregatePaginate);

module.exports = mongoose.model("notification", schemaDefination);
