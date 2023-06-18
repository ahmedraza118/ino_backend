const Express = require("express");
const { register, login } = require("./userController");
// const auth = require("../../../../helper/auth");
// const upload = require("../../../../helper/uploadHandler");

const router = Express.Router();

router.post("/register", register);
router.post('/login', login);

module.exports = router;
