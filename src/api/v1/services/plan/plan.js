const planModel = require("../../../../models/plan.js");
const userModel = require("../../../../models/user.js");

const planServices = {
  createPlan: async (insertObj) => {
    return await planModel.create(insertObj);
  },

  findPlan: async (query) => {
    return await planModel.findOne(query);
  },

  updatePlan: async (query, updateObj) => {
    return await planModel.findOneAndUpdate(query, updateObj, { new: true });
  },

  planList: async (query) => {
    return await planModel.find(query);
  },
};

const getActiveUser = async () => {
  let userId = await userModel.find({ blockStatus: false }).select('_id');
  userId = userId.map(i => i._id);
  return userId;
}

module.exports = { planServices, getActiveUser };
