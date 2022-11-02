import express from "express";
import userRouter from "./userRoutes";
import authUser from "./authUser";
import postRouter from "./postRoutes";
const router = express.Router();

router.use("/user", userRouter);
router.use("/auth", authUser);
router.use("/post", postRouter);
export default router;
