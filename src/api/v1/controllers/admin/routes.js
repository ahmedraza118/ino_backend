const Express = require("express");
const adminController = require("./adminController");
const auth = require("../../../../helper/auth");
// const upload = require("../../../../helper/uploadHandler");
const adminControllerInstance = new adminController();

const router = Express.Router();

// router.post("/register", register);
router.post("/login", adminControllerInstance.login);
router.get("/profile", auth.verifyToken, adminControllerInstance.profile);
router.post(
  "/updateProfile",
  auth.verifyToken,
  adminControllerInstance.updateProfile
);
// router.post("/verifyOTP", adminControllerInstance.verifyOtp);
// router.post("/resetPassword", adminControllerInstance.resetPassword);
// router.post("/forgotPassword", adminControllerInstance.forgotPassword);
// interst routes
router.post(
  "/createInterest",
  auth.verifyToken,
  adminControllerInstance.createInterest
);
router.get(
  "/viewInterest",
  auth.verifyToken,
  adminControllerInstance.viewInterest
);
router.post(
  "/deleteInterest",
  auth.verifyToken,
  adminControllerInstance.deleteInterest
);
// router.get(
//   "/paginateSearchInterest",
//   auth.verifyToken,
//   adminControllerInstance.paginateSearchInterest
// );
router.get(
  "/getAllInterests",
  auth.verifyToken,
  adminControllerInstance.getAllInterests
);

// FAQ routes
router.post("/addFaq", auth.verifyToken, adminControllerInstance.addFaq);
router.get("/viewFAQ", auth.verifyToken, adminControllerInstance.viewFAQ);
router.post("/editFaq", auth.verifyToken, adminControllerInstance.editFaq);
router.post("/removeFaq", auth.verifyToken, adminControllerInstance.removeFaq);
router.get("/listFaq", auth.verifyToken, adminControllerInstance.listFaq);

//report routes
router.get("/viewReport", auth.verifyToken, adminControllerInstance.viewReport);
router.get(
  "/reportsList",
  auth.verifyToken,
  adminControllerInstance.reportsList
);

//user mnagement routes
router.post(
  "/userBlockUnblock",
  auth.verifyToken,
  adminControllerInstance.userBlockUnblock
);
router.get(
  "/listPaginateUser",
  auth.verifyToken,
  adminControllerInstance.listPaginateUser
);
router.get(
  "/listAllUser",
  auth.verifyToken,
  adminControllerInstance.listAllUser
);
router.post(
  "/deleteUser",
  auth.verifyToken,
  adminControllerInstance.deleteUser
);

//fee list
router.get("/feeList", auth.verifyToken, adminControllerInstance.feeList);
router.get("/feeView", auth.verifyToken, adminControllerInstance.feeView);
router.post("/feeUpdate", auth.verifyToken, adminControllerInstance.feeUpdate);

//request routes
router.post(
  "/requestView",
  auth.verifyToken,
  adminControllerInstance.requestView
);
router.post(
  "/requestList",
  auth.verifyToken,
  adminControllerInstance.requestList
);

//duration routes
router.post(
  "/addDuration",
  auth.verifyToken,
  adminControllerInstance.addDuration
);
router.post(
  "/deleteDuration",
  auth.verifyToken,
  adminControllerInstance.deleteDuration
);
router.post(
  "/editDuration",
  auth.verifyToken,
  adminControllerInstance.editDuration
);
router.get(
  "/listPaginteDuration",
  auth.verifyToken,
  adminControllerInstance.listPaginateDuration
);
router.get(
  "/viewDuration",
  auth.verifyToken,
  adminControllerInstance.viewDuration
);
router.get(
  "/listAllDuration",
  auth.verifyToken,
  adminControllerInstance.listAllDuration
);

