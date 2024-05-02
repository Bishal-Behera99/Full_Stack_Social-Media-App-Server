const { error } = require("../utils/responseWrapper");
const jwt = require("jsonwebtoken");
module.exports = async (req, res, next) => {
  try {
    if (
      !req.headers ||
      !req.headers.authorization ||
      !req.headers.authorization.startsWith("Bearer")
    ) {
      res.send(error(401, "Authorization Token is Required"));
    }

    const accesstoken = req.headers.authorization.split(" ")[1];

    const decoded = jwt.verify(accesstoken, process.env.ACCESS_TOKEN_KEY);

    req._id = decoded._id;

    next();
  } catch (e) {
    return res.send(error(500, e.message));
  }
};
