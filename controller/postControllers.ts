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
const updateLikes = async (req: any, res: Response) => {
  try {
    const id = req.user;
    const post = await Post.findOne({ _id: req.body.id });
    if (post) {
      const updatedPost = await Post.findByIdAndUpdate(req.body.id, {
        likes: { count: Number(req.body.count), userId: id },
      });
      if (updatedPost) {
        return res
          .status(200)
          .json({ error: false, message: "Your Response Recorded Success" });
      } else {
        return res
          .status(404)
          .json({ error: true, message: "Something went wrong" });
      }
    }
    res
      .status(500)
      .json({ error: true, message: "Something went wrong try later" });
  } catch (err: any) {
    res.status(500).json({ error: true, message: err.message });
  }
};

const addComment = async (req: any, res: Response) => {
  try {
    const id = req.user;
    const post = await Post.findById(req.body.id);
    if (post) {
      const updatedPost = await Post.findByIdAndUpdate(req.body.id, {
        comments: { text: req.body.comment, userId: id },
      });
      if (updatedPost) {
        return res
          .status(200)
          .json({ error: false, message: "Your Response Recorded Success" });
      } else {
        return res
          .status(404)
          .json({ error: true, message: "Something went wrong" });
      }
    }
    res
      .status(500)
      .json({ error: true, message: "Something went wrong try later" });
  } catch (err: any) {
    res.status(500).json({ error: true, message: err.message });
  }
};

const sharePost = async (req: any, res: Response) => {
  try {
    const id = req.user;
    const post = await Post.findById(req.body.id);
    if (post) {
      const updatedPost = await Post.findByIdAndUpdate(req.body.id, {
        share: { count: 1, userId: id },
      });
      if (updatedPost) {
        return res.status(200).json({
          error: false,
          message: "Your have Shared Post Successfully",
          data: post,
        });
      } else {
        return res
          .status(404)
          .json({ error: true, message: "Something went wrong" });
      }
    }
    res
      .status(500)
      .json({ error: true, message: "Something went wrong try later" });
  } catch (err: any) {
    res.status(500).json({ error: true, message: err.message });
  }
};
const postController = {
  createPost,
  updateLikes,
  addComment,
  sharePost,
};

export default postController;
