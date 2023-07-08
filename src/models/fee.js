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
    type: { type: String, enum: ["COLLECTION", "POST", "SUBCRIPTION", "AUCTION", "COIN-FEE", "SIGNUP", "REFERREL", "EXPORT", "DEPOSIT_TOKEN", "WITHDRAW_TOKEN"] },
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

Fee.find({ status: status.ACTIVE }, async (err, result) => {
  if (err) {
    console.log("Default fee creation error", err);
  } else if (result.length != 0) {
    console.log("Default fee already created.");
  } else {
    var obj = {
      amount: 0,
      type: "COLLECTION",
      status: status.ACTIVE,
    };
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
    var obj3 = {
      amount: 0,
      type: "AUCTION",
      status: status.ACTIVE,
    };
    var obj4 = {
      type: "COIN-FEE",
      coins: [
        {
          coinName: 'BNB',
          fee: 0.01,
        },
      ],
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
      type: "DEPOSIT_TOKEN",
      status: status.ACTIVE,
    };
    var obj9 = {
      amount: 100,
      type: "WITHDRAW_TOKEN",
      status: status.ACTIVE,
    };
    Fee.create(obj, obj1, obj2, obj3, obj4, obj5, obj6, obj7, obj8, obj9, (err1, staticResult) => {
      if (err1) {
        console.log("Default fee error.", err1);
      } else {
        console.log("Default fee created.", staticResult);
      }
    });
  }
});

module.exports = Fee;
