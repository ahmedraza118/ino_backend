const jobModel = require("../../../../models/job.js");
const status = require("../../../../enums/status");
const apiError = require("../../../../helper/apiError");
const responseMessage = require("../../../../../assets/responseMessage");

const jobServices = {
  createUserJob: async (insertObj) => {
    return await jobModel.create(insertObj);
  },

  findOneJob: async (query) => {
    return await jobModel
      .findOne(query)
      .populate("userId comment.userId comment.reply.userId");
  },

  updateJob: async (query, updateObj) => {
    return await jobModel.findOneAndUpdate(query, updateObj, { new: true });
  },
  rateJob: async (userId,jobId , rating) => {
    // console.log("job: ", jobId)
    // console.log("user: ", userId)
    // console.log("rating: ", rating)
    try {
      // Fetch the job by its ID
      const job = await jobModel.findOne({
        _id: jobId,
        status: { $ne: status.DELETE },
      });
      if (!job) {
        throw apiError.notFound(responseMessage.DATA_NOT_FOUND);
      }

      // Check if the user has already rated the job
      const userRatingIndex = job.userRatings.findIndex((userRating) =>
        userRating.userId.equals(userId)
      );
      if (userRatingIndex !== -1) {
        throw apiError.badRequest(responseMessage.ALREADY_RATED);
      }
      job.userRatings.push({ userId: userId, rating });
      // Update the average rating
      const totalRatings = job.userRatings.length;
      const sumRatings = job.userRatings.reduce(
        (sum, userRating) => sum + userRating.rating,
        0
      );
      const averageRating = sumRatings / totalRatings;

      // Update the job
      const updatedProduct = await jobModel.findOneAndUpdate(
        { _id: jobId },
        { $set: { userRatings: job.userRatings, rating: averageRating } }
      );

      return updatedProduct;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  listJob: async (query) => {
    return await jobModel.find(query);
  },
  findJobCount: async (query) => {
    return await jobModel.count(query);
  },
  paginateJobSearch: async (validatedBody) => {
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
    return await jobModel.paginate(query, options);
  },
  paginateAllJobSearch: async (validatedBody) => {
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
    // let aggregate = jobModel.aggregate([
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
    return await jobModel.paginate(query, options);
  },

  paginateJobSearchBuy: async (validatedBody) => {
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
    let aggregate = jobModel.aggregate([
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
    return await jobModel.aggregatePaginate(aggregate, options);
  },

  collectionJobList: async (query) => {
    query.isReported = { $ne: true };
    return await jobModel
      .find(query)
      .populate([{ path: "nftId userId currentOwner" }]);
  },

  paginateAllJobSearchPrivatePublic: async (validatedBody) => {
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
    return await jobModel.paginate(query, options);
  },

  paginateAllJobSearchPrivatePublicFind: async (validatedBody) => {
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
    return await jobModel
      .find(query)
      .populate("userId comment.userId comment.reply.userId tag")
      .sort({ createdAt: -1 });
  },

  paginateAllJobSearchPrivatePublicTrending: async (validatedBody) => {
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
    return await jobModel
      .find(query)
      .populate("userId comment.userId comment.reply.userId")
      .sort({ likesCount: -1, totalComment: -1 });
  },

  allJobList: async (validatedBody) => {
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
    return await jobModel.find(query);
  },

  tagJobbyuserlist: async (validatedBody) => {
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
    return await jobModel.paginate(query, options);
  },

  paginateJobSearchByAdmin: async (validatedBody) => {
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
    return await jobModel.paginate(query, options);
  },

  paginateJobWithUserByAdmin: async (validatedBody) => {
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
    return await jobModel.paginate(query, options);
  },
  deleteJobComment: async (validatedBody) => {
    return await jobModel.findOneAndUpdate(
      { _id: validatedBody.postId, "comment._id": validatedBody.commentId },
      {
        $pull: { comment: { _id: validatedBody.commentId } },
        $inc: { totalComment: -1 },
      },
      { new: true }
    );
  },

  deleteJobCommentReply: async (validatedBody) => {
    return await jobModel.findOneAndUpdate(
      { _id: validatedBody.postId, "comment._id": validatedBody.commentId },
      {
        $pull: { "comment.$.reply": { _id: validatedBody.commentReplyId } },
        $inc: { "comment.$.totalReply": -1 },
      },
      { new: true }
    );
  },

  topSellingJobAndResaleJob: async (validatedBody) => {
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
    return await jobModel
      .find(query)
      .populate("userId creatorId comment.userId comment.reply.userId");
  },
};

module.exports = { jobServices };
