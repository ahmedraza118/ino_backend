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
    creatorId: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    title: {
      type: String,
    },
    sector: {
      type: String,
    },
    profession: {
      type: String,
    },
    mediaUrl: {
      type: String,
    },
    description: {
      type: String,
    },
    salary: {
      type: String,
    },
    experience: {
      type: String,
    },
    skills : {
      type: String,
    },
    mediaType: {
      type: String,
      enum: ["TEXT", "MEDIA"],
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
    type: {
      type: String,
    },
    isWatchList: { type: Boolean, default: false },
    likesOnPostCount: {
      type: Number,
      default: 0,
    },
    status: { type: String, default: status.PENDING },

    // New attributes for the product schema
    // categorie: {
    //   type: Schema.Types.ObjectId,
    //   ref: "productCategorie", // Replace "category" with the actual model name for categories
    // },
    // subCategorie: {
    //   type: Schema.Types.ObjectId,
    //   ref: "productSubCategorie", // Replace "subCategory" with the actual model name for categories
    // },

    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
  },
  { timestamps: true }
);

schemaDefination.plugin(mongoosePaginate);
schemaDefination.plugin(mongooseAggregatePaginate);

module.exports = mongoose.model("job", schemaDefination);