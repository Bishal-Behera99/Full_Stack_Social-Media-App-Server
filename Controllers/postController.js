const { success, error } = require("../utils/responseWrapper");
const Post = require("../models/Post");
const User = require("../models/User");
const cloudinary = require("cloudinary").v2;
const { post } = require("../routers/authrouter");
const { mapPostOutput } = require("../utils/Utils");

// const getMyPostsController = async (req, res) => {
//   try {
//     console.log("in post", req._id);
//     return res.send(success(200, "my posts"));
//   } catch (error) {
//     console.log(error);
//   }
// };

const createPostController = async (req, res) => {
  try {
    const { postImg, caption } = req.body;
    const owner = req._id;
    const user = await User.findById(owner);
    if (!postImg || !caption) {
      return res.send(error(401, "Both the fields are required"));
    }

    const cloudImg = await cloudinary.uploader.upload(postImg, {
      folder: "postimg2",
    });

    const post = await Post.create({
      owner,
      caption,
      image: {
        publicId: cloudImg.public_id,
        url: cloudImg.url,
      },
    });
    user.posts.push(post._id);
    await user.save();
    console.log("post", post);
    return res.send(success(201, { post }));
  } catch (e) {
    return res.send(error(500, e.message));
  }
};

const likeunlikeController = async (req, res) => {
  const { postImg } = req.body;
  const owner = req._id;
  const post = await Post.findById(postImg).populate("owner");
  const user = await User.findById(owner);
  if (!post) {
    return res.send(error(403, "Post Not Found"));
  }

  if (post.likes.includes(owner)) {
    const index = await post.likes.indexOf(owner);

    post.likes.splice(index, 1);
  } else {
    post.likes.push(owner);
  }
  await post.save();
  await user.save();
  return res.send(success(200, { post: mapPostOutput(post, req._id) }));
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

const deletepostController = async (req, res) => {
  try {
    const { postId } = req.body;

    const curr = req._id;
    const post = await Post.findById(postId);
    const curruser = await User.findById(curr);
    if (post.owner.toString() !== curr) {
      return res.send(error(403, "You cannot deletesomeone else post"));
    }

    const index = curruser.posts.indexOf(postId);
    await curruser.posts.splice(index, 1);
    await curruser.save();
    await post.remove();

    return res.send(success(200, "Post Deleted Successfully"));
  } catch (e) {
    return res.send(error(500, e.message));
  }
};

const addcommentcontroller = async (req, res) => {
  try {
    const { postImg, comments } = req.body;
    const curruser = req._id;
    const owner = await User.findById(curruser);
    const post = await Post.findById(postImg).populate("owner");
    if (comments) {
      post.comments.push(comments);
    }

    await post.save();
    return res.send(success(200, { post }));
  } catch (e) {
    return res.send(error(500, e.message));
  }
};

module.exports = {
  createPostController,
  likeunlikeController,
  updatePostController,
  deletepostController,
  addcommentcontroller,
};
