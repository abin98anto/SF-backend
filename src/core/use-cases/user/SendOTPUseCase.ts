import { UserRepositoryInterface } from "../../interfaces/UserRepositoryInterface";
import { EmailService } from "../../../infrastructure/external-services/EmailService";
import { generateOTP } from "../../../shared/utils/generateOTP";
import { User } from "../../entities/User";

export class SendOTPUseCase {
  constructor(
    private userRepository: UserRepositoryInterface,
    private emailService: EmailService
  ) {}

  async execute(user: User): Promise<void> {
    await this.userRepository.add(user);

    const { otp, expiresAt: expiration } = generateOTP();

    await this.userRepository.saveOTP(user.email, otp, expiration);
    await this.emailService.sendOTP(user.email, otp);
  }
}
