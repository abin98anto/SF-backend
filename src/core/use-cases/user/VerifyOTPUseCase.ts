import { UserModel } from "../../../infrastructure/database/mongoose-schemas/UserSchema";
import { UserRepositoryInterface } from "../../interfaces/UserRepositoryInterface";
import { otpMessages } from "../../../shared/constants/errorsMessages";
import { messages } from "../../../shared/constants/miscErrors";

export class VerifyOTPUseCase {
  constructor(private userRepository: UserRepositoryInterface) {}

  async execute(email: string, otp: string): Promise<void> {
    try {
      const user = await this.userRepository.findByEmail(email);
      if (!user) {
        throw new Error(otpMessages.USER_NOT_FOUND);
      }

      if (user.otp != otp) {
        throw new Error(otpMessages.WRONG_OTP);
      }

      if (user.otpExpiration && user.otpExpiration! < new Date()) {
        throw new Error(otpMessages.OTP_EXPIRED);
      }

      user.isActive = true;
      user.otp = null;
      user.otpExpiration = null;
      await this.userRepository.update(user);

    //   await this.userRepository.toggleUserStatus(email);
    } catch (error) {
      if (error instanceof Error) {
        console.log(messages.UNKNOWN_ERROR, error.message);
      } else {
        console.log(messages.UNKNOWN_ERROR, error);
      }
    }
  }
}
