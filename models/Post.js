const mongoose = require("mongoose");

const PostSchema = mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user3",
      required: true,
    },
    image: {
      publicId: String,
      url: String,
    },
    caption: {
      type: String,
      required: true,
    },
    comments: [
      {
        type: String,
      },
    ],

    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user3",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("post2", PostSchema);
