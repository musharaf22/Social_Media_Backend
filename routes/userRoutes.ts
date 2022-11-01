import express from "express";
import userController from "../controller/userController";
import authUser from "../middleware/authorization";
const router = express.Router();

router.post("/", userController.createUser);
router.delete("/:id", userController.deleteUser);
router.get("/", [authUser], userController.getAllUsers);
router.put("/:id", userController.updateUser);
router.patch("/:id", userController.friendRequest);

export default router;
