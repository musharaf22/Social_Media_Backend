import express from "express";
import postController from "../controller/postControllers";
import authUser from "../middleware/authorization";
const router = express.Router();

router.post("/", [authUser], postController.createPost);
router.put("/like", [authUser], postController.updateLikes);
router.put("/comment", [authUser], postController.addComment);
router.put("/share", [authUser], postController.sharePost);

export default router;
