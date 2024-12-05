import express from "express";
import { UserController } from "../controllers/UserController";
import { UserRepository } from "../../infrastructure/repositories/UserRepository";
import { EmailService } from "../../infrastructure/external-services/EmailService";
import { SendOTPUseCase } from "../../core/use-cases/user/SendOTPUseCase";
import { VerifyOTPUseCase } from "../../core/use-cases/user/VerifyOTPUseCase";

const router = express.Router();

const userRepository = new UserRepository();
const emailService = new EmailService();
const sendOTPUseCase = new SendOTPUseCase(userRepository, emailService);
const verifyOTPUseCase = new VerifyOTPUseCase(userRepository);
const userController = new UserController(sendOTPUseCase, verifyOTPUseCase);

router.post("/send-otp", (req, res) => userController.sendOTP(req, res));
router.post("/verify-otp", (req, res) => userController.verifyOTP(req, res));

export default router;
