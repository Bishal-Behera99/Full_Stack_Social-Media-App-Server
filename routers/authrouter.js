// Import staements
const router = require("express").Router();
const authcontroller = require("../Controllers/authControllers");

// Routers
router.post("/signup", authcontroller.signupController);
router.post("/login", authcontroller.signupController);

module.exports = router;
