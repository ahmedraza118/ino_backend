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
  verifyMailOtp,
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
} = require("./userController");
const auth = require("../../../../helper/auth");
// const upload = require("../../../../helper/uploadHandler");

const router = Express.Router();

//register login routes
router.post("/register", register);
router.post("/login", login);
router.post("/verifyOTP", verifyOTP);
router.post("/sendOtpToMail", auth.verifyToken, sendOtpToMail);
router.post("/verifyMailOtp", auth.verifyToken, verifyMailOtp);

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

module.exports = router;
