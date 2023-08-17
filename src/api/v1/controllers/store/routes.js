const Express = require("express");
const storeController = require("./storeController");
const auth = require("../../../../helper/auth");
// const upload = require("../../../../helper/uploadHandler");
const storeControllerInstance = new storeController();

const router = Express.Router();

router.get("/storeView", auth.verifyToken, storeControllerInstance.storeView);
router.get(
  "/listAllStore",
  auth.verifyToken,
  storeControllerInstance.listAllStore
);
router.get(
  "/admin/deleteUserStoreByAdmin",
  auth.verifyToken,
  storeControllerInstance.deleteUserStoreByAdmin
);
router.get(
  "/admin/blockUserStoreByAdmin",
  auth.verifyToken,
  storeControllerInstance.blockUserStoreByAdmin
);
router.get(
  "/admin/unblockUserStoreByAdmin",
  auth.verifyToken,
  storeControllerInstance.unblockUserStoreByAdmin
);
router.get(
  "/listUserStores",
  auth.verifyToken,
  storeControllerInstance.listUserStores
);
router.get(
  "/listStoreByType",
  auth.verifyToken,
  storeControllerInstance.listStoreByType
);
router.post(
  "/user/registerStore",
  auth.verifyToken,
  storeControllerInstance.registerStore
);
router.post(
  "/user/updateUserStore",
  auth.verifyToken,
  storeControllerInstance.updateUserStore
);
// router.post(
//   "/deleteUserStore",
//   auth.verifyToken,
//   storeControllerInstance.deleteUserStore
// );
router.post(
  "/user/deleteUserStore",
  auth.verifyToken,
  storeControllerInstance.deleteUserStore
);
router.post(
  "/user/deleteStoreCatalogueItem",
  auth.verifyToken,
  storeControllerInstance.deleteStoreCatalogueItem
);
router.post(
  "/user/addStoreCatalogueItem",
  auth.verifyToken,
  storeControllerInstance.addStoreCatalogueItem
);

module.exports = router;
