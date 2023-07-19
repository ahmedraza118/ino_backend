const Express = require("express");
const {
  register,
  login,
  verifyOTP,
  updateProfile,
  profile,
} = require("./userController");
const auth = require("../../../../helper/auth");
// const upload = require("../../../../helper/uploadHandler");

const router = Express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/verifyOTP", verifyOTP);
router.post("/updateProfile", auth.verifyToken, updateProfile);
router.get("/profile", auth.verifyToken, profile);

module.exports = router;


