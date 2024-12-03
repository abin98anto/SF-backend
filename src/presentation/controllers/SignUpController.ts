import { Request, Response } from "express";
import { EmailService } from "../../infrastructure/external-services/EmailService";
import { UserRepository } from "../../infrastructure/repositories/UserRepository";
import { CreateUserUseCase } from "../../core/use-cases/user/CreateUserUseCase";
import crypto from "crypto";

const otpStore: Map<string, { otp: string; expiresAt: number }> = new Map();

export class SignUpController {
  private emailService = new EmailService();
  private userRepository = new UserRepository();
  private createUserUseCase = new CreateUserUseCase(this.userRepository);

  async sendOTP(req: Request, res: Response): Promise<void> {
    const { email } = req.body;

    if (!email) {
      res.status(400).send({ message: "Email is required" });
      return;
    }

    const otp = crypto.randomInt(100000, 999999).toString();
    otpStore.set(email, { otp, expiresAt: Date.now() + 10 * 60 * 1000 });

    try {
      await this.emailService.sendOTP(email, otp);
      res.status(200).send({ message: "OTP sent successfully" });
    } catch (error) {
      res.status(500).send({ message: "Failed to send OTP", error });
    }
  }

  async verifyAndSignUp(req: Request, res: Response): Promise<void> {
    const { email, password, otp, profileUrl } = req.body;

    if (!otpStore.has(email)) {
      res.status(400).send({ message: "Invalid or expired OTP" });
      return;
    }

    const storedOtp = otpStore.get(email)!;
    if (storedOtp.otp !== otp || storedOtp.expiresAt < Date.now()) {
      res.status(400).send({ message: "Invalid or expired OTP" });
      return;
    }

    otpStore.delete(email);

    try {
      const user = await this.createUserUseCase.execute({
        email,
        password,
        profileUrl,
      });
      res.status(201).send({ message: "User registered successfully", user });
    } catch (error) {
      res.status(500).send({ message: "Failed to register user", error });
    }
  }
}
