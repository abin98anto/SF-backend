import { Request, Response } from "express";
import {
  miscMessages,
  otpMessages,
  userMessages,
} from "../../../shared/constants/constants";
import { User, UserRole } from "../../../core/entities/User";
import { SendOTPUseCase } from "../../../core/use-cases/user/signup/SendOTPUseCase";
import { VerifyOTPUseCase } from "../../../core/use-cases/user/signup/VerifyOTPUseCase";

export class UserController {
  constructor(
    private sendOTPUseCase: SendOTPUseCase,
    private verifyOTPUseCase: VerifyOTPUseCase
  ) {}

  sendOTP = async (req: Request, res: Response): Promise<void> => {
    try {
      const { name, email, password, role } = req.body;
      const user: User = {
        name,
        email,
        password,
        role,
        profilePicture: userMessages.DEFAULT_PICTURE,
        isActive: role === UserRole.USER,
      };

      const result = await this.sendOTPUseCase.execute(user);

      if (result.data === userMessages.EMAIL_EXISTS) {
        res.status(200).json({ message: result.data });
      } else if (result.success) {
        res.status(200).json({ message: otpMessages.OTP_SENT });
      } else {
        throw new Error("Unexpected response from OTP service.");
      }
    } catch (error) {
      console.error("Error in sendOTP:", error);
      res
        .status(400)
        .send(error instanceof Error ? error.message : "Error occurred");
    }
  };

  verifyOTP = async (req: Request, res: Response): Promise<void> => {
    const { email, otp } = req.body;

    const result = await this.verifyOTPUseCase.execute(email, otp);

    if (result.success) {
      res.status(200).json({ success: true, message: result.message });
      return;
    } else {
      if (
        result.message === otpMessages.OTP_EXPIRED ||
        result.message === otpMessages.WRONG_OTP
      ) {
        res.status(400).json({ success: true, error: result.message });
        return;
      } else {
        res
          .status(500)
          .json({ success: true, error: miscMessages.INTERNAL_SERVER_ERROR });
        return;
      }
    }
  };
}
