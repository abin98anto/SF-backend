import { UserRepositoryInterface } from "../../../interfaces/user/UserRepositoryInterface";
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

  async execute(user: User): Promise<void> {
    try {
      user.password = await hashPassword(user.password);
      const emailExists = await this.userRepository.findByEmail(user.email);

      if (emailExists) {
        throw new Error(userMessages.EMAIL_EXISTS);
      }

      await this.userRepository.add(user);

      const { otp, expiresAt: expiration } = generateOTP();
      console.log("SendOTPUseCase.ts >>> OTP : ", otp);

      await this.userRepository.saveOTP(user.email, otp, expiration);
      await this.emailService.sendOTP(user.email, otp);
    } catch (error) {
      errorObjectCatch(error);
    }
  }
}
