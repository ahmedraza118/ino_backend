const projectModel = require("../../../../models/project.js");
const status = require("../../../../enums/status");

const projectServices = {
  createUserProject: async (insertObj) => {
    return await projectModel.create(insertObj);
  },

  findOneProject: async (query) => {
    return await projectModel
      .findOne(query)
      .populate("userId comment.userId comment.reply.userId");
  },

  updateProject: async (query, updateObj) => {
    return await projectModel.findOneAndUpdate(query, updateObj, { new: true });
  },

  listProject: async (query) => {
    return await projectModel.find(query);
  },
  findProjectCount: async (query) => {
    return await projectModel.count(query);
  },
  paginateProjectSearch: async (validatedBody) => {
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
    return await projectModel.paginate(query, options);
  },
  paginateAllProjectSearch: async (validatedBody) => {
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
    // let aggregate = projectModel.aggregate([
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
    return await projectModel.paginate(query, options);
  },

  paginateProjectSearchBuy: async (validatedBody) => {
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
    let aggregate = projectModel.aggregate([
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
    return await projectModel.aggregatePaginate(aggregate, options);
  },

  collectionProjectList: async (query) => {
    query.isReported = { $ne: true };
    return await projectModel
      .find(query)
      .populate([{ path: "nftId userId currentOwner" }]);
  },

  paginateAllProjectSearchPrivatePublic: async (validatedBody) => {
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
    return await projectModel.paginate(query, options);
  },

  paginateAllProjectSearchPrivatePublicFind: async (validatedBody) => {
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
    return await projectModel
      .find(query)
      .populate("userId comment.userId comment.reply.userId tag")
      .sort({ createdAt: -1 });
  },

  paginateAllProjectSearchPrivatePublicTrending: async (validatedBody) => {
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
    return await projectModel
      .find(query)
      .populate("userId comment.userId comment.reply.userId")
      .sort({ likesCount: -1, totalComment: -1 });
  },

  allProjectList: async (validatedBody) => {
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
    return await projectModel.find(query);
  },

  tagProjectbyuserlist: async (validatedBody) => {
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
    return await projectModel.paginate(query, options);
  },

  paginateProjectSearchByAdmin: async (validatedBody) => {
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
    return await projectModel.paginate(query, options);
  },

  paginateProjectWithUserByAdmin: async (validatedBody) => {
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
    return await projectModel.paginate(query, options);
  },
  deleteProjectComment: async (validatedBody) => {
    return await projectModel.findOneAndUpdate(
      { _id: validatedBody.postId, "comment._id": validatedBody.commentId },
      {
        $pull: { comment: { _id: validatedBody.commentId } },
        $inc: { totalComment: -1 },
      },
      { new: true }
    );
  },

  deleteProjectCommentReply: async (validatedBody) => {
    return await projectModel.findOneAndUpdate(
      { _id: validatedBody.postId, "comment._id": validatedBody.commentId },
      {
        $pull: { "comment.$.reply": { _id: validatedBody.commentReplyId } },
        $inc: { "comment.$.totalReply": -1 },
      },
      { new: true }
    );
  },

  topSellingProjectAndResaleProject: async (validatedBody) => {
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
    return await projectModel
      .find(query)
      .populate("userId creatorId comment.userId comment.reply.userId");
  },
};

module.exports = { projectServices };
