const Post = require("../models/Post");
const User = require("../models/User");
const { use } = require("../routers/authrouter");
const { mapPostOutput } = require("../utils/Utils");
const { success, error } = require("../utils/responseWrapper");
const cloudinary = require("cloudinary").v2;
const followunfollowcontroller = async (req, res) => {
  try {
    const { followersId } = req.body;
    const owner = req._id;

    const userToFollow = await User.findById(followersId);

    if (!userToFollow) {
      return res.send(error(404, "user to follow not found"));
    }
    const curruser = await User.findById(owner);

    if (owner === followersId) {
      res.send(error(409, "User cannot follow themselves"));
    }

    // console.log(curruser);

    if (curruser.followings.includes(followersId)) {
      const followingindex = curruser.followings.indexOf(followersId);

      curruser.followings.splice(followingindex, 1);

      const followersindex = userToFollow.followers.indexOf(curruser);

      curruser.followers.splice(followersindex, 1);
      await userToFollow.save();
      await curruser.save();
      return res.send(success(200, "user unfollowed"));
    } else {
      curruser.followings.push(userToFollow);

      userToFollow.followers.push(curruser);
      await userToFollow.save();
      await curruser.save();
      return res.send(success(200, "user followed"));
    }
  } catch (e) {
    // console.log(e);
    res.send(error(500, e.message));
  }
};

const getPostOfFollowing = async (req, res) => {
  try {
    const owner = req._id;
    console.log(owner);
    const curruser = await User.findById(owner);
    const posts = await Post.find({
      owner: {
        $in: curruser.followings,
      },
    });
    return res.send(success(200, { posts }));
  } catch (e) {
    return res.send(error(500, e.message));
  }
};

const getmypostControler = async (req, res) => {
  try {
    const owner = req._id;
    const user = await User.findById(owner);
    if (!user) {
      return res.send(error(404, "USer Not Found"));
    }

    const posts = await Post.find({
      owner: user._id,
    });

    return res.send(success(200, { posts }));
  } catch (e) {
    return res.send(error(500, e.message));
  }
};

// Update My Profile Controller
const updateMyProfileController = async (req, res) => {
  const { userimg, name, bio } = req.body;

  const owner = req._id;

  const user = await User.findById(owner);

  if (name) {
    user.name = name;
  }

  if (bio) {
    user.bio = bio;
  }

  if (userimg) {
    const cloudImg = await cloudinary.uploader.upload(userimg, {
      folder: "ProfileImg2",
    });

    user.avatar = {
      url: cloudImg.secure_url,
      publicId: cloudImg.public_id,
    };
  }
  user.save();

  return res.send(success(200, { user }));
};

const deleteMyProfileController = async (req, res) => {
  try {
    const curruserId = req._id;
    const curruser = await USer.findById(owner);

    await Post.deleteMany({
      owner: curruserId,
    });

    //remove myself from followers 'following List
    curruser.followers.forEach(async (followerId) => {
      const follower = await User.findById(followerId);

      const index = follower.followings.indexOf(curruserId);
      await follower.followings.splice(index, 1);
      await follower.save();
    });

    // remove myself from following 'followerlist

    curruser.following.forEach(async (followingId) => {
      const following = await User.findById(followingId);

      const index = following.followers.indexOf(curruserId);
      await following.followings.splice(index, 1);
      await following.save();
    });

    //  remove myself from alllikes

    const allposts = await Post.find();

    allposts.forEach(async (post) => {
      const index = post.likes.indexOf(curruserId);
      await post.likes.splice(index, 1);
      await post.save();
    });

    // delete User

    await curruser.delete();

    res.clear("jwt", {
      httpOnly: true,
      secure: true,
    });

    return res.send(success(200, "User Account Deleted Successfully"));
  } catch (e) {
    return res.send(error(500, e.message));
  }
};

const getMyProfileController = async (req, res) => {
  try {
    const curruser = req._id;

    const user = await User.findById(curruser);

    return res.send(success(200, { user }));
  } catch (e) {
    return res.send(error(500, e.message));
  }
};

const getUserProfileController = async (req, res) => {
  try {
    const { userId } = req.body;
    console.log(userId);
    const ownerId = req._id;
    const user = await User.findById(userId).populate({
      path: "posts",
      populate: {
        path: "owner",
      },
    });

    const fullPosts = user.posts;

    const posts = fullPosts
      .map((item) => mapPostOutput(item, ownerId))
      .reverse();

    return res.send(success(200, { ...user._doc, posts }));
  } catch (e) {
    // console.log(e);
    return res.send(error(500, e.message));
  }
};

const getFeedDataController = async (req, res) => {
  try {
    const curruserId = req._id;

    const curruser = await User.findById(curruserId).populate("followings");

    const fullposts = await Post.find({
      owner: {
        $in: curruser.followings,
      },
    }).populate("owner");

    const posts = fullposts
      .map((item) => mapPostOutput(item, req._id))
      .reverse();

    curruser.posts = fullposts;
    const followingsId = curruser.followings.map((items) => items._id);

    const suggestions = await User.find({
      _id: {
        $nin: followingsId,
      },
    });

    return res.send(success(200, { ...curruser._doc, suggestions, posts }));
  } catch (e) {
    return res.send(error(500, e.message));
  }
};
module.exports = {
  followunfollowcontroller,
  getPostOfFollowing,
  getmypostControler,
  deleteMyProfileController,
  getMyProfileController,
  updateMyProfileController,
  getUserProfileController,
  getFeedDataController,
};
