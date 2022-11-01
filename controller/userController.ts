import { Request, Response } from "express";
import User from "../models/userModel";
import { hashPassword } from "../utils/hashPassword";

const createUser = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email: email });
    const password = await hashPassword(req.body.password as string);
    if (password) {
      req.body.password = password;
    }

    if (user) {
      return res
        .status(401)
        .json({ error: true, message: "User Already Exist" });
    } else {
      const newUser = await User.create({ ...req.body });
      return res.status(200).json({
        error: false,
        message: "user created Successfully",
        data: newUser,
      });
    }
  } catch (err: any) {
    res.status(500).json({ error: true, message: err.message });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findByIdAndDelete({ _id: req.params.id });
    if (user) {
      return res
        .status(200)
        .json({ error: false, message: "User deleted Successfully" });
    }
    res.status(404).json({ error: true, message: "No Such User Found!" });
  } catch (err: any) {
    res.status(500).json({ error: true, message: err.message });
  }
};

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({});
    if (user) {
      return res.status(200).json({
        error: false,
        message: "User Fetched Successfully",
        data: user,
      });
    }
    res.status(500).json({ error: true, message: "Something Went Wrong!" });
  } catch (err: any) {
    res.status(500).json({ error: true, message: err.message });
  }
};
const updateUser = async (req: Request, res: Response) => {
  try {
    if (req.body.password) {
      req.body.password = await hashPassword(req.body.password as string);
    }
    const user = await User.findByIdAndUpdate(req.params.id, {
      ...req.body,
    }).select("-password");
    if (user) {
      return res.status(200).json({
        error: false,
        message: "User Updated Suxccessfully",
        data: user,
      });
    }
    res.status(404).json({ error: true, message: "User Not found" });
  } catch (err: any) {
    res.status(500).json({ error: true, message: err.message });
  }
};

const friendRequest = async (req: Request, res: Response) => {
  try {
    const { id, friendRequest } = req.body;
    if (req.body.id === req.params.id) {
      return res
        .status(404)
        .json({ error: true, message: "Cant send Friend Req to Self" });
    }
    const user1 = await User.findByIdAndUpdate(req.params.id, {
      friendReq: [friendRequest],
    });

    const user2 = await User.findByIdAndUpdate(id, {
      friendRes: [req.body.friendRequest],
    });

    if (user1 && user2) {
      return res.status(200).json({
        error: false,
        message: "Friend Request has been sent to another",
      });
    }
    res.status(500).json({ error: true, message: "Something went wrong" });
  } catch (err: any) {
    res.status(500).json({ error: true, message: err.message });
  }
};
const userController = {
  createUser,
  deleteUser,
  getAllUsers,
  updateUser,
  friendRequest,
};

export default userController;
