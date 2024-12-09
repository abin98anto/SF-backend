import { Request, Response } from "express";
import { TutorSignupUseCase } from "../../../core/use-cases/tutor/tutor-signup/TutorSignupUseCase";
import { miscMessages, otpMessages } from "../../../shared/constants/constants";
import { TutorOTPUseCase } from "../../../core/use-cases/tutor/tutor-signup/TutorOTPUseCase";
import { User } from "../../../core/entities/User";
import { errorObjectCatch } from "../../../shared/utils/errorObjectCatch";

export class TutorController {
  constructor(
    private tutorSignupUseCase: TutorSignupUseCase,
    private tutorOTPUseCase: TutorOTPUseCase
  ) {}

  sendOTP = async (req: Request, res: Response): Promise<void> => {
    try {
      const { name, email, password, role, profilePicture, resumeUrl } =
        req.body;
      const user: User = {
        name,
        email,
        password,
        role,
        isActive: false,
        profilePicture,
      };

      await this.tutorSignupUseCase.execute(user);

      res.status(200).json({ message: otpMessages.OTP_SENT });
    } catch (error) {
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
