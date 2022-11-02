import { Request, Response } from "express";
import Post from "../models/postModel";

const createPost = async (req: any, res: Response) => {
  try {
    const id = req.user;
    const newPost = await Post.create({ userId: id, ...req.body });
    if (newPost) {
      res.status(200).json({
        error: true,
        message: "Post Created Successfully",
        data: newPost,
      });
    } else {
      res.status(403).json("Please Login Yourself to Share Post");
    }
  } catch (err: any) {
    res.status(500).json({ error: true, message: err.message });
  }
};

const postController = {
  createPost,
};

export default postController;
