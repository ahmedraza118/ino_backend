const mongoose = require("mongoose");
const { Schema } = mongoose;
const status = require("../enums/status");
const mongoosePaginate = require("mongoose-paginate");
const mongooseAggregatePaginate = require("mongoose-aggregate-paginate");

const options = {
  collection: "identification",
  timestamps: true,
};

const schemaDefination = new Schema(
  {
    name: {
      type: String,
      default: "",
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    status: { type: String, default: status.ACTIVE },
  },
  options
);
schemaDefination.plugin(mongoosePaginate);
schemaDefination.plugin(mongooseAggregatePaginate);

module.exports = mongoose.model("identification", schemaDefination);
