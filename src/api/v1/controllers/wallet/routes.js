const Express = require("express");
const walletController = require("./walletController");
const auth = require("../../../../helper/auth");
// const upload = require("../../../../helper/uploadHandler");
const walletControllerInstance = new walletController();

const router = Express.Router();

router.get("/getWallet", auth.verifyToken, walletControllerInstance.getWallet);
router.post(
  "/depositFunds",
  auth.verifyToken,
  walletControllerInstance.depositFunds
);
router.post(
  "/withdrawFunds",
  auth.verifyToken,
  walletControllerInstance.withdrawFunds
);
router.post(
  "/transferFunds",
  auth.verifyToken,
  walletControllerInstance.transferFunds
);

module.exports = router;
