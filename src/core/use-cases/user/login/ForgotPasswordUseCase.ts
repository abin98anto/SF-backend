import { EmailService } from "../../../../infrastructure/external-services/EmailService";
import {
  miscMessages,
  userMessages,
} from "../../../../shared/constants/constants";
import { generateOTP } from "../../../../shared/utils/generateOTP";
import { UseCaseResponse } from "../../../entities/UseCaseResponse";
import { UserRepositoryInterface } from "../../../interfaces/UserRepositoryInterface";

export class ForgotPasswordUseCase {
  constructor(
    private userRepository: UserRepositoryInterface,
    private emailService: EmailService
  ) {}

  async execute(email: string): Promise<UseCaseResponse> {
    try {
      const user = await this.userRepository.findByEmail(email);

      if (!user) {
        throw new Error(userMessages.USER_NOT_FOUND);
      }

      const { otp, expiresAt: expiration } = generateOTP();
      user.otp = otp;
      user.otpExpiration = expiration;

      console.log("ForgotPasswordUseCase.ts >>> OTP : ", otp);

      await this.emailService.sendOTP(user.email as string, user.otp);
      await this.userRepository.add(user);

      return { success: true };
    } catch (error) {
      console.log(miscMessages.FORGOT_PASSWORD_USECASE_ERR, error);
      if (error instanceof Error) {
        return { success: false, message: error.message };
      } else {
        return { success: false };
      }
    }
  }
}
