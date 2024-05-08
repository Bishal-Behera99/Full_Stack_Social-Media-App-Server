// Import staements
const router = require("express").Router();
const authcontroller = require("../Controllers/authControllers");

// Routers
router.post("/signup", authcontroller.signupController);
router.post("/login", authcontroller.loginController);
router.get("/refresh", authcontroller.refreshController);
router.post("/logout", authcontroller.logoutController);
module.exports = router;
