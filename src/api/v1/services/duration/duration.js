const durationModel = require("../../../../models/duration.js");
const status = require("../../../../enums/status.js");

const durationServices = {
  createDuration: async (insertObj) => {
    return await durationModel.create(insertObj);
  },

  findDuration: async (query) => {
    return await durationModel.findOne(query);
  },

  updateDuration: async (query, updateObj) => {
    return await durationModel.findOneAndUpdate(query, updateObj, { new: true });
  },

  durationList: async (query) => {
    return await durationModel.find(query);
  },

  paginateSearchDuration: async (validatedBody) => {
    let query = { status: { $ne: status.DELETE } };
    const { fromDate, toDate, page, limit } = validatedBody;

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
      limit: parseInt(limit) || 15,
      sort: { createdAt: -1 },
      populate: "postId",
    };

    return await durationModel.paginate(query, options);
  },
};

module.exports = { durationServices };
