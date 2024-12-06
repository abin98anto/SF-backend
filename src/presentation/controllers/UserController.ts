import { Request, Response } from "express";
import { otpMessages } from "../../shared/constants/errorsMessages";
import { User } from "../../core/entities/User";
import { SendOTPUseCase } from "../../core/use-cases/user/SendOTPUseCase";
import { VerifyOTPUseCase } from "../../core/use-cases/user/VerifyOTPUseCase";

const tempOTPStore: {
  [email: string]: { otp: string; expiresAt: Date; userData: User };
} = {};

export class UserController {
  constructor(
    private sendOTPUseCase: SendOTPUseCase,
    private verifyOTPUseCase: VerifyOTPUseCase
  ) {}

  async sendOTP(req: Request, res: Response): Promise<void> {
    try {
      const { name, email, password, role, profilePicture } = req.body;
      const user: User = {
        name,
        email,
        password,
        role,
        isActive: false,
        profilePicture,
      };

      await this.sendOTPUseCase.execute(user);
      res.status(200).send(`${otpMessages.OTP_SENT} ${email}`);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).send(error.message);
      }
    }
  }

  async verifyOTP(req: Request, res: Response): Promise<void> {
    const { email, otp } = req.body;

    // Call the use case and get the response
    const result = await this.verifyOTPUseCase.execute(email, otp);

    // Respond based on the result
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
  }
}
