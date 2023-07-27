const Express = require("express");
const adminController = require("./adminController");
const auth = require("../../../../helper/auth");
// const upload = require("../../../../helper/uploadHandler");
const adminControllerInstance = new adminController();

const router = Express.Router();

// router.post("/register", register);
router.post("/login", adminControllerInstance.login);
router.get("/profile", auth.verifyToken, adminControllerInstance.profile);
router.get(
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
router.get(
  "/paginateSearchInterest",
  auth.verifyToken,
  adminControllerInstance.paginateSearchInterest
);
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
router.get(
  "/paginateSearchIdentification",
  auth.verifyToken,
  adminControllerInstance.paginateSearchIdentification
);
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
router.get(
  "/SearchProductCategories",
  auth.verifyToken,
  adminControllerInstance.SearchProductCategories
);
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
router.get(
  "/SearchProductSubCategories",
  auth.verifyToken,
  adminControllerInstance.SearchProductSubCategories
);
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
router.get(
  "/SearchServiceCategories",
  auth.verifyToken,
  adminControllerInstance.SearchServiceCategories
);
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
  adminControllerInstance.productRequestList
);
router.get(
  "/serviceRequestDetails",
  auth.verifyToken,
  adminControllerInstance.productRequestDetails
);
router.get(
  "/serviceRequestView",
  auth.verifyToken,
  adminControllerInstance.productRequestView
);
router.post(
  "/serviceRequestUpdate",
  auth.verifyToken,
  adminControllerInstance.productRequestUpdate
);
module.exports = router;
