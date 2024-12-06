import express from "express";
import { UserController } from "../controllers/UserController";
import { UserRepository } from "../../infrastructure/repositories/UserRepository";
import { EmailService } from "../../infrastructure/external-services/EmailService";
import { SendOTPUseCase } from "../../core/use-cases/user/SendOTPUseCase";
import { VerifyOTPUseCase } from "../../core/use-cases/user/VerifyOTPUseCase";

const userRouter = express.Router();

const userRepository = new UserRepository();
const emailService = new EmailService();
const sendOTPUseCase = new SendOTPUseCase(userRepository, emailService);
const verifyOTPUseCase = new VerifyOTPUseCase(userRepository);
const userController = new UserController(sendOTPUseCase, verifyOTPUseCase);

userRouter.post("/send-otp", userController.sendOTP);
userRouter.post("/verify-otp", userController.verifyOTP);

export default userRouter;
