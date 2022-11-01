import { Request, Response } from "express";
import User from "../models/userModel";
import bcrypt from "bcryptjs";
import { request } from "http";
import { Error } from "mongoose";
const createUser = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email: email });
    const password = await bcrypt.hash(req.body.password, 10);
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
const userController = {
  createUser,
};

export default userController;
