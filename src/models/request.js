import Mongoose, { Schema } from "mongoose";
import status from '../enums/status.js';

const options = {
    collection: "request",
    timestamps: true
};

const schemaDefination = new Schema(
    {
        message: { type: String },
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'user'
        },
        status: { type: String, default: status.ACTIVE }
    },
    options
);

module.exports = Mongoose.model("request", schemaDefination);