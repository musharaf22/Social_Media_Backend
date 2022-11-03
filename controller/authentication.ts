import { Request, Response } from "express";
import User from "../models/userModel";
import { comparePassword, hashPassword } from "../utils/hashPassword";
import tokentGenerate from "../utils/tokenGenerate";

const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);
    const user = await User.findOne({ email });
    if (user) {
      console.log("User Found Successfully");
      const matchPassword = await comparePassword(password, user.password);
      if (matchPassword) {
        console.log("Password Matched Successfully");
        const token = tokentGenerate(user._id as unknown as string);
        return res
          .status(200)
          .json({ err: false, message: "User Logged in successfully", token });
      }
      res
        .status(404)
        .json({ error: true, message: "Invalid Email and Password" });
    }
    res
      .status(404)
      .json({ error: true, message: "Invalid Email and Password" });
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

const updateUserProfile = async (req: any, res: Response) => {
  try {
    const id = req.user;
    const user = await User.findOne({ _id: id });
    if ((req.body.oldPassword || req.body.password) && user) {
      const verifiedPassword = await comparePassword(
        req.body.oldPassword,
        user.password as string
      );
      if (verifiedPassword) {
        req.body.password = await hashPassword(req.body.password as string);
      } else {
        return res
          .status(403)
          .json({ error: true, message: "Password Doesnot Matches" });
      }
    }
    if (user) {
      const updatexUser = await User.findByIdAndUpdate(id, {
        ...req.body,
      }).select("-password");
      return res.status(200).json({
        error: false,
        message: "Profile Updated Successfully",
        data: updatexUser,
      });
    }
    res
      .status(500)
      .json({ error: true, message: "Something went wrong please try later" });
  } catch (err: any) {
    res.status(500).json({ error: true, message: err.message });
  }
};
const authController = {
  login,
  getUserProfile,
  updateUserProfile,
};

export default authController;
