import express from "express";
import { TutorController } from "../controllers/tutorController/tutorSignupController";
import { UserRepository } from "../../infrastructure/repositories/UserRepository";
import { EmailService } from "../../infrastructure/external-services/EmailService";
import { SendOTPUseCase } from "../../core/use-cases/user/user-signup/SendOTPUseCase";
import { VerifyOTPUseCase } from "../../core/use-cases/user/user-signup/VerifyOTPUseCase";
import { JWTService } from "../../infrastructure/external-services/JWTService";
import { LoginUseCase } from "../../core/use-cases/user/user-login/LoginUseCase";
import { TutorAuthController } from "../controllers/tutorController/tutorAuthController";
import { verifyRefreshToken } from "../middleware/authMiddleware";
import { TutorUpdateProfile } from "../../core/use-cases/tutor/update-profile/TutorUpdateProfile";
import { TutorProfileUpdate } from "../controllers/tutorController/tutorProlifeController";

const tutorRouter = express.Router();

const tutorRepository = new UserRepository();
const emailService = new EmailService();
const jwtService = new JWTService();

const loginUseCase = new LoginUseCase(tutorRepository, jwtService);
const sendOTPTutorUseCase = new SendOTPUseCase(tutorRepository, emailService);
const verifyOTPTutorUseCase = new VerifyOTPUseCase(tutorRepository);
const tutorController = new TutorController(
  tutorRepository,
  sendOTPTutorUseCase,
  verifyOTPTutorUseCase
);
const tutorAuthController = new TutorAuthController(loginUseCase, jwtService);
const tutorUpdateProfile = new TutorUpdateProfile(tutorRepository);

const updateTutor = new TutorProfileUpdate(tutorUpdateProfile, jwtService);

// tutor singup.
tutorRouter.post("/signup", tutorController.sendOTP);
tutorRouter.post("/verify-otp", tutorController.verifyOTP);

// tutor login.
tutorRouter.post("/login", tutorAuthController.Login);
tutorRouter.post(
  "/refresh-token",
  verifyRefreshToken,
  tutorAuthController.refreshAccessToken
);
tutorRouter.post("/logout", tutorAuthController.logout);

// update tutor profile.
tutorRouter.put("/update-profile", updateTutor.updateProfile);

export default tutorRouter;
