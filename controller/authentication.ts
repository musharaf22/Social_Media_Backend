import { Request, Response } from "express";
import User from "../models/userModel";
import { comparePassword } from "../utils/hashPassword";
import tokentGenerate from "../utils/tokenGenerate";

const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      const matchPassword = await comparePassword(password, user.password);
      if (matchPassword) {
        const token = tokentGenerate(user._id as unknown as string);
        return res
          .status(200)
          .json({ err: false, message: "User Logged in successfully", token });
      }
      res
        .status(404)
        .json({ error: true, message: "Invalid Email and Password" });
    }
  } catch (err: any) {
    res.status(500).json({ error: true, message: err.message });
  }
};

const getUserProfile = async (req: any, res: Response) => {
  try {
    const id = req.user;
    const user = await User.findOne({ _id: id }).select("-password");
    if (user) {
      return res.status(200).json({
        error: false,
        message: "User Profile retrieved Successfully",
        data: user,
      });
    }
    res.status(404).json({ error: true, message: "No Such User Found" });
  } catch (err: any) {
    res.status(500).json({ error: true, message: err.message });
  }
};
const authController = {
  login,
  getUserProfile,
};

export default authController;
