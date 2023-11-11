const sectorModel = require("../../../../models/sector");
const status = require("../../../../enums/status.js");

const sectorServices = {
  createSector: async (insertObj) => {
    return await sectorModel.create(insertObj);
  },

  findSector: async (query) => {
    return await sectorModel.findOne(query);
  },

  updateSector: async (query, updateObj) => {
    return await sectorModel.findOneAndUpdate(query, updateObj, { new: true });
  },

  sectorList: async () => {
    try {
      const identifications = await sectorModel.find({});
      return identifications;
    } catch (error) {
      // Handle the error gracefully (e.g., log or throw a custom error)
      console.error('Error in interestList:', error);
      throw new Error('An error occurred while fetching the identification list.');
    }
  },
  

  paginateSearchSector: async (validatedBody) => {
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

    return await sectorModel.paginate(query, options);
  },
};

module.exports = { sectorServices };
