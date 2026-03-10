const express = require("express");
const userController = require("../controllers/userController");
const protectRoute = require("../middlewares/protectRoute");
const upload = require('../middlewares/upload');

const router = express.Router();

router.route("/signin").post(userController.SignInUser);
router.route("/logout").post(userController.logoutUser);
router.route("/createuser").post(protectRoute, upload.single('profilePic'), userController.createUser);
router.route("/updateuser/:id").put(protectRoute,  upload.single('profilePic'),userController.updateUser);
router.route("/users").get(protectRoute, userController.getAllUsers);
router.route("/updateuserstatus/:id").put(protectRoute, userController.updateUserStatus);
router.route("/getuser/:id").get(protectRoute, userController.getUser); // Add this line


router.route("/user-counts").get(protectRoute, userController.getUserCounts);
router.route("/user-status").get(protectRoute, userController.getUserStatus);

module.exports = router;
