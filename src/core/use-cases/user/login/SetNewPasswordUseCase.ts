import { UserRepository } from "../../../../infrastructure/repositories/UserRepository";
import {
  miscMessages,
  otpMessages,
} from "../../../../shared/constants/constants";
import { hashPassword } from "../../../../shared/utils/hashing";
import { UseCaseResponse } from "../../../entities/UseCaseResponse";

export class SetNewPasswordUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(
    email: string,
    otp: string,
    password: string
  ): Promise<UseCaseResponse> {
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

      user.password = await hashPassword(password);
      user.otp = null;
      user.otpExpiration = null;
      await this.userRepository.update(user);

      return { success: true, message: miscMessages.PASS_CHANGE_SUCC };
    } catch (error) {
      if (error instanceof Error) {
        return { success: false, message: error.message };
      } else {
        return { success: false };
      }
    }
  }
}
