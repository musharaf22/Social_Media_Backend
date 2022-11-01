import express from "express";
import userRouter from "./userRoutes";
import authUser from "./authUser";
const router = express.Router();

router.use("/user", userRouter);
router.use("/auth", authUser);
export default router;
