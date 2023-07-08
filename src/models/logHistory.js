const mongoose = require('mongoose');
const { Schema } = mongoose;
const mongoosePaginate = require('mongoose-paginate');
const mongooseAggregatePaginate = require('mongoose-aggregate-paginate');
const status = require('../enums/status');
const userType = require('../enums/userType');

const options = {
  collection: 'logHistory',
  timestamps: true,
};

const schemaDefination = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
    ip_Address: { type: String },
    browser: { type: String },
    location_place: { type: String },
    email: { type: String },
    userType: { type: String, default: userType.USER },
    status: { type: String, default: status.ACTIVE },
  },
  options
);

schemaDefination.plugin(mongoosePaginate);
schemaDefination.plugin(mongooseAggregatePaginate);

module.exports = mongoose.model('logHistory', schemaDefination);
