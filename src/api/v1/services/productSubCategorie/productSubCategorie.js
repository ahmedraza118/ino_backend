const productSubCategorieModel = require("../../../../models/productSubCategorie");
const status = require("../../../../enums/status.js");

const productSubCategorieServices = {
  createProductSubCategorie: async (insertObj) => {
    return await productSubCategorieModel.create(insertObj);
  },

  findProductSubCategorie: async (query) => {
    return await productSubCategorieModel.findOne(query);
  },

  updateProductSubCategorie: async (query, updateObj) => {
    return await productSubCategorieModel.findOneAndUpdate(query, updateObj, { new: true });
  },

  productSubCategorieList: async () => {
    try {
      const identifications = await productSubCategorieModel.find({});
      return identifications;
    } catch (error) {
      // Handle the error gracefully (e.g., log or throw a custom error)
      console.error('Error in interestList:', error);
      throw new Error('An error occurred while fetching the identification list.');
    }
  },
  

  paginateSearchProductSubCategorie: async (validatedBody) => {
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
      populate: "productId",
    };

    return await productSubCategorieModel.paginate(query, options);
  },
};

module.exports = { productSubCategorieServices };
