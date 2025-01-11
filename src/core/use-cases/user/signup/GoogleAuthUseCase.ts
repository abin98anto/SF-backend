import { UserRepository } from "../../../../infrastructure/repositories/UserRepository";
import {
  miscMessages,
  otpMessages,
} from "../../../../shared/constants/constants";
import { UseCaseResponse } from "../../../entities/UseCaseResponse";
import { User } from "../../../entities/User";
import { AddUserUseCase } from "./AddUserUseCase";

export class GoogleAuthUseCase {
  constructor(
    private addUserUseCase: AddUserUseCase,
    private userRepository: UserRepository
  ) {}

  async execute(user: User): Promise<UseCaseResponse> {
    try {
      const userExists = await this.userRepository.findByEmail(user.email!);
      if (userExists) {
        return {
          success: true,
          message: otpMessages.USER_VERFIED,
          data: userExists,
        };
      }

      await this.addUserUseCase.execute(user);
      const newUser = await this.userRepository.findByEmail(user.email!);

      return {
        success: true,
        message: otpMessages.USER_VERFIED,
        data: newUser,
      };
    } catch (error) {
      console.log(miscMessages.GOOGLE_SIGNIN_FAIL, error);
      return { success: false, message: miscMessages.UNKNOWN_ERROR };
    }
  }
}
