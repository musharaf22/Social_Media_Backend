import express from "express";
import authController from "../controller/authentication";
const router = express.Router();

router.post("/", authController.login);

export default router;
