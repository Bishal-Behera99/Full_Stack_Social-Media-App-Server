const User = require("../models/User");
const { error, success } = require("../utils/responseWrapper");
const signupController = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // E1

    if (!name || !email || !password) {
      return res.send(error(400, "All fields are required"));
    }
    const newUser = await User.create({
      name,
      email,
      password,
    });

    res.send(success(201, { newUser }));
  } catch (error) {
    console.log(error);
  }
};

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (email || password) {
      res.send(console.error(403, "All fields are required"));
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  signupController,
  loginController,
};
