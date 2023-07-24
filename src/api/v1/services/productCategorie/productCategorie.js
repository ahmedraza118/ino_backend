const productCategorieModel = require("../../../../models/productCategorie");
const status = require("../../../../enums/status.js");

const productCategorieServices = {
  createProductCategorie: async (insertObj) => {
    return await productCategorieModel.create(insertObj);
  },

  findProductCategorie: async (query) => {
    return await productCategorieModel.findOne(query);
  },

  updateProductCategorie: async (query, updateObj) => {
    return await productCategorieModel.findOneAndUpdate(query, updateObj, { new: true });
  },

  productCategorieList: async () => {
    try {
      const identifications = await productCategorieModel.find({});
      return identifications;
    } catch (error) {
      // Handle the error gracefully (e.g., log or throw a custom error)
      console.error('Error in interestList:', error);
      throw new Error('An error occurred while fetching the identification list.');
    }
  },
  

  paginateSearchProductCategorie: async (validatedBody) => {
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

    return await productCategorieModel.paginate(query, options);
  },
};

module.exports = { productCategorieServices };
