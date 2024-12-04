import express from "express";
import { UserController } from "../controllers/UserController";

const router = express.Router();
const userController = new UserController();

router.post("/signup", userController.register.bind(userController));

export default router;