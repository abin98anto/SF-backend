import { UserRepositoryInterface } from "../../../interfaces/UserRepositoryInterface";
import { otpMessages } from "../../../../shared/constants/constants";
import { miscMessages } from "../../../../shared/constants/constants";

export class VerifyOTPUseCase {
  constructor(private userRepository: UserRepositoryInterface) {}

  async execute(
    email: string,
    otp: string
  ): Promise<{ success: boolean; message: string }> {
    try {
      const user = await this.userRepository.findByEmail(email);
      if (!user) {
        return { success: false, message: otpMessages.USER_NOT_FOUND };
      }

      if (user.otp !== otp) {
        return { success: false, message: otpMessages.WRONG_OTP };
      }

      if (user.otpExpiration && user.otpExpiration < new Date()) {
        return { success: false, message: otpMessages.OTP_EXPIRED };
      }

      user.isActive = true;
      user.otp = null;
      user.otpExpiration = null;
      await this.userRepository.update(user);

      return { success: true, message: otpMessages.USER_VERFIED };
    } catch (error) {
      if (error instanceof Error) {
        console.log(miscMessages.UNKNOWN_ERROR, error.message);
      } else {
        console.log(miscMessages.UNKNOWN_ERROR, error);
      }
      return { success: false, message: miscMessages.UNKNOWN_ERROR };
    }
  }
}
