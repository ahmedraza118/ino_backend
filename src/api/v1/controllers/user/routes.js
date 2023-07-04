const Express = require("express");
const { register, login, verifyOTP } = require("./userController");
// const auth = require("../../../../helper/auth");
// const upload = require("../../../../helper/uploadHandler");

const router = Express.Router();

router.post("/register", register);
router.post('/login', login);
router.post('/verifyOTP', verifyOTP)

module.exports = router;
