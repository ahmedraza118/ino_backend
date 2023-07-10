import Mongoose, { Schema } from "mongoose";
import status from '../enums/status.js';
import mongoosePaginate from "mongoose-paginate";

const options = {
    collection: "banner",
    timestamps: true
};

const schemaDefination = new Schema(
    {
        bannerTitle: { type: String },
        bannerDescription:{type:String},
        bannerImage:{type: String},
        status: { type: String, default: status.BLOCK }
    },
    options
);
schemaDefination.plugin(mongoosePaginate)
module.exports = Mongoose.model("banner", schemaDefination);

