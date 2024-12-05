import { UserModel } from "../../../infrastructure/database/mongoose-schemas/UserSchema";
import { UserRepositoryInterface } from "../../interfaces/UserRepositoryInterface";
import { otpMessages } from "../../../shared/constants/errorsMessages";
import { messages } from "../../../shared/constants/miscErrors";

export class VerifyOTPUseCase {
  constructor(private userRepository: UserRepositoryInterface) {}

  async execute(email: string, otp: string): Promise<void> {
    try {
      const user = await UserModel.findOne({ email });

      if (!user || user.otp !== otp || user.otpExpiration! < new Date()) {
        throw new Error(otpMessages.OTP_EXPIRED);
      }

      await this.userRepository.toggleUserStatus(email);

      console.log(`OTP has been sent to ${email}, and the OTP  is ${otp}`);
    } catch (error) {
      if (error instanceof Error) {
        console.log(messages.UNKNOWN_ERROR, error.message);
      } else {
        console.log(messages.UNKNOWN_ERROR, error);
      }
    }
  }
}
