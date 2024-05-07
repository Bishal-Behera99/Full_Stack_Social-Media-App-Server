const { success, error } = require("../utils/responseWrapper");
const Post = require("../models/Post");
const User = require("../models/User");
const getMyPostsController = async (req, res) => {
  try {
    console.log("in post", req._id);
    return res.send(success(200, "my posts"));
  } catch (error) {
    console.log(error);
  }
};

const createPostController = async (req, res) => {
  try {
    const { caption } = req.body;
    const owner = req._id;
    // if(!Postimg || !caption){
    //   return res.send(error(401, "Both the fields are required"));

    // }

    // if(Postimg){
    //   const post=Cloudinary
    // }
    const user = await User.findById(owner);
    const post = await Post.create({
      owner,
      caption,
    });
    await user.posts.push(post._id);
    return res.send(success(201, { post }));
  } catch (e) {
    return res.send(error(500, e.message));
  }
};
module.exports = {
  getMyPostsController,
  createPostController,
};
