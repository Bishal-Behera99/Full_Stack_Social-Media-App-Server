const { success, error } = require("../utils/responseWrapper");
const Post = require("../models/Post");
const User = require("../models/User");
const { post } = require("../routers/authrouter");
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
    await post.save();
    await user.save();
    return res.send(success(201, { post }));
  } catch (e) {
    return res.send(error(500, e.message));
  }
};

const likeunlikeController = async (req, res) => {
  const { postImg } = req.body;
  const owner = req._id;
  const post = await Post.findById(postImg);
  const user = await User.findById(owner);
  if (!post) {
    return res.send(error(403, "Post Not Found"));
  }

  if (post.likes.includes(owner)) {
    const index = await post.likes.indexOf(owner);
    post.likes.splice(index, 1);
    await post.save();
    return res.send(success(200, "post unliked"));
  } else {
    post.likes.push(user);
    await post.save();
    return res.send(success(200, "post liked"));
  }
};

const updatePostController = async (req, res) => {
  try {
    const { postId, caption } = req.body;
    const curruser = req._id;
    const post = await Post.findById(postId);

    if (!post) {
      return res.send(error(404, "post not Found"));
    }
    if (post.owner.toString() !== curruser) {
      return res.send(error(403, "only owner can update their posts"));
    }
    if (caption) {
      post.caption = caption;
    }

    await post.save();
    return res.send(success(200, { post }));
  } catch (e) {
    return res.send(error(500, e.message));
  }
};

module.exports = {
  getMyPostsController,
  createPostController,
  likeunlikeController,
  updatePostController,
};
