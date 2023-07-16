const identificationModel = require("../../../../models/identification.js");
const status = require("../../../../enums/status.js");

const identificationServices = {
  createIdentification: async (insertObj) => {
    return await identificationModel.create(insertObj);
  },

  findIdentification: async (query) => {
    return await identificationModel.findOne(query);
  },

  updateIdentification: async (query, updateObj) => {
    return await identificationModel.findOneAndUpdate(query, updateObj, { new: true });
  },

  identificationList: async () => {
    try {
      const identifications = await identificationModel.find({});
      return identifications;
    } catch (error) {
      // Handle the error gracefully (e.g., log or throw a custom error)
      console.error('Error in interestList:', error);
      throw new Error('An error occurred while fetching the identification list.');
    }
  },
  

  paginateSearchIdentification: async (validatedBody) => {
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

    return await identificationModel.paginate(query, options);
  },
};

module.exports = { identificationServices };
