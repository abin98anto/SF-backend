import express from "express";
import { TutorController } from "../controllers/tutorController/tutorSignupController";
import { UserRepository } from "../../infrastructure/repositories/UserRepository";
import { EmailService } from "../../infrastructure/external-services/EmailService";
import { SendOTPUseCase } from "../../core/use-cases/user/user-signup/SendOTPUseCase";
import { VerifyOTPUseCase } from "../../core/use-cases/user/user-signup/VerifyOTPUseCase";

const tutorRouter = express.Router();

const tutorRepository = new UserRepository();
const emailService = new EmailService();

const sendOTPTutorUseCase = new SendOTPUseCase(tutorRepository, emailService);
const verifyOTPTutorUseCase = new VerifyOTPUseCase(tutorRepository);

const tutorAuthController = new TutorController(
  tutorRepository,
  sendOTPTutorUseCase,
  verifyOTPTutorUseCase
);

tutorRouter.post("/signup", tutorAuthController.sendOTP);
tutorRouter.post("/verify-otp", tutorAuthController.verifyOTP);

export default tutorRouter;
