const { success } = require("../utils/responseWrapper");

const getMyPostsController = async (req, res) => {
  try {
    console.log("in post", req._id);
    return res.send(success(200, "my posts"));
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  getMyPostsController,
};
