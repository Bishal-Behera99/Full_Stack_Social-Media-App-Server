const router = require("express").Router();
const usercontroller = require("../Controllers/userController");
const requiredUser = require("../middlewares/requiredUser");
router.post(
  "/followunfollow",
  requiredUser,
  usercontroller.followunfollowcontroller
);
router.post(
  "/getpostoffollowing",
  requiredUser,
  usercontroller.getPostOfFollowing
);
router.get("/myposts", requiredUser, usercontroller.getmypostControler);

router.post("/deleteuser", usercontroller.deleteMyProfileController);

module.exports = router;
