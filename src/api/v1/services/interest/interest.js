const interestModel = require("../../../../models/interest.js");
const status = require("../../../../enums/status.js");

const interestServices = {
  createInterest: async (insertObj) => {
    return await interestModel.create(insertObj);
  },

  findInterest: async (query) => {
    return await interestModel.findOne(query);
  },

  updateInterest: async (query, updateObj) => {
    return await interestModel.findOneAndUpdate(query, updateObj, { new: true });
  },

  interestList: async () => {
    try {
      const interests = await interestModel.find({});
      return interests;
    } catch (error) {
      // Handle the error gracefully (e.g., log or throw a custom error)
      console.error('Error in interestList:', error);
      throw new Error('An error occurred while fetching the interest list.');
    }
  },
  

  paginateSearchInterest: async (validatedBody) => {
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

    return await interestModel.paginate(query, options);
  },
};

module.exports = { interestServices };
