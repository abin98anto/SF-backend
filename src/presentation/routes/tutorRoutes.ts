import express from "express";
import { TutorController } from "../controllers/tutorController/tutorSignupController";
import { UserRepository } from "../../infrastructure/repositories/UserRepository";
import { EmailService } from "../../infrastructure/external-services/EmailService";
import { TutorSignupUseCase } from "../../core/use-cases/tutor/tutor-signup/TutorSignupUseCase";
import { TutorOTPUseCase } from "../../core/use-cases/tutor/tutor-signup/TutorOTPUseCase";

const tutorRouter = express.Router();

const tutorRepository = new UserRepository(); // Can be a separate TutorRepository
const emailService = new EmailService();

const sendOTPTutorUseCase = new TutorSignupUseCase(
  tutorRepository,
  emailService
);
const verifyOTPTutorUseCase = new TutorOTPUseCase(tutorRepository);

const tutorAuthController = new TutorController(
  sendOTPTutorUseCase,
  verifyOTPTutorUseCase
);

tutorRouter.post("/signup", tutorAuthController.sendOTP);
tutorRouter.post("/verify-otp", tutorAuthController.verifyOTP);

export default tutorRouter;
