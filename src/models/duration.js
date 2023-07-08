const mongoose = require("mongoose");
const { Schema } = mongoose;
const status = require("../enums/status");
const mongoosePaginate = require("mongoose-paginate");
const mongooseAggregatePaginate = require("mongoose-aggregate-paginate");

const options = {
  collection: "duration",
  timestamps: true,
};

const schemaDefination = new Schema(
  {
    amount: { type: String },
    duration: { type: String },
    status: { type: String, default: status.ACTIVE },
  },
  options
);
schemaDefination.plugin(mongoosePaginate);
schemaDefination.plugin(mongooseAggregatePaginate);

module.exports = mongoose.model("duration", schemaDefination);
