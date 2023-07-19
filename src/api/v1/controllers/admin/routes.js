const Express = require("express");
const adminController = require("./adminController");
const auth = require("../../../../helper/auth");
// const upload = require("../../../../helper/uploadHandler");
const adminControllerInstance = new adminController();

const  router = Express.Router();

// router.post("/register", register);
router.post("/login", adminControllerInstance.login);
router.get("/profile", auth.verifyToken, adminControllerInstance.profile);
router.get("/updateProfile", auth.verifyToken, adminControllerInstance.updateProfile);
// router.post("/verifyOTP", adminControllerInstance.verifyOtp);
// router.post("/resetPassword", adminControllerInstance.resetPassword);
// router.post("/forgotPassword", adminControllerInstance.forgotPassword);



// interst routes
router.post("/createInterest", auth.verifyToken, adminControllerInstance.createInterest);
router.get("/viewInterest", auth.verifyToken, adminControllerInstance.viewInterest);
router.post("/deleteInterest", auth.verifyToken, adminControllerInstance.deleteInterest);
router.get("/paginateSearchInterest", auth.verifyToken, adminControllerInstance.paginateSearchInterest);
router.get("/getAllInterests", auth.verifyToken, adminControllerInstance.getAllInterests);

// FAQ routes 
router.post("/addFaq", auth.verifyToken, adminControllerInstance.addFaq);
router.get("/viewFAQ", auth.verifyToken, adminControllerInstance.viewFAQ);
router.post("/editFaq", auth.verifyToken, adminControllerInstance.editFaq);
router.post("/removeFaq", auth.verifyToken, adminControllerInstance.removeFaq);
router.get("/listFaq", auth.verifyToken, adminControllerInstance.listFaq);

//report routes
router.get("/viewReport", auth.verifyToken, adminControllerInstance.viewReport);
router.get("/reportsList", auth.verifyToken, adminControllerInstance.reportsList);

//user mnagement routes
router.post("/userBlockUnblock", auth.verifyToken, adminControllerInstance.userBlockUnblock);
router.get("/listPaginateUser", auth.verifyToken, adminControllerInstance.listPaginateUser);
router.get("/listAllUser", auth.verifyToken, adminControllerInstance.listAllUser);
router.post("/deleteUser", auth.verifyToken, adminControllerInstance.deleteUser);

//fee list
router.get("/feeList", auth.verifyToken, adminControllerInstance.feeList);
router.get("/feeView", auth.verifyToken, adminControllerInstance.feeView);
router.post("/feeUpdate", auth.verifyToken, adminControllerInstance.feeUpdate);

//request routes
router.post("/requestView", auth.verifyToken, adminControllerInstance.requestView);
router.post("/requestList", auth.verifyToken, adminControllerInstance.requestList);

//duration routes
router.post("/addDuration", auth.verifyToken, adminControllerInstance.addDuration);
router.post("/deleteDuration", auth.verifyToken, adminControllerInstance.deleteDuration);
router.post("/editDuration", auth.verifyToken, adminControllerInstance.editDuration);
router.get("/listPaginteDuration", auth.verifyToken, adminControllerInstance.listPaginateDuration);
router.get("/viewDuration", auth.verifyToken, adminControllerInstance.viewDuration);
router.get("/listAllDuration", auth.verifyToken, adminControllerInstance.listAllDuration);

//identifications routes
router.get("/viewIdentification", auth.verifyToken, adminControllerInstance.viewIdentification);
router.post("/createIdentification", auth.verifyToken, adminControllerInstance.createIdentification);
router.post("/deleteIdentification", auth.verifyToken, adminControllerInstance.deleteIdentification);
router.get("/paginateSearchIdentification", auth.verifyToken, adminControllerInstance.paginateSearchIdentification);
router.get("/getAllIdentifications", auth.verifyToken, adminControllerInstance.getAllIdentifications);

module.exports = router;
