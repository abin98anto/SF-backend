import express from "express";
import { UserController } from "../controllers/userController/userSignupController";
import { UserRepository } from "../../infrastructure/repositories/UserRepository";
import { EmailService } from "../../infrastructure/external-services/EmailService";
import { SendOTPUseCase } from "../../core/use-cases/user/signup/SendOTPUseCase";
import { VerifyOTPUseCase } from "../../core/use-cases/user/signup/VerifyOTPUseCase";
import { AuthController } from "../controllers/userController/userAuthController";
import { LoginUseCase } from "../../core/use-cases/user/login/LoginUseCase";
import { JWTService } from "../../infrastructure/external-services/JWTService";
import {
  verifyAccessToken,
  verifyRefreshToken,
} from "../middleware/authMiddleware";
import { UserUpdateController } from "../controllers/userController/userUpdateController";
import { UpdateDetailsUseCase } from "../../core/use-cases/user/update/UpdateDetailsUseCase";

const userRouter = express.Router();

const userRepository = new UserRepository();
const emailService = new EmailService();
const jwtService = new JWTService();

const updateDetailsUseCase = new UpdateDetailsUseCase(userRepository);
const loginUseCase = new LoginUseCase(userRepository, jwtService);
const sendOTPUseCase = new SendOTPUseCase(userRepository, emailService);
const verifyOTPUseCase = new VerifyOTPUseCase(userRepository);
const userController = new UserController(sendOTPUseCase, verifyOTPUseCase);
const authController = new AuthController(loginUseCase, jwtService);
const userUpdateController = new UserUpdateController(updateDetailsUseCase);

// User signup.
userRouter.post("/send-otp", userController.sendOTP);
userRouter.post("/verify-otp", userController.verifyOTP);

// User Auth.
userRouter.post("/login", authController.Login);
userRouter.post(
  "/refresh-token",
  verifyRefreshToken,
  authController.refreshAccessToken
);
userRouter.post("/logout", verifyAccessToken, authController.logout);

// User update.
userRouter.patch("/update", userUpdateController.updateUser);

export default userRouter;
