import express from "express";
import userController from "../controller/userController";
const router = express.Router();

router.post("/", userController.createUser);
router.delete("/:id", userController.deleteUser);
router.get("/", userController.getAllUsers);
router.put("/:id", userController.updateUser);
router.patch("/:id", userController.friendRequest);

export default router;
