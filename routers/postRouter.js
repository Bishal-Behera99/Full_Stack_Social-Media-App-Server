const postController = require("../Controllers/postController");
const requiredUser = require("../middlewares/requiredUser");
const router = require("express").Router();

// router.post("/", requiredUser, postController.getMyPostsController);
// module.exports = router;

router.post("/", requiredUser, postController.createPostController);
router.post("/likeunlike", requiredUser, postController.likeunlikeController);
router.post("/updatepost", requiredUser, postController.updatePostController);

router.delete("/delete", requiredUser, postController.deletepostController);

router.post("/comment", requiredUser, postController.addcommentcontroller);
module.exports = router;
