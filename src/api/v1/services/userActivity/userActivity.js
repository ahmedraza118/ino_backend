const activityModel = require("../../../../models/activityModel.js");
const userModel = require("../../../../models/user.js");
const status = require("../../../../enums/status.js");

const activityServices = {
  createActivity: async (insertObj) => {
    return await activityModel.create(insertObj);
  },

  findActivity: async (query) => {
    return await activityModel.findOne(query);
  },

  updateActivity: async (query, updateObj) => {
    return await activityModel.findOneAndUpdate(query, updateObj, { new: true });
  },

  multiUpdateActivity: async (query, updateObj) => {
    return await activityModel.updateMany(query, updateObj, { multi: true });
  },

  activityList: async (query) => {
    let activeIds = await getActiveUser();
    query.userId = { $in: activeIds };
    return await activityModel.find(query);
  },

  activityListWithSort: async (query) => {
    let activeIds = await getActiveUser();
    query.userId = { $in: activeIds };
    return await activityModel.find(query).populate('nftIds chatId').sort({ createdAt: -1 });
  },

  findAllActivity: async (query) => {
    return await activityModel.find(query);
  },

  paginateSearch: async (validatedBody) => {
    let query = { status: { $ne: status.DELETE }, userId: validatedBody.userId };
    const { search, fromDate, toDate, page, limit, type } = validatedBody;

    if (search) {
      query.$or = [
        { firstName: { $regex: search, $options: 'i' } },
      ];
    }

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
      page: page || 1,
      limit: limit || 15,
      sort: { createdAt: -1 },
      populate: 'userId',
    };

    return await activityModel.paginate(query, options);
  },

  findSearchActivity: async (validatedBody) => {
    let query = {
      status: { $ne: status.DELETE },
      postId: { $exists: true },
      createdAt: { $gte: new Date(new Date().getTime() - (validatedBody.hours * 60 * 60 * 1000)) },
    };

    const { search, fromDate, toDate, page, limit, type } = validatedBody;

    if (search) {
      query.$or = [
        { firstName: { $regex: search, $options: 'i' } },
      ];
    }

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

    return await activityModel.find(query).populate('userId postId buyerId');
  },
};

const getActiveUser = async () => {
  let userId = await userModel.find({ blockStatus: false }).select('_id');
  userId = userId.map(i => i._id);
  return userId;
};

module.exports = { activityServices };
