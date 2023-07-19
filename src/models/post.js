const mongoose = require("mongoose");
const { Schema } = mongoose;
const status = require("../enums/status");
const mongoosePaginate = require("mongoose-paginate");
const mongooseAggregatePaginate = require("mongoose-aggregate-paginate");

const schemaDefination = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    // isSubscribed: {
    //   type: Boolean,
    //   default: false,
    // },
    creatorId: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    buyerId: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    previousCreatorId: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    likesUsers: [
      {
        type: Schema.Types.ObjectId,
        ref: "user",
      },
    ],
    likesCount: {
      type: Number,
      default: 0,
    },
    tag: [
      {
        type: Schema.Types.ObjectId,
        ref: "user",
      },
    ],
    comment: [
      {
        userId: {
          type: Schema.Types.ObjectId,
          ref: "user",
        },
        message: {
          type: String,
        },
        totalReply: {
          type: Number,
          default: 0,
        },
        likesUsers: [
          {
            type: Schema.Types.ObjectId,
            ref: "user",
          },
        ],
        likesCount: {
          type: Number,
          default: 0,
        },
        reportedId: [
          {
            type: Schema.Types.ObjectId,
            ref: "report",
          },
        ],
        time: { type: String },
        reply: [
          {
            userId: {
              type: Schema.Types.ObjectId,
              ref: "user",
            },
            commentId: {
              type: String,
            },
            message: {
              type: String,
            },
            reportedId: [
              {
                type: Schema.Types.ObjectId,
                ref: "report",
              },
            ],
            time: { type: String },
          },
        ],
      },
    ],
    totalComment: {
      type: Number,
      default: 0,
    },
    collectionId: {
      type: Schema.Types.ObjectId,
      ref: "collection",
    },
    amount: {
      type: String,
    },
    postTitle: {
      type: String,
    },
    mediaUrl: {
      type: String,
    },
    details: {
      type: String,
    },
    // postType: {
    //   type: String,
    //   enum: ["PRIVATE", "PUBLIC"],
    // },
    mediaType: {
      type: String,
      enum: ["TEXT", "MEDIA"],
    },
    bidId: {
      type: String,
    },
    isBuy: {
      type: Boolean,
      default: false,
    },
    isSold: {
      type: Boolean,
      default: false,
    },
    reportedId: [
      {
        type: Schema.Types.ObjectId,
        ref: "report",
      },
    ],
    likesReportCount: {
      type: Number,
      default: 0,
    },
    isauction: {
      type: Boolean,
      default: false,
    },
    isSubscribed: {
      type: Boolean,
      default: false,
    },
    isExport: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
    },
    // hashTagId: [
    //   {
    //     type: Schema.Types.ObjectId,
    //     ref: "hashTag",
    //   },
    // ],
    // hashTagCount: {
    //   type: Number,
    //   default: 0,
    // },
    // royality: { type: Number, default: 0 },
    isWatchList: { type: Boolean, default: false },
    reactOnPost: { type: Array },
    reactOnPostCount: {
      type: Number,
      default: 0,
    },
    status: { type: String, default: status.ACTIVE },
  },
  { timestamps: true }
);

schemaDefination.plugin(mongoosePaginate);
schemaDefination.plugin(mongooseAggregatePaginate);

module.exports = mongoose.model("post", schemaDefination);
