import express from "express";
import { protect } from "../../Auth/Middlewares/authMiddleware";

import {
  createUserController,
  deleteUserController,
  getAllUsersController,
  getUserController,
  updateUserController,
  verifyUserController,
} from "../Controller/users.controller";

const router = express.Router();


router.post("/add", protect, createUserController);

router.get("/", protect, getAllUsersController);

router.get("/:id", protect, getUserController);

router.put("/:id", protect, updateUserController);

router.delete("/:id", protect, deleteUserController);

router.put("/verify/:id", protect, verifyUserController);

export default router;
