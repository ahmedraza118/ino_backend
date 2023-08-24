const serviceModel = require("../../../../models/service");
const status = require("../../../../enums/status");
const apiError = require("../../../../helper/apiError");
const responseMessage = require("../../../../../assets/responseMessage");
const serviceServices = {
  createUserService: async (insertObj) => {
    return await serviceModel.create(insertObj);
  },

  findOneService: async (query) => {
    return await serviceModel
      .findOne(query)
      .populate("userId comment.userId comment.reply.userId");
  },

  updateService: async (query, updateObj) => {
    return await serviceModel.findOneAndUpdate(query, updateObj, { new: true });
  },
  rateService: async (userId,serviceId , rating) => {
    // console.log("service: ", serviceId)
    // console.log("user: ", userId)
    // console.log("rating: ", rating)
    try {
      // Fetch the service by its ID
      const service = await serviceModel.findOne({
        _id: serviceId,
        status: { $ne: status.DELETE },
      });
      if (!service) {
        throw apiError.notFound(responseMessage.DATA_NOT_FOUND);
      }

      // Check if the user has already rated the service
      const userRatingIndex = service.userRatings.findIndex((userRating) =>
        userRating.userId.equals(userId)
      );
      if (userRatingIndex !== -1) {
        throw apiError.badRequest(responseMessage.ALREADY_RATED);
      }
      service.userRatings.push({ userId: userId, rating });
      // Update the average rating
      const totalRatings = service.userRatings.length;
      const sumRatings = service.userRatings.reduce(
        (sum, userRating) => sum + userRating.rating,
        0
      );
      const averageRating = sumRatings / totalRatings;

      // Update the service
      const updatedProduct = await serviceModel.findOneAndUpdate(
        { _id: serviceId },
        { $set: { userRatings: service.userRatings, rating: averageRating } }
      );

      return updatedProduct;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  listService: async (query) => {
    return await serviceModel.find(query);
  },
  findServiceCount: async (query) => {
    return await serviceModel.count(query);
  },
  paginateServiceSearch: async (validatedBody) => {
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
    return await serviceModel.paginate(query, options);
  },
  paginateAllServiceSearch: async (validatedBody) => {
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
    // let aggregate = serviceModel.aggregate([
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
    return await serviceModel.paginate(query, options);
  },

  paginateServiceSearchBuy: async (validatedBody) => {
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
    let aggregate = serviceModel.aggregate([
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
    return await serviceModel.aggregatePaginate(aggregate, options);
  },

  collectionServiceList: async (query) => {
    query.isReported = { $ne: true };
    return await serviceModel
      .find(query)
      .populate([{ path: "nftId userId currentOwner" }]);
  },

  paginateAllServiceSearchPrivatePublic: async (validatedBody) => {
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
    return await serviceModel.paginate(query, options);
  },

  paginateAllServiceSearchPrivatePublicFind: async (validatedBody) => {
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
    return await serviceModel
      .find(query)
      .populate("userId comment.userId comment.reply.userId tag")
      .sort({ createdAt: -1 });
  },

  paginateAllServiceSearchPrivatePublicTrending: async (validatedBody) => {
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
    return await serviceModel
      .find(query)
      .populate("userId comment.userId comment.reply.userId")
      .sort({ likesCount: -1, totalComment: -1 });
  },

  allServiceList: async (validatedBody) => {
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
    return await serviceModel.find(query);
  },

  tagServicebyuserlist: async (validatedBody) => {
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
    return await serviceModel.paginate(query, options);
  },

  paginateServiceSearchByAdmin: async (validatedBody) => {
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
    return await serviceModel.paginate(query, options);
  },

  paginateServiceWithUserByAdmin: async (validatedBody) => {
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
    return await serviceModel.paginate(query, options);
  },
  deleteServiceComment: async (validatedBody) => {
    return await serviceModel.findOneAndUpdate(
      { _id: validatedBody.postId, "comment._id": validatedBody.commentId },
      {
        $pull: { comment: { _id: validatedBody.commentId } },
        $inc: { totalComment: -1 },
      },
      { new: true }
    );
  },

  deleteServiceCommentReply: async (validatedBody) => {
    return await serviceModel.findOneAndUpdate(
      { _id: validatedBody.postId, "comment._id": validatedBody.commentId },
      {
        $pull: { "comment.$.reply": { _id: validatedBody.commentReplyId } },
        $inc: { "comment.$.totalReply": -1 },
      },
      { new: true }
    );
  },

  topSellingServiceAndResaleService: async (validatedBody) => {
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
    return await serviceModel
      .find(query)
      .populate("userId creatorId comment.userId comment.reply.userId");
  },
};

module.exports = { serviceServices };
