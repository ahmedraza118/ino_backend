const reportModel = require("../../../../models/report.js");
const status = require("../../../../enums/status.js");

const reportServices = {
  createReport: async (insertObj) => {
    return await reportModel.create(insertObj);
  },

  findReport: async (query) => {
    return await reportModel.findOne(query);
  },

  findAllReport: async (query) => {
    query.status = { $ne: status.DELETE };
    return await reportModel.find(query);
  },

  updateReport: async (query, updateObj) => {
    return await reportModel.findOneAndUpdate(query, updateObj, { new: true });
  },

  updateReportById: async (query, updateObj) => {
    return await reportModel.findByIdAndUpdate(query, updateObj, { new: true });
  },

  updateManyReport: async (query, updateObj) => {
    return await reportModel.updateMany(query, updateObj, { new: true });
  },

  paginateSearchReport: async (validatedBody) => {
    let query = { status: { $ne: status.DELETE } };
    const { fromDate, toDate, page, limit, type } = validatedBody;

    if (type) {
      query.type = type;
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
      limit: parseInt(limit) || 15,
      sort: { createdAt: -1 },
      populate: [
        { path: 'postId userId auctionId', populate: { path: "userId" } }
      ]
    };

    return await reportModel.paginate(query, options);
  },
};

module.exports = { reportServices };
