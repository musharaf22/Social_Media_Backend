import express from "express";
import postController from "../controller/postControllers";
import authUser from "../middleware/authorization";
const router = express.Router();

router.post("/", [authUser], postController.createPost);
export default router;
