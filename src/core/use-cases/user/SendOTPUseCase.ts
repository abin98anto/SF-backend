import { UserRepositoryInterface } from "../../interfaces/UserRepositoryInterface";
import { EmailService } from "../../../infrastructure/external-services/EmailService";
import { generateOTP } from "../../../shared/utils/generateOTP";
import { User } from "../../entities/User";
import { UserModel } from "../../../infrastructure/database/mongoose-schemas/UserSchema";
import { userMessages } from "../../../shared/constants/errorsMessages";

export class SendOTPUseCase {
  constructor(
    private userRepository: UserRepositoryInterface,
    private emailService: EmailService
  ) {}

  async execute(user: User): Promise<void> {
    const emailExists = await this.userRepository.findByEmail(user.email);

    if (emailExists) {
      throw new Error(userMessages.EMAIL_EXISTS);
    }

    await this.userRepository.add(user);

    const { otp, expiresAt: expiration } = generateOTP();
    console.log("SendOTPUseCase.ts >>> OTP : ", otp);

    await this.userRepository.saveOTP(user.email, otp, expiration);
    await this.emailService.sendOTP(user.email, otp);
  }
}