//identifications routes
router.get(
  "/viewIdentification",
  auth.verifyToken,
  adminControllerInstance.viewIdentification
);
router.post(
  "/createIdentification",
  auth.verifyToken,
  adminControllerInstance.createIdentification
);
router.post(
  "/deleteIdentification",
  auth.verifyToken,
  adminControllerInstance.deleteIdentification
);
// router.get(
//   "/paginateSearchIdentification",
//   auth.verifyToken,
//   adminControllerInstance.paginateSearchIdentification
// );
router.get(
  "/getAllIdentifications",
  auth.verifyToken,
  adminControllerInstance.getAllIdentifications
);
//Product Categories routes
router.get(
  "/viewProductCategorie",
  auth.verifyToken,
  adminControllerInstance.viewProductCategorie
);
router.post(
  "/createProductCategorie",
  auth.verifyToken,
  adminControllerInstance.createProductCategorie
);
router.post(
  "/deleteProductCategorie",
  auth.verifyToken,
  adminControllerInstance.deleteProductCategorie
);
// router.get(
//   "/SearchProductCategories",
//   auth.verifyToken,
//   adminControllerInstance.SearchProductCategories
// );
router.get(
  "/getAllProdctCategories",
  auth.verifyToken,
  adminControllerInstance.getAllProdctCategories
);
//Product Sub Categories routes
router.get(
  "/viewProductSubCategorie",
  auth.verifyToken,
  adminControllerInstance.viewProductSubCategorie
);
router.post(
  "/createProductSubCategorie",
  auth.verifyToken,
  adminControllerInstance.createProductSubCategorie
);
router.post(
  "/deleteProductSubCategorie",
  auth.verifyToken,
  adminControllerInstance.deleteProductSubCategorie
);
// router.get(
//   "/SearchProductSubCategories",
//   auth.verifyToken,
//   adminControllerInstance.SearchProductSubCategories
// );
router.get(
  "/getAllProdctSubCategories",
  auth.verifyToken,
  adminControllerInstance.getAllProdctSubCategories
);

//Service Categories routes
router.get(
  "/viewServiceCategorie",
  auth.verifyToken,
  adminControllerInstance.viewServiceCategorie
);
router.post(
  "/createServiceCategorie",
  auth.verifyToken,
  adminControllerInstance.createServiceCategorie
);
router.post(
  "/deleteServiceCategorie",
  auth.verifyToken,
  adminControllerInstance.deleteServiceCategorie
);
// router.get(
//   "/SearchServiceCategories",
//   auth.verifyToken,
//   adminControllerInstance.SearchServiceCategories
// );
router.get(
  "/getAllServiceCategories",
  auth.verifyToken,
  adminControllerInstance.getAllServiceCategories
);

