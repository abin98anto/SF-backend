import express from "express";
import { UserController } from "../controllers/userController/userSignupController";
import { UserRepository } from "../../infrastructure/repositories/UserRepository";
import { EmailService } from "../../infrastructure/external-services/EmailService";
import { SendOTPUseCase } from "../../core/use-cases/user/user-signup/SendOTPUseCase";
import { VerifyOTPUseCase } from "../../core/use-cases/user/user-signup/VerifyOTPUseCase";
import { AuthController } from "../controllers/userController/userAuthController";
import { LoginUseCase } from "../../core/use-cases/user/user-login/LoginUseCase";
import { JWTService } from "../../infrastructure/external-services/JWTService";
import { verifyRefreshToken } from "../middleware/authMiddleware";

const userRouter = express.Router();

const userRepository = new UserRepository();
const emailService = new EmailService();
const jwtService = new JWTService();

const loginUseCase = new LoginUseCase(userRepository, jwtService);
const sendOTPUseCase = new SendOTPUseCase(userRepository, emailService);
const verifyOTPUseCase = new VerifyOTPUseCase(userRepository);
const userController = new UserController(sendOTPUseCase, verifyOTPUseCase);
const authController = new AuthController(loginUseCase, jwtService);

userRouter.post("/send-otp", userController.sendOTP);
userRouter.post("/verify-otp", userController.verifyOTP);

userRouter.post("/login", authController.Login);
userRouter.post(
  "/refresh-token",
  verifyRefreshToken,
  authController.refreshAccessToken
);

export default userRouter;
