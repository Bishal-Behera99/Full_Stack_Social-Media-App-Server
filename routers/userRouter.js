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
router.get(
  "/getmyProfile",
  requiredUser,
  usercontroller.getMyProfileController
);

router.post(
  "/updateMyProfile",
  requiredUser,
  usercontroller.updateMyProfileController
);
router.post(
  "/getuserprofile",
  requiredUser,
  usercontroller.getUserProfileController
);
module.exports = router;
