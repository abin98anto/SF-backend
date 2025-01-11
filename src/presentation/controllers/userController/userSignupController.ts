import { Request, Response } from "express";
import {
  miscMessages,
  otpMessages,
  userMessages,
} from "../../../shared/constants/constants";
import { User } from "../../../core/entities/User";
import { SendOTPUseCase } from "../../../core/use-cases/user/signup/SendOTPUseCase";
import { VerifyOTPUseCase } from "../../../core/use-cases/user/signup/VerifyOTPUseCase";
import { GoogleAuthUseCase } from "../../../core/use-cases/user/signup/GoogleAuthUseCase";
import { OAuth2Client } from "google-auth-library";
import { ForgotPasswordUseCase } from "../../../core/use-cases/user/login/ForgotPasswordUseCase";
import { SetNewPasswordUseCase } from "../../../core/use-cases/user/login/SetNewPasswordUseCase";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export class UserController {
  constructor(
    private sendOTPUseCase: SendOTPUseCase,
    private verifyOTPUseCase: VerifyOTPUseCase,
    private googleAuthUseCase: GoogleAuthUseCase,
    private forgotPasswordUseCase: ForgotPasswordUseCase,
    private setNewPasswordUseCase: SetNewPasswordUseCase
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
      };

      const result = await this.sendOTPUseCase.execute(user);

      if (result.message === userMessages.EMAIL_EXISTS) {
        res.status(200).json({ message: result.message });
      } else if (result.success) {
        res.status(200).json({ message: otpMessages.OTP_SENT });
      } else {
        throw new Error(otpMessages.OTP_SENDING_ERROR);
      }
    } catch (error) {
      console.error(otpMessages.OTP_SENDING_ERROR, error);
      res
        .status(400)
        .send(
          error instanceof Error ? error.message : miscMessages.UNKNOWN_ERROR
        );
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

  GoogleSignIn = async (req: Request, res: Response): Promise<void> => {
    try {
      const { token } = req.body;
      if (!token) {
        res.status(400).json({ error: miscMessages.GOOGLE_TOKEN_REQ });
        return;
      }

      const response = await this.googleAuthUseCase.execute(token);

      res.status(200).json({
        success: true,
        message: response.message,
        data: response.data,
      });
      return;
    } catch (error) {
      console.log(miscMessages.GOOGLE_SIGNIN_FAIL, error);
      res.status(401).json({ error: miscMessages.GOOGLE_SIGNIN_FAIL });
    }
  };

  forgotPassword = async (req: Request, res: Response): Promise<void> => {
    try {
      const { email } = req.query;
      const response = await this.forgotPasswordUseCase.execute(
        email as string
      );
      
      if (response.success) {
        res.status(200).json({ success: true });
      } else {
        res.status(404).json({ success: false, message: response.message });
      }
    } catch (error) {
      console.log(miscMessages.FORGOT_PASS_CONTROLLER_ERR);
      res.status(401).json({
        success: false,
        error: miscMessages.FORGOT_PASS_CONTROLLER_ERR,
      });
    }
  };

  setPassword = async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, otp, password } = req.body;
      const response = await this.setNewPasswordUseCase.execute(
        email,
        otp,
        password
      );
      if (response.success) {
        res.status(200).json({ success: true });
      } else {
        res.status(404).json({ success: false, message: response.message });
      }
    } catch (error) {
      console.log(miscMessages.SET_PASS_CONTROLLER_ERR);
      res.status(401).json({
        success: false,
        error: miscMessages.SET_PASS_CONTROLLER_ERR,
      });
    }
  };
}
