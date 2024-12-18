import { Request, Response } from "express";
import {
  miscMessages,
  otpMessages,
  userMessages,
} from "../../../shared/constants/constants";
import { User, UserRole } from "../../../core/entities/User";
import { SendOTPUseCase } from "../../../core/use-cases/user/user-signup/SendOTPUseCase";
import { VerifyOTPUseCase } from "../../../core/use-cases/user/user-signup/VerifyOTPUseCase";

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

      console.log("Send OTP result:", result);

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
    // console.log("It's here!!!", req.body);
    const { email, otp } = req.body;

    const result = await this.verifyOTPUseCase.execute(email, otp);

    // console.log("vOTP", result);
    if (result.success) {
      // console.log("first");
      res.status(200).json({ success: true, message: result.message });
      // console.log("W");
      return;
    } else {
      if (
        result.message === otpMessages.OTP_EXPIRED ||
        result.message === otpMessages.WRONG_OTP
      ) {
        // console.log("Third");
        res.status(400).json({ success: true, error: result.message });
        return;
      } else {
        // console.log("fourth");
        res
          .status(500)
          .json({ success: true, error: miscMessages.INTERNAL_SERVER_ERROR });
        return;
      }
    }
    // res.status(400).json({ success: true, error: "nothing happened!" });
    // return;
  };
}
