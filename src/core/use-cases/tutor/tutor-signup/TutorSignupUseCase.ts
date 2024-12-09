import { EmailService } from "../../../../infrastructure/external-services/EmailService";
import { userMessages } from "../../../../shared/constants/constants";
import { errorObjectCatch } from "../../../../shared/utils/errorObjectCatch";
import { generateOTP } from "../../../../shared/utils/generateOTP";
import { User, UserRole } from "../../../entities/User";
import { UserRepositoryInterface } from "../../../interfaces/user/UserRepositoryInterface";
import bcrypt from "bcrypt";

export class TutorSignupUseCase {
  constructor(
    private userRepository: UserRepositoryInterface,
    private emailService: EmailService
  ) {}

  async execute(user: User): Promise<void> {
    try {
      const existingUser = await this.userRepository.findByEmail(user.email);

      if (existingUser) {
        throw new Error(userMessages.EMAIL_EXISTS);
      }

      user.password = await bcrypt.hash(user.password, 10);
      user.role = UserRole.TUTOR;

      await this.userRepository.add(user);

      const { otp, expiresAt: expiration } = generateOTP();
      console.log("tutorSigupUseCase.ts >>> OTP : ", otp);

      await this.userRepository.saveOTP(user.email, otp, expiration);
      await this.emailService.sendOTP(user.email, otp);
    } catch (error) {
      errorObjectCatch(error);
    }
  }
}
