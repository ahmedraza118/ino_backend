const Express = require("express");
const {
  register,
  login,
  verifyOTP,
  updateProfile,
  profile,
  createPost,
  postView,
  postListPaginate,
  updateUserPost,
  deleteUserPost,
  createProduct,
  productView,
  updateUserProduct,
  deleteUserProduct,
  productListPaginate,
  serviceView,
  serviceListPaginate,
  deleteUserService,
  updateUserService,
  createService,
} = require("./userController");
const auth = require("../../../../helper/auth");
// const upload = require("../../../../helper/uploadHandler");

const router = Express.Router();

//register login routes
router.post("/register", register);
router.post("/login", login);
router.post("/verifyOTP", verifyOTP);

//profile routes
router.post("/updateProfile", auth.verifyToken, updateProfile);
router.get("/profile", auth.verifyToken, profile);

//post routes
router.get("/postView", auth.verifyToken, postView);
router.get("/postListPaginate", auth.verifyToken, postListPaginate);
router.post("/createPost", auth.verifyToken, createPost);
router.post("/updateUserPost", auth.verifyToken, updateUserPost);
router.post("/deleteUserPost", auth.verifyToken, deleteUserPost);
//product routes
router.get("/productView", auth.verifyToken, productView);
router.post("/createProduct", auth.verifyToken, createProduct);
router.post("/updateUserProduct", auth.verifyToken, updateUserProduct);
router.post("/deleteUserProduct", auth.verifyToken, deleteUserProduct);
router.get("/productListPaginate", auth.verifyToken, productListPaginate);
//Service routes
router.get("/serviceView", auth.verifyToken, serviceView);
router.post("/createService", auth.verifyToken, createService);
router.post("/updateUserService", auth.verifyToken, updateUserService);
router.post("/deleteUserService", auth.verifyToken, deleteUserService);
router.get("/serviceListPaginate", auth.verifyToken, serviceListPaginate);

module.exports = router;
