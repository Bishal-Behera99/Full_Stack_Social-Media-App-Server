const Post = require("../models/Post");
const User = require("../models/User");
const { success, error } = require("../utils/responseWrapper");

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
module.exports = {
  followunfollowcontroller,
  getPostOfFollowing,
};
