import { Request, Response } from "express";
import { otpMessages, userMessages } from "../../../shared/constants/constants";
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
      const {
        username: name,
        email,
        password,
        role,
        profilePicture,
      } = req.body;
      const user: User = {
        name,
        email,
        password,
        role: UserRole.USER,
        isActive: false,
        profilePicture,
      };

      const result = await this.sendOTPUseCase.execute(user);
      console.log("jowy", result);

      if (result.data === userMessages.EMAIL_EXISTS) {
        console.log("email exists");
        res.status(200).json({
          message: result.data,
        });
      } else {
        console.log("some other error");
        res.status(200).json({
          message: result.data,
        });
      }
      // res
      //   .status(200)
      //   .json({ data: result.data })
      //   .send(`${otpMessages.OTP_SENT} ${email}`);
      // res.status(200).json({
      //   message: result.data,
      // });
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).send(error.message);
      }
    }
  };

  verifyOTP = async (req: Request, res: Response): Promise<void> => {
    const { email, otp } = req.body;

    const result = await this.verifyOTPUseCase.execute(email, otp);

    if (result.success) {
      res.status(200).json({ success: true, message: result.message });
    } else {
      if (
        result.message === otpMessages.OTP_SENDING_ERROR ||
        result.message === otpMessages.OTP_EXPIRED ||
        result.message === otpMessages.USER_NOT_FOUND ||
        result.message === otpMessages.WRONG_OTP
      ) {
        res.status(400).json({ success: true, error: result.message });
      } else {
        res.status(500).json({ success: true, error: "Internal Server Error" });
      }
    }
  };
}
