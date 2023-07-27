const serviceCategorieModel = require("../../../../models/serviceCategorie");
const status = require("../../../../enums/status.js");

const serviceCategorieServices = {
  createServiceCategorie: async (insertObj) => {
    return await serviceCategorieModel.create(insertObj);
  },

  findServiceCategorie: async (query) => {
    return await serviceCategorieModel.findOne(query);
  },

  updateServiceCategorie: async (query, updateObj) => {
    return await serviceCategorieModel.findOneAndUpdate(query, updateObj, { new: true });
  },

  serviceCategorieList: async () => {
    try {
      const identifications = await serviceCategorieModel.find({});
      return identifications;
    } catch (error) {
      // Handle the error gracefully (e.g., log or throw a custom error)
      console.error('Error in interestList:', error);
      throw new Error('An error occurred while fetching the identification list.');
    }
  },
  

  paginateSearchServiceCategorie: async (validatedBody) => {
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

    return await serviceCategorieModel.paginate(query, options);
  },
};

module.exports = { serviceCategorieServices };
