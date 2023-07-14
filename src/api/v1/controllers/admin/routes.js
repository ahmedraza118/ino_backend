const Express = require("express");
const adminController = require("./adminController");
const auth = require("../../../../helper/auth");
// const upload = require("../../../../helper/uploadHandler");
const adminControllerInstance = new adminController();

const router = Express.Router();

// router.post("/register", register);
router.post("/login", adminControllerInstance.login);
// router.post("/verifyOTP", adminControllerInstance.verifyOtp);
// router.post("/resetPassword", adminControllerInstance.resetPassword);
// router.post("/forgotPassword", adminControllerInstance.forgotPassword);


router.get("/profile", auth.verifyToken, adminControllerInstance.profile);
router.post("/createInterest", auth.verifyToken, adminControllerInstance.createInterest);
router.get("/viewInterest", auth.verifyToken, adminControllerInstance.viewInterest);
router.post("/deleteInterest", auth.verifyToken, adminControllerInstance.deleteInterest);
router.get("/paginateSearchInterest", auth.verifyToken, adminControllerInstance.paginateSearchInterest);
router.get("/getAllInterests", auth.verifyToken, adminControllerInstance.getAllInterests);



module.exports = router;
