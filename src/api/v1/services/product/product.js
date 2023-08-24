const productModel = require("../../../../models/post");
const status = require("../../../../enums/status");
const apiError = require("../../../../helper/apiError");
const responseMessage = require("../../../../../assets/responseMessage");


const productServices = {
  createUserProduct: async (insertObj) => {
    return await productModel.create(insertObj);
  },

  findOneProduct: async (query) => {
    return await productModel
      .findOne(query)
      .populate("userId comment.userId comment.reply.userId");
  },

  updateProduct: async (query, updateObj) => {
    return await productModel.findOneAndUpdate(query, updateObj, { new: true });
  },

  rateProduct: async (userId, productId, rating) => {
    try {
      // Fetch the product by its ID
      const product = await productModel.findById(productId);
      if (!product) {
        throw apiError.notFound(responseMessage.DATA_NOT_FOUND);
      }

      // Check if the user has already rated the product
      const userRatingIndex = product.userRatings.findIndex((userRating) =>
        userRating.userId.equals(userId)
      );
      if (userRatingIndex !== -1) {
        throw apiError.badRequest(responseMessage.ALREADY_RATED);
      } 
      product.userRatings.push({ userId: userId, rating });
      // Update the average rating
      const totalRatings = product.userRatings.length;
      const sumRatings = product.userRatings.reduce(
        (sum, userRating) => sum + userRating.rating,
        0
      );
      const averageRating = sumRatings / totalRatings;

      // Update the product
      const updatedProduct = await productModel.findOneAndUpdate(
        { _id: productId },
        { $set: { userRatings: product.userRatings, rating: averageRating } }
      );

      return updatedProduct;
    } catch (error) {
      throw error;
    }
  },

  listProduct: async (query) => {
    return await productModel.find(query);
  },
  findProductCount: async (query) => {
    return await productModel.count(query);
  },
  paginateProductSearch: async (validatedBody) => {
    let query = { status: status.ACTIVE, userId: validatedBody.userId };
    const { search, fromDate, toDate, page, limit } = validatedBody;
    if (search) {
      query.$or = [
        { postTitle: { $regex: search, $options: "i" } },
        { postType: { $regex: search, $options: "i" } },
      ];
    }
    if (fromDate && !toDate) {
      query.createdAt = { $gte: fromDate };
    }
    if (!fromDate && toDate) {
      query.createdAt = { $lte: toDate };
    }
    if (fromDate && toDate) {
      query.$and = [
        { createdAt: { $gte: fromDate } },
        { createdAt: { $lte: toDate } },
      ];
    }
    let options = {
      page: parseInt(page) || 1,
      limit: parseInt(limit) || 10,
      sort: { createdAt: -1 },
      populate: "userId comment.userId comment.reply.userId",
    };
    return await productModel.paginate(query, options);
  },
  paginateAllProductSearch: async (validatedBody) => {
    let query = validatedBody;
    const { search, fromDate, toDate, page, limit } = validatedBody;
    if (search) {
      query.$or = [
        { postTitle: { $regex: search, $options: "i" } },
        { postType: { $regex: search, $options: "i" } },
      ];
    }
    if (fromDate && !toDate) {
      query.createdAt = { $gte: fromDate };
    }
    if (!fromDate && toDate) {
      query.createdAt = { $lte: toDate };
    }
    if (fromDate && toDate) {
      query.$and = [
        { createdAt: { $gte: fromDate } },
        { createdAt: { $lte: toDate } },
      ];
    }
    let options = {
      page: parseInt(page) || 1,
      limit: parseInt(limit) || 10,
      sort: { createdAt: -1 },
      populate: "userId comment.userId comment.reply.userId",
    };
    if (query["page"]) {
      delete query["page"];
    }
    if (query["limit"]) {
      delete query["limit"];
    }
    if (query["search"]) {
      delete query["search"];
    }
    if (query["fromDate"]) {
      delete query["fromDate"];
    }
    if (query["toDate"]) {
      delete query["toDate"];
    }
    // let aggregate = productModel.aggregate([
    //     {
    //         $match: query
    //     },
    //     {
    //         $unwind: {
    //             path: '$comment'
    //         }
    //     },
    //     {
    //         $unwind: {
    //             path: '$comment.reply'
    //         }
    //     },
    //     {
    //         $lookup:
    //         {
    //             from: "user",
    //             localField: "comment.reply.userId",
    //             foreignField: "_id",
    //             as: "comment.reply.userId"
    //         }
    //     },
    //     // {
    //     //     $lookup:
    //     //     {
    //     //         from: "user",
    //     //         localField: "comment.userId",
    //     //         foreignField: "_id",
    //     //         as: "comment.userId"
    //     //     }
    //     // },
    //     // {
    //     //     $lookup:
    //     //     {
    //     //         from: "user",
    //     //         localField: "userId",
    //     //         foreignField: "_id",
    //     //         as: "userId"
    //     //     }
    //     // },
    //     {
    //         $group : {
    //             _id : '$_id',
    //             // comment:{$push:'$reply'},
    //             reply:{$push:'$comment.reply'},

    //          }
    //     },
    //     {
    //         $addFields: {
    //             isSubscribed: false,
    //         }
    //     }
    // ]);
    console.log("94 ==>", query);
    return await productModel.paginate(query, options);
  },

  paginateProductSearchBuy: async (validatedBody) => {
    let query = {
      status: status.ACTIVE,
      isBuy: true,
      buyerId: validatedBody.userId,
    };
    const { search, fromDate, toDate, page, limit } = validatedBody;
    if (search) {
      query.$or = [
        { postTitle: { $regex: search, $options: "i" } },
        { postType: { $regex: search, $options: "i" } },
      ];
    }
    if (fromDate && !toDate) {
      query.createdAt = { $gte: fromDate };
    }
    if (!fromDate && toDate) {
      query.createdAt = { $lte: toDate };
    }
    if (fromDate && toDate) {
      query.$and = [
        { createdAt: { $gte: fromDate } },
        { createdAt: { $lte: toDate } },
      ];
    }
    let options = {
      page: parseInt(page) || 1,
      limit: parseInt(limit) || 10,
      sort: { createdAt: -1 },
      populate: "userId buyerId comment.userId comment.reply.userId",
      // populate: { path: 'userId comment.userId' }
    };
    if (query["page"]) {
      delete query["page"];
    }
    if (query["limit"]) {
      delete query["limit"];
    }
    if (query["search"]) {
      delete query["search"];
    }
    if (query["fromDate"]) {
      delete query["fromDate"];
    }
    if (query["toDate"]) {
      delete query["toDate"];
    }
    let aggregate = productModel.aggregate([
      {
        $match: query,
      },
      {
        $lookup: {
          from: "user",
          localField: "userId",
          foreignField: "_id",
          as: "userId",
        },
      },
      {
        $lookup: {
          from: "user",
          localField: "buyerId",
          foreignField: "_id",
          as: "buyerId",
        },
      },
      {
        $lookup: {
          from: "user",
          localField: "comment.userId",
          foreignField: "_id",
          as: "comment-userId",
        },
      },
      {
        $lookup: {
          from: "user",
          localField: "comment.reply.userId",
          foreignField: "_id",
          as: "comment-reply-userId",
        },
      },
      {
        $addFields: {
          isSubscribed: false,
        },
      },
    ]);
    console.log("94 ==>", query);
    return await productModel.aggregatePaginate(aggregate, options);
  },

  collectionProductList: async (query) => {
    query.isReported = { $ne: true };
    return await productModel
      .find(query)
      .populate([{ path: "nftId userId currentOwner" }]);
  },

  paginateAllProductSearchPrivatePublic: async (validatedBody) => {
    let query = validatedBody;
    const { search, fromDate, toDate, page, limit } = validatedBody;
    if (search) {
      query.$or = [
        { postTitle: { $regex: search, $options: "i" } },
        { postType: { $regex: search, $options: "i" } },
      ];
    }
    if (fromDate && !toDate) {
      query.createdAt = { $gte: fromDate };
    }
    if (!fromDate && toDate) {
      query.createdAt = { $lte: toDate };
    }
    if (fromDate && toDate) {
      query.$and = [
        { createdAt: { $gte: fromDate } },
        { createdAt: { $lte: toDate } },
      ];
    }
    let options = {
      page: parseInt(page) || 1,
      limit: parseInt(limit) || 10,
      sort: { createdAt: -1 },
      populate: "userId comment.userId comment.reply.userId",
    };
    if (query["page"]) {
      delete query["page"];
    }
    if (query["limit"]) {
      delete query["limit"];
    }
    if (query["search"]) {
      delete query["search"];
    }
    if (query["fromDate"]) {
      delete query["fromDate"];
    }
    if (query["toDate"]) {
      delete query["toDate"];
    }
    return await productModel.paginate(query, options);
  },

  paginateAllProductSearchPrivatePublicFind: async (validatedBody) => {
    let query = validatedBody;
    const { search, fromDate, toDate, page, limit } = validatedBody;
    if (search) {
      query.$or = [
        { postTitle: { $regex: search, $options: "i" } },
        { postType: { $regex: search, $options: "i" } },
      ];
    }
    if (fromDate && !toDate) {
      query.createdAt = { $gte: fromDate };
    }
    if (!fromDate && toDate) {
      query.createdAt = { $lte: toDate };
    }
    if (fromDate && toDate) {
      query.$and = [
        { createdAt: { $gte: fromDate } },
        { createdAt: { $lte: toDate } },
      ];
    }
    if (query["page"]) {
      delete query["page"];
    }
    if (query["limit"]) {
      delete query["limit"];
    }
    if (query["search"]) {
      delete query["search"];
    }
    if (query["fromDate"]) {
      delete query["fromDate"];
    }
    if (query["toDate"]) {
      delete query["toDate"];
    }
    return await productModel
      .find(query)
      .populate("userId comment.userId comment.reply.userId tag")
      .sort({ createdAt: -1 });
  },

  paginateAllProductSearchPrivatePublicTrending: async (validatedBody) => {
    let query = validatedBody;
    const { search, fromDate, toDate, page, limit } = validatedBody;
    if (search) {
      query.$or = [
        { postTitle: { $regex: search, $options: "i" } },
        { postType: { $regex: search, $options: "i" } },
      ];
    }
    if (fromDate && !toDate) {
      query.createdAt = { $gte: fromDate };
    }
    if (!fromDate && toDate) {
      query.createdAt = { $lte: toDate };
    }
    if (fromDate && toDate) {
      query.$and = [
        { createdAt: { $gte: fromDate } },
        { createdAt: { $lte: toDate } },
      ];
    }
    // let options = {
    //     page: parseInt(page) || 1,
    //     limit: parseInt(limit) || 10,
    //     sort: { likesCount: -1, totalComment: -1 },
    //     populate: ('userId comment.userId comment.reply.userId')
    // };
    if (query["page"]) {
      delete query["page"];
    }
    if (query["limit"]) {
      delete query["limit"];
    }
    if (query["search"]) {
      delete query["search"];
    }
    if (query["fromDate"]) {
      delete query["fromDate"];
    }
    if (query["toDate"]) {
      delete query["toDate"];
    }
    return await productModel
      .find(query)
      .populate("userId comment.userId comment.reply.userId")
      .sort({ likesCount: -1, totalComment: -1 });
  },

  allProductList: async (validatedBody) => {
    let query = { status: status.ACTIVE };
    const { search, fromDate, toDate, page, limit } = validatedBody;
    if (search) {
      query.$or = [
        { postTitle: { $regex: search, $options: "i" } },
        { postType: { $regex: search, $options: "i" } },
      ];
    }
    if (fromDate && !toDate) {
      query.createdAt = { $gte: fromDate };
    }
    if (!fromDate && toDate) {
      query.createdAt = { $lte: toDate };
    }
    if (fromDate && toDate) {
      query.$and = [
        { createdAt: { $gte: fromDate } },
        { createdAt: { $lte: toDate } },
      ];
    }
    let options = {
      page: parseInt(page) || 1,
      limit: parseInt(limit) || 10,
      sort: { createdAt: -1 },
      populate: "userId comment.userId comment.reply.userId",
    };
    // if (query['page']) { delete query['page'] }
    // if (query['limit']) { delete query['limit'] }
    // if (query['search']) { delete query['search'] }
    // if (query['fromDate']) { delete query['fromDate'] }
    // if (query['toDate']) { delete query['toDate'] }
    console.log("290 ==>", query);
    return await productModel.find(query);
  },

  tagProductbyuserlist: async (validatedBody) => {
    let query = validatedBody;
    const { search, fromDate, toDate, page, limit } = validatedBody;
    if (search) {
      query.$or = [
        { postTitle: { $regex: search, $options: "i" } },
        { postType: { $regex: search, $options: "i" } },
      ];
    }
    if (fromDate && !toDate) {
      query.createdAt = { $gte: fromDate };
    }
    if (!fromDate && toDate) {
      query.createdAt = { $lte: toDate };
    }
    if (fromDate && toDate) {
      query.$and = [
        { createdAt: { $gte: fromDate } },
        { createdAt: { $lte: toDate } },
      ];
    }
    let options = {
      page: parseInt(page) || 1,
      limit: parseInt(limit) || 10,
      sort: { createdAt: -1 },
      populate: "userId comment.userId comment.reply.userId",
    };
    if (query["page"]) {
      delete query["page"];
    }
    if (query["limit"]) {
      delete query["limit"];
    }
    if (query["search"]) {
      delete query["search"];
    }
    if (query["fromDate"]) {
      delete query["fromDate"];
    }
    if (query["toDate"]) {
      delete query["toDate"];
    }
    return await productModel.paginate(query, options);
  },

  paginateProductSearchByAdmin: async (validatedBody) => {
    let query = { status: status.ACTIVE, isBuy: false, isSold: false };
    const { search, fromDate, toDate, page, limit, postType } = validatedBody;
    if (search) {
      query.$or = [
        { postTitle: { $regex: search, $options: "i" } },
        { postType: { $regex: search, $options: "i" } },
      ];
    }
    if (postType) {
      query.postType = postType;
    }
    if (fromDate && !toDate) {
      query.createdAt = { $gte: fromDate };
    }
    if (!fromDate && toDate) {
      query.createdAt = { $lte: toDate };
    }
    if (fromDate && toDate) {
      query.$and = [
        { createdAt: { $gte: fromDate } },
        { createdAt: { $lte: toDate } },
      ];
    }
    let options = {
      page: parseInt(page) || 1,
      limit: parseInt(limit) || 10,
      sort: { createdAt: -1 },
      populate: "userId comment.userId comment.reply.userId",
    };
    return await productModel.paginate(query, options);
  },

  paginateProductWithUserByAdmin: async (validatedBody) => {
    let query = { status: status.ACTIVE, userId: validatedBody.userId };
    const { search, fromDate, toDate, page, limit, postType } = validatedBody;
    if (search) {
      query.$or = [
        { postTitle: { $regex: search, $options: "i" } },
        { postType: { $regex: search, $options: "i" } },
      ];
    }
    if (postType) {
      query.postType = postType;
    }
    if (fromDate && !toDate) {
      query.createdAt = { $gte: fromDate };
    }
    if (!fromDate && toDate) {
      query.createdAt = { $lte: toDate };
    }
    if (fromDate && toDate) {
      query.$and = [
        { createdAt: { $gte: fromDate } },
        { createdAt: { $lte: toDate } },
      ];
    }
    let options = {
      page: parseInt(page) || 1,
      limit: parseInt(limit) || 10,
      sort: { createdAt: -1 },
      populate: "userId comment.userId comment.reply.userId",
    };
    return await productModel.paginate(query, options);
  },
  deleteProductComment: async (validatedBody) => {
    return await productModel.findOneAndUpdate(
      { _id: validatedBody.postId, "comment._id": validatedBody.commentId },
      {
        $pull: { comment: { _id: validatedBody.commentId } },
        $inc: { totalComment: -1 },
      },
      { new: true }
    );
  },

  deleteProductCommentReply: async (validatedBody) => {
    return await productModel.findOneAndUpdate(
      { _id: validatedBody.postId, "comment._id": validatedBody.commentId },
      {
        $pull: { "comment.$.reply": { _id: validatedBody.commentReplyId } },
        $inc: { "comment.$.totalReply": -1 },
      },
      { new: true }
    );
  },

  topSellingProductAndResaleproduct: async (validatedBody) => {
    let query = {
      status: status.ACTIVE,
      isSold: true,
      createdAt: { $gte: new Date(new Date().getTime() - 24 * 60 * 60 * 1000) },
    };
    const { search, fromDate, toDate, page, limit, postType } = validatedBody;
    if (search) {
      query.$or = [
        { postTitle: { $regex: search, $options: "i" } },
        { postType: { $regex: search, $options: "i" } },
      ];
    }
    if (postType) {
      query.postType = postType;
    }
    if (fromDate && !toDate) {
      query.createdAt = { $gte: fromDate };
    }
    if (!fromDate && toDate) {
      query.createdAt = { $lte: toDate };
    }
    if (fromDate && toDate) {
      query.$and = [
        { createdAt: { $gte: fromDate } },
        { createdAt: { $lte: toDate } },
      ];
    }
    // let options = {
    //     page: parseInt(page) || 1,
    //     limit: parseInt(limit) || 10,
    //     sort: { createdAt: -1 },
    //     populate: ('userId creatorId comment.userId comment.reply.userId')
    // };
    return await productModel
      .find(query)
      .populate("userId creatorId comment.userId comment.reply.userId");
  },
};

module.exports = { productServices };
