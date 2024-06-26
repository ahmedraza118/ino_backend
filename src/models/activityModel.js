const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");
const schema = mongoose.Schema;
var userActivityModel = new schema({
    userId: {
        type: schema.Types.ObjectId,
        ref: "user"
    },
    buyerId:{
        type: schema.Types.ObjectId,
        ref: "user"
    },
    nftId: {
        type: schema.Types.ObjectId,
        ref: "nft"
    },
    bidId:{
        type: schema.Types.ObjectId,
        ref: "bid"
    },
    storyId:{
        type: schema.Types.ObjectId,
        ref: "story"
    },
    reelsId:{
        type: schema.Types.ObjectId,
        ref: "reels"
    },
    collectionId:{
        type: schema.Types.ObjectId,
        ref: "collection"
    },
    collectionSubscriptionId:{
        type: schema.Types.ObjectId,
        ref: "collectionSubscription"
    },
    auctionId:{
        type: schema.Types.ObjectId,
        ref: "auctionNft"
    },
    collectionSubscriptionUserId:{
        type: schema.Types.ObjectId,
        ref: "user"
    },
    auctionNftId: {
        type: schema.Types.ObjectId,
        ref: "auctionNft"
    },
    orderId:{
        type: schema.Types.ObjectId,
        ref: "order"
    },
    trackingId:{
        type: schema.Types.ObjectId,
        ref: "tracking"
    },
    ratingModel:{
        type: schema.Types.ObjectId,
        ref: "rating"
    },
    postId:{
        type: schema.Types.ObjectId,
        ref: "post"
    },
    postPromotionId:{
        type: schema.Types.ObjectId,
        ref: "postPromotion"
    },
    title: {
        type: String,
    },
    desctiption: {
        type: String
    },
    type: {
        type: String,
        enum: ["EXPORT","COLLECTION", "RATING", "TRACKING", "FOLLOW", "UNFOLLOW", "AUCTION", "STORY","BUY", "LIKE", "DISLIKE", "HIDE", "UNHIDE", "COMMENT", "COMMENT_REPLY","POST","BID","BLOCK","UNBLOCK","UN_IGNORE","IGNORE","POSTPROMOTION","REPORT","SUBSCRIBE","STORYCOMMENT","REELS","SHARE"]
    },
    status: {
        type: String,
        enum: ["ACTIVE", "BLOCK", "DELETE"],
        default: "ACTIVE"
    },
   

}, { timestamps: true });

userActivityModel.plugin(mongoosePaginate);
module.exports = mongoose.model("userActivity", userActivityModel);
