import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  images: { type: String },
  text: { type: String, required: true },
  feeling: { type: String },
  tags: [{ type: String }],
  likes: [
    {
      count: { type: Number },
      userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    },
  ],
  comments: [
    {
      count: { type: String, required: true },
      userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    },
  ],
  share: [
    {
      count: { type: Number },
      userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    },
  ],
});

const Post = mongoose.model("Post", postSchema);

export default Post;
