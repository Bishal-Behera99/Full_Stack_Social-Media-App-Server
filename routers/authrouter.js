// Import staements
const router = require("express").Router();
const authcontroller = require("../Controllers/authControllers");

// Routers
router.post("/signup", authcontroller.signupController);
router.post("/login", authcontroller.loginController);
router.post("/refresh", authcontroller.refreshController);

module.exports = router;
