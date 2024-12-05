import { Request, Response } from "express";
import { AddUserUseCase } from "../../core/use-cases/user/AddUserUseCase";
import { UserRepository } from "../../infrastructure/repositories/UserRepository";
import { otpMessages } from "../../shared/constants/errorsMessages";
import { generateOTP } from "../../shared/utils/generateOTP";
import { EmailService } from "../../infrastructure/external-services/EmailService";
import { User } from "../../core/entities/User";
import { UserRole } from "../../core/entities/User";
import { SubscriptionType } from "../../core/entities/User";
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
      res.status(200).send(otpMessages.OTP_SENT);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).send(error.message);
      }
    }
  }

  async verifyOTP(req: Request, res: Response): Promise<void> {
    try {
      const { email, otp } = req.body;

      await this.verifyOTPUseCase.execute(email, otp);
      res.status(200).json({ message: otpMessages.OTP_SENT });
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).send(error.message);
      }
    }
  }
}
