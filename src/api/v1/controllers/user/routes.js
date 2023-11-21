const Express = require("express");
const {
  register,
  login,
  verifyOTP,
  updateProfile,
  profile,
  createPost,
  postView,
  postListPaginate,
  updateUserPost,
  deleteUserPost,
  createProduct,
  productView,
  updateUserProduct,
  deleteUserProduct,
  productListPaginate,
  serviceView,
  serviceListPaginate,
  deleteUserService,
  updateUserService,
  createService,
  jobView,
  createJob,
  updateUserJob,
  deleteUserJob,
  jobListPaginate,
  projectView,
  createProject,
  updateUserProject,
  deleteUserProject,
  projectListPaginate,
  sendOtpToMail,
  verifyMailAndUpdate,
  becomeReseller,
  addReferral,
  createUserBusinessCard,
  editBusinessCard,
  viewBusinessCard,
  deleteBusinessCard,
  rateUserProduct,
  rateUserService,
  rateUserProject,
  rateUserJob,
  rateUserPost,
  sendOtpToPhone,
  updatePhoneNumber,
  createPostPromotion,
  createProjectPromotion,
  createProductPromotion,
  createJobPromotion,
  createServicePromotion,
  viewPostPromotionById,
  viewProductPromotionById,
  viewProjectPromotionById,
  viewServicePromotionById,
  viewJobPromotionById,
  getUserActivePromotions,
  getUserPromotionList,
  updateUserPromotionById,
  clickOnPromotion,
  viewPromotionById,
  getAllPostList,
  getAllProductList,
  getSellerProductList,
  getBuyerProductList,
  getAllJobList,
  getSellerJobList,
  getBuyerJobList,
  getAllServiceList,
  getSellerServiceList,
  getBuyerServiceList,
  getAllProjectList,
  getAllGovtProjectList,
  createCampaignPromotion,
  getCampaignsList,
  getUserAllCampaigns,
  getUserActiveCampaigns,
  updateUserCampaignById
} = require("./userController");
const auth = require("../../../../helper/auth");
// const upload = require("../../../../helper/uploadHandler");

const router = Express.Router();

//register login routes
router.post("/register", register);
router.post("/login", login);
router.post("/verifyOTP", verifyOTP);
router.post("/sendOtpToMail", auth.verifyToken, sendOtpToMail);
router.post("/verifyMailAndUpdate", auth.verifyToken, verifyMailAndUpdate);
router.post("/sendOtpToPhone", auth.verifyToken, sendOtpToPhone);
router.post("/updatePhoneNumber", auth.verifyToken, updatePhoneNumber);

//profile routes
router.post("/updateProfile", auth.verifyToken, updateProfile);
router.get("/profile", auth.verifyToken, profile);

//post routes
router.get("/postView", auth.verifyToken, postView);
router.get("/postListPaginate", auth.verifyToken, postListPaginate);
router.post("/createPost", auth.verifyToken, createPost);
router.post("/updateUserPost", auth.verifyToken, updateUserPost);
router.post("/deleteUserPost", auth.verifyToken, deleteUserPost);
//product routes
router.get("/productView", auth.verifyToken, productView);
router.post("/createProduct", auth.verifyToken, createProduct);
router.post("/updateUserProduct", auth.verifyToken, updateUserProduct);
router.post("/deleteUserProduct", auth.verifyToken, deleteUserProduct);
router.get("/productListPaginate", auth.verifyToken, productListPaginate);
//Service routes
router.get("/serviceView", auth.verifyToken, serviceView);
router.post("/createService", auth.verifyToken, createService);
router.post("/updateUserService", auth.verifyToken, updateUserService);
router.post("/deleteUserService", auth.verifyToken, deleteUserService);
router.get("/serviceListPaginate", auth.verifyToken, serviceListPaginate);
//Job routes
router.get("/jobView", auth.verifyToken, jobView);
router.post("/createJob", auth.verifyToken, createJob);
router.post("/updateUserJob", auth.verifyToken, updateUserJob);
router.post("/deleteUserJob", auth.verifyToken, deleteUserJob);
router.get("/jobListPaginate", auth.verifyToken, jobListPaginate);
//Job routes
router.get("/projectView", auth.verifyToken, projectView);
router.post("/createProject", auth.verifyToken, createProject);
router.post("/updateUserProject", auth.verifyToken, updateUserProject);
router.post("/deleteUserProject", auth.verifyToken, deleteUserProject);
router.get("/projectListPaginate", auth.verifyToken, projectListPaginate);

