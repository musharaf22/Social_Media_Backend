import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  address: { type: String, required: true },
  image: [{ type: String }],
  coverImage: { type: String },
  friends: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  friendReq: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  friendRes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

const User = mongoose.model("User", userSchema);

export default User;
