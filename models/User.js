const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
      select: false,
    },

    avatar: {
      publicId: String,
      url: String,
    },
    bio: {
      type: String,
    },

    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user3",
      },
    ],

    followings: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user3",
      },
    ],
    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "post2",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("user3", userSchema);