//Reseller routes
router.get("/becomeReseller", auth.verifyToken, becomeReseller);
router.post("/addReferral", auth.verifyToken, addReferral);

//Business card routes
router.post(
  "/createUserBusinessCard",
  auth.verifyToken,
  createUserBusinessCard
);
router.post("/editBusinessCard", auth.verifyToken, editBusinessCard);
router.post("/deleteBusinessCard", auth.verifyToken, deleteBusinessCard);
router.get("/viewBusinessCard", auth.verifyToken, viewBusinessCard);

// Post Rating APIs
router.post("/rateUserProduct", auth.verifyToken, rateUserProduct);
router.post("/rateUserService", auth.verifyToken, rateUserService);
router.post("/rateUserProject", auth.verifyToken, rateUserProject);
router.post("/rateUserJob", auth.verifyToken, rateUserJob);
router.post("/rateUserPost", auth.verifyToken, rateUserPost);

// // Get Rating APIs
// router.get("/getProductRating", auth.verifyToken, rateUserProduct);
// router.post("/rateUserService", auth.verifyToken, rateUserService);
// router.post("/rateUserProject", auth.verifyToken, rateUserProject);
// router.post("/rateUserJob", auth.verifyToken, rateUserJob);
// router.post("/rateUserPost", auth.verifyToken, rateUserPost);

//Create Promotion APIs
router.post("/createPostPromotion", auth.verifyToken, createPostPromotion);
router.post(
  "/createProjectPromotion",
  auth.verifyToken,
  createProjectPromotion
);
router.post(
  "/createProductPromotion",
  auth.verifyToken,
  createProductPromotion
);
router.post("/createJobPromotion", auth.verifyToken, createJobPromotion);
router.post(
  "/createServicePromotion",
  auth.verifyToken,
  createServicePromotion
);

//Get Promotion By Id APIs
router.get("/viewPromotionById", auth.verifyToken, viewPromotionById);
router.get("/viewPromotionByPostId", auth.verifyToken, viewPostPromotionById);
router.get(
  "/viewPromotionByProjectId",
  auth.verifyToken,
  viewProjectPromotionById
);
router.get(
  "/viewPromotionByProductId",
  auth.verifyToken,
  viewProductPromotionById
);
router.get("/viewPromotionByJobId", auth.verifyToken, viewJobPromotionById);
router.get(
  "/viewPromotionByServiceId",
  auth.verifyToken,
  viewServicePromotionById
);
// Get User Promotion List
router.get("/getUserPromotionList", auth.verifyToken, getUserPromotionList);
router.get(
  "/getUserActivePromotions",
  auth.verifyToken,
  getUserActivePromotions
);

// update Promotions
router.post(
  "/updateUserPromotionById",
  auth.verifyToken,
  updateUserPromotionById
);
router.post("/clickOnPromotion", auth.verifyToken, clickOnPromotion);

// get All data APIs
router.get("/getAllPostList", auth.verifyToken, getAllPostList);
router.get("/getAllJobList", auth.verifyToken, getAllJobList);
router.get("/getSellerJobList", auth.verifyToken, getSellerJobList);
router.get("/getBuyerJobList", auth.verifyToken, getBuyerJobList);
router.get("/getAllProductList", auth.verifyToken, getAllProductList);
router.get("/getSellerProductList", auth.verifyToken, getSellerProductList);
router.get("/getBuyerProductList", auth.verifyToken, getBuyerProductList);
router.get("/getAllServiceList", auth.verifyToken, getAllServiceList);
router.get("/getSellerServiceList", auth.verifyToken, getSellerServiceList);
router.get("/getBuyerServiceList", auth.verifyToken, getBuyerServiceList);
router.get("/getAllProjectList", auth.verifyToken, getAllProjectList);
router.get("/getAllGovtProjectList", auth.verifyToken, getAllGovtProjectList);

// Campaign Routes
router.get("/createCampaignPromotion", auth.verifyToken, createCampaignPromotion);
router.get("/updateUserCampaignById", auth.verifyToken, updateUserCampaignById);
router.get("/getUserActiveCampaigns", auth.verifyToken, getUserActiveCampaigns);
router.get("/getUserAllCampaigns", auth.verifyToken, getUserAllCampaigns);
router.get("/getCampaignsList", auth.verifyToken, getCampaignsList);

module.exports = router;
