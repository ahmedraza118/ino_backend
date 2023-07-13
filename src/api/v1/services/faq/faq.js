const faqModel = require("../../../models/faq.js");
const status = require("../../../enums/status.js");

const faqServices = {
  createFaq: async (insertObj) => {
    return await faqModel.create(insertObj);
  },

  findFaq: async (query) => {
    return await faqModel.findOne(query);
  },

  updateFaqById: async (query, updateObj) => {
    return await faqModel.findByIdAndUpdate(query, updateObj, { new: true });
  },

  faqList: async () => {
    return await faqModel.find({});
  },
};

module.exports = { faqServices };
