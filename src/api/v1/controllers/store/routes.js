const Express = require("express");
const storeController = require("./storeController");
const auth = require("../../../../helper/auth");
// const upload = require("../../../../helper/uploadHandler");
const storeControllerInstance = new storeController();

const router = Express.Router();

router.get("/storeView", auth.verifyToken, storeControllerInstance.storeView);
router.post(
  "/registerStore",
  auth.verifyToken,
  storeControllerInstance.registerStore
);
router.post(
  "/updateUserStore",
  auth.verifyToken,
  storeControllerInstance.updateUserStore
);
router.post(
  "/deleteUserStore",
  auth.verifyToken,
  storeControllerInstance.deleteUserStore
);

module.exports = router;
