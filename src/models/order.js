// import Mongoose, { Schema } from "mongoose";
// import status from '../enums/status';
// import mongoosePaginate from "mongoose-paginate";
// import mongooseAggregatePaginate from "mongoose-aggregate-paginate";
// const options = {
//     collection: "order",
//     timestamps: true
// };

// const schemaDefination = new Schema(
//     {
//         userId: {
//             type: Schema.Types.ObjectId,
//             ref: 'user'
//         },
//         nftId: {
//             type: Schema.Types.ObjectId,
//             ref: 'nft'
//         },
//         bidId: [{
//             type: Schema.Types.ObjectId,
//             ref: 'bid'
//         }],
//         buyerId: {
//             type: Schema.Types.ObjectId,
//             ref: 'user'
//         },
//         creatorId: {
//             type: Schema.Types.ObjectId,
//             ref: 'user'
//         },
//         auctionNftId: {
//             type: Schema.Types.ObjectId,
//             ref: 'auctionNft'
//         },
//         title: {
//             type: String
//         },
//         mediaUrl: {
//             type: String
//         },
//         mediaType: {
//             type: String
//         },
//         details: {
//             type: String
//         },
//         time: {
//             type: String
//         },
//         tokenId: {
//             type: String
//         },
//         duration: {
//             type: String
//         },
//         startingBid: {
//             type: String
//         },
//         orderPlace: {
//             type: Boolean,
//             default: false
//         },
//         isSold: {
//             type: Boolean,
//             default: false
//         },
//         isBuy: {
//             type: Boolean,
//             default: false
//         },
//         likesUsers: [{
//             type: Schema.Types.ObjectId,
//             ref: 'user'
//         }],
//         likesCount: {
//             type: Number,
//             default: 0
//         },
//         orderblockedByUser: [{
//             type: Schema.Types.ObjectId,
//             ref: 'user'
//           }],
//         auctionStatus: {
//             type: String,
//             enum: ["RUNNING", "STOPPED"],
//             default: "RUNNING"
//         },
//         status: { type: String, default: status.ACTIVE }
//     },
//     options
// );

// schemaDefination.plugin(mongoosePaginate);
// schemaDefination.plugin(mongooseAggregatePaginate);
// module.exports = Mongoose.model("order", schemaDefination);



