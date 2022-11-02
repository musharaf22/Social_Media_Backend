import express from "express";
import authController from "../controller/authentication";
import authUser from "../middleware/authorization";
const router = express.Router();

router.post("/", authController.login);
router.get("/profile", [authUser], authController.getUserProfile);
router.put("/profile", [authUser], authController.updateUserProfile);

export default router;
