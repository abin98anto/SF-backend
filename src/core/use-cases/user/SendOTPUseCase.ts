import { UserRepositoryInterface } from "../../interfaces/UserRepositoryInterface";
import { EmailService } from "../../../infrastructure/external-services/EmailService";
import { generateOTP } from "../../../shared/utils/generateOTP";

export class SendOTPUseCase {
  constructor(
    private userRepository: UserRepositoryInterface,
    private emailService: EmailService
  ) {}

  async execute(email: string): Promise<void> {
    const { otp, expiresAt: expiration } = generateOTP();

    await this.userRepository.saveOTP(email, otp, expiration);
    await this.emailService.sendOTP(email, otp);
  }
}
