import { Request, Response } from "express";
import {
  miscMessages,
  otpMessages,
  userMessages,
} from "../../../shared/constants/constants";
import { User, UserRole } from "../../../core/entities/User";
import { errorObjectCatch } from "../../../shared/utils/errorObjectCatch";
import { SendOTPUseCase } from "../../../core/use-cases/user/user-signup/SendOTPUseCase";
import { VerifyOTPUseCase } from "../../../core/use-cases/user/user-signup/VerifyOTPUseCase";
import { UserRepository } from "../../../infrastructure/repositories/UserRepository";

export class TutorController {
  constructor(
    private userRepository: UserRepository,
    private tutorSignupUseCase: SendOTPUseCase,
    private tutorOTPUseCase: VerifyOTPUseCase
  ) {}

  sendOTP = async (req: Request, res: Response): Promise<void> => {
    try {
      const { name, email, password, role, profilePicture, resumeUrl } =
        req.body;
      const user: User = {
        name,
        email,
        password,
        role: UserRole.TUTOR,
        isActive: false,
        profilePicture,
        resumeUrl,
      };

      let result = await this.tutorSignupUseCase.execute(user);
      result.success
        ? res.status(200).json({ message: "heyy " + otpMessages.OTP_SENT })
        : res.status(400).json({ message: userMessages.EMAIL_EXISTS });
    } catch (error) {
      errorObjectCatch(error);
      res.status(500).json({
        message:
          error instanceof Error
            ? error.message
            : miscMessages.INTERNAL_SERVER_ERROR,
      });
    }
  };

  verifyOTP = async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, otp } = req.body;

      const result = await this.tutorOTPUseCase.execute(email, otp);

      if (result.success) {
        const user = await this.userRepository.findByEmail(email);
        if (user) user.role = UserRole.TUTOR;
        res.status(200).json({ message: result.message });
      } else {
        if (
          result.message === otpMessages.OTP_SENDING_ERROR ||
          result.message === otpMessages.OTP_EXPIRED ||
          result.message === otpMessages.USER_NOT_FOUND ||
          result.message === otpMessages.WRONG_OTP
        ) {
          res.status(400).json({ error: result.message });
        } else {
          res.status(500).json({ error: "Internal Server Error" });
        }
      }
    } catch (error) {
      errorObjectCatch(error);
    }
  };
}
