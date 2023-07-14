const mongoose = require("mongoose");
const { Schema } = mongoose;
const mongoosePaginate = require("mongoose-paginate");
const mongooseAggregatePaginate = require("mongoose-aggregate-paginate");
const status = require("../enums/status");

const options = {
  collection: "fee",
  timestamps: true,
};

const feeModel = new Schema(
  {
    amount: { type: String },
    type: { type: String, enum: ["POST", "SUBCRIPTION", "SIGNUP", "REFERREL", "EXPORT", "DEPOSIT_MONEY", "WITHDRAW_MONEY"] },
    coins: [
      {
        coinName: { type: String },
        fee: { type: String },
      },
    ],
    status: { type: String, default: status.ACTIVE },
  },
  options
);
feeModel.plugin(mongoosePaginate);
feeModel.plugin(mongooseAggregatePaginate);

const Fee = mongoose.model("fee", feeModel);
module.exports = Fee;

(async () => {
  try {
    const result = await Fee.find({ status: status.ACTIVE }).exec();
    if (result.length !== 0) {
      console.log("Default fee already created.");
    } else {
      var obj1 = {
        amount: 0,
        type: "POST",
        status: status.ACTIVE,
      };
      var obj2 = {
        amount: 0,
        type: "SUBCRIPTION",
        status: status.ACTIVE,
      };

      var obj5 = {
        amount: 0,
        type: "SIGNUP",
        status: status.ACTIVE,
      };
      var obj6 = {
        amount: 0,
        type: "REFERREL",
        status: status.ACTIVE,
      };
      var obj7 = {
        amount: 0,
        type: "EXPORT",
        status: status.ACTIVE,
      };
      var obj8 = {
        amount: 100,
        type: "DEPOSIT_MONEY",
        status: status.ACTIVE,
      };
      var obj9 = {
        amount: 100,
        type: "WITHDRAW_MONEY",
        status: status.ACTIVE,
      };

      const staticResult = await Fee.create(obj1, obj2, obj5, obj6, obj7, obj8, obj9);
      console.log("Default fee created.", staticResult);
    }
  } catch (error) {
    console.error("Error occurred during default fee creation.", error);
  }
})();



