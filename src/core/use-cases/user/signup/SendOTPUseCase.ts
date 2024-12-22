import { UserRepositoryInterface } from "../../../interfaces/UserRepositoryInterface";
import { EmailService } from "../../../../infrastructure/external-services/EmailService";
import { generateOTP } from "../../../../shared/utils/generateOTP";
import { User } from "../../../entities/User";
import { userMessages } from "../../../../shared/constants/constants";
import { hashPassword } from "../../../../shared/utils/hashing";
import { errorObjectCatch } from "../../../../shared/utils/errorObjectCatch";

export class SendOTPUseCase {
  constructor(
    private userRepository: UserRepositoryInterface,
    private emailService: EmailService
  ) {}

  async execute(user: User): Promise<{ success: boolean; data?: string }> {
    try {
      const emailExists = await this.userRepository.findByEmail(
        user.email as string
      );

      if (emailExists) {
        throw new Error(userMessages.EMAIL_EXISTS);
      }

      user.password = await hashPassword(user.password as string);
      const { otp, expiresAt: expiration } = generateOTP();
      user.otp = otp;
      user.otpExpiration = expiration;

      console.log("SendOTPUseCase.ts >>> OTP : ", otp);

      await this.emailService.sendOTP(user.email as string, user.otp);
      await this.userRepository.add(user);

      return { success: true };
    } catch (error) {
      errorObjectCatch(error);
      if (error instanceof Error) {
        return { success: false, data: error.message };
      } else {
        return { success: false };
      }
    }
  }
}
