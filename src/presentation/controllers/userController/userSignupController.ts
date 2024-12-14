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
      // console.log("jowy", result.data);

      if (result.data === userMessages.EMAIL_EXISTS) {
        // console.log("email exists");
        res.status(200).json({
          message: result.data,
        });
      } else {
        // console.log("some other error");
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
