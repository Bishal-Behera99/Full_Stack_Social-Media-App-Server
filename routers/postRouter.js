const postController = require("../Controllers/postController");
const requiredUser = require("../middlewares/requiredUser");
const router = require("express").Router();

// router.post("/", requiredUser, postController.getMyPostsController);
// module.exports = router;

router.post("/", requiredUser, postController.createPostController);

module.exports = router;
