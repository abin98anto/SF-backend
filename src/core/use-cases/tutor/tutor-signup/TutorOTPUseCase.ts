import { UserRepository } from "../../../../infrastructure/repositories/UserRepository";
import {
  miscMessages,
  otpMessages,
} from "../../../../shared/constants/constants";
import { errorObjectCatch } from "../../../../shared/utils/errorObjectCatch";
import { UserRole } from "../../../entities/User";

export class TutorOTPUseCase {
  constructor(private userRepository: UserRepository) {}

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

      user.otp = null;
      user.otpExpiration = null;
      await this.userRepository.update(user);

      return { success: true, message: otpMessages.USER_VERFIED };
    } catch (error) {
      errorObjectCatch(error);
      return { success: false, message: miscMessages.UNKNOWN_ERROR };
    }
  }
}