//post Request routes
router.get(
  "/postRequestList",
  auth.verifyToken,
  adminControllerInstance.postRequestList
);
router.get(
  "/postRequestDetails",
  auth.verifyToken,
  adminControllerInstance.postRequestDetails
);
router.get(
  "/postRequestView",
  auth.verifyToken,
  adminControllerInstance.postRequestView
);
router.post(
  "/postRequestUpdate",
  auth.verifyToken,
  adminControllerInstance.postRequestUpdate
);
//product Request routes
router.get(
  "/productRequestList",
  auth.verifyToken,
  adminControllerInstance.productRequestList
);
router.get(
  "/productRequestDetails",
  auth.verifyToken,
  adminControllerInstance.productRequestDetails
);
router.get(
  "/productRequestView",
  auth.verifyToken,
  adminControllerInstance.productRequestView
);
router.post(
  "/productRequestUpdate",
  auth.verifyToken,
  adminControllerInstance.productRequestUpdate
);
//Service Request routes
router.get(
  "/serviceRequestList",
  auth.verifyToken,
  adminControllerInstance.serviceRequestList
);
router.get(
  "/serviceRequestDetails",
  auth.verifyToken,
  adminControllerInstance.serviceRequestDetails
);
router.get(
  "/serviceRequestView",
  auth.verifyToken,
  adminControllerInstance.serviceRequestView
);
router.post(
  "/serviceRequestUpdate",
  auth.verifyToken,
  adminControllerInstance.serviceRequestUpdate
);
//Job Request routes
router.get(
  "/jobRequestList",
  auth.verifyToken,
  adminControllerInstance.jobRequestList
);
router.get(
  "/jobRequestDetails",
  auth.verifyToken,
  adminControllerInstance.jobRequestDetails
);
router.get(
  "/jobRequestView",
  auth.verifyToken,
  adminControllerInstance.jobRequestView
);
router.post(
  "/jobRequestUpdate",
  auth.verifyToken,
  adminControllerInstance.jobRequestUpdate
);
//Project Request routes
router.get(
  "/projectRequestList",
  auth.verifyToken,
  adminControllerInstance.projectRequestList
);
router.get(
  "/projectRequestDetails",
  auth.verifyToken,
  adminControllerInstance.projectRequestDetails
);
router.get(
  "/projectRequestView",
  auth.verifyToken,
  adminControllerInstance.projectRequestView
);
router.post(
  "/projectRequestUpdate",
  auth.verifyToken,
  adminControllerInstance.projectRequestUpdate
);
//Store Request routes
router.get(
  "/storeRequestList",
  auth.verifyToken,
  adminControllerInstance.storeRequestList
);
router.get(
  "/storeRequestDetails",
  auth.verifyToken,
  adminControllerInstance.storeRequestDetails
);
router.get(
  "/storeRequestView",
  auth.verifyToken,
  adminControllerInstance.storeRequestView
);
router.post(
  "/storeRequestUpdate",
  auth.verifyToken,
  adminControllerInstance.storeRequestUpdate
);

// post management APIs
router.get("/postView", auth.verifyToken, adminControllerInstance.postView);
router.get("/deletePost", auth.verifyToken, adminControllerInstance.deletePost);
router.get("/ignorePost", auth.verifyToken, adminControllerInstance.ignorePost);
router.get("/allPostList", auth.verifyToken, adminControllerInstance.allPostList);
// post management APIs
router.get("/projectView", auth.verifyToken, adminControllerInstance.projectView);
router.get("/deleteProject", auth.verifyToken, adminControllerInstance.deleteProject);
router.get("/ignoreProject", auth.verifyToken, adminControllerInstance.ignoreProject);
router.get("/allProjectList", auth.verifyToken, adminControllerInstance.allProjectList);
// post management APIs
router.get("/productView", auth.verifyToken, adminControllerInstance.productView);
router.get("/deleteProduct", auth.verifyToken, adminControllerInstance.deleteProduct);
router.get("/ignoreProduct", auth.verifyToken, adminControllerInstance.ignoreProduct);
router.get("/allProductList", auth.verifyToken, adminControllerInstance.allProductList);
// post management APIs
router.get("/serviceView", auth.verifyToken, adminControllerInstance.serviceView);
router.get("/deleteService", auth.verifyToken, adminControllerInstance.deleteService);
router.get("/ignoreService", auth.verifyToken, adminControllerInstance.ignoreService);
router.get("/allServiceList", auth.verifyToken, adminControllerInstance.allServiceList);
// post management APIs
router.get("/jobView", auth.verifyToken, adminControllerInstance.jobView);
router.get("/deleteJob", auth.verifyToken, adminControllerInstance.deleteJob);
router.get("/ignoreJob", auth.verifyToken, adminControllerInstance.ignoreJob);
router.get("/allJobList", auth.verifyToken, adminControllerInstance.allJobList);
// post management APIs
router.get("/viewBusinessCard", auth.verifyToken, adminControllerInstance.viewBusinessCard);
router.get("/listBusinessCard", auth.verifyToken, adminControllerInstance.listAllBusinessCard);
router.get("/blockBusinessCard", auth.verifyToken, adminControllerInstance.blockBusinessCard);
router.get("/unblockBusinessCard", auth.verifyToken, adminControllerInstance.unblockBusinessCard);

module.exports = router;
