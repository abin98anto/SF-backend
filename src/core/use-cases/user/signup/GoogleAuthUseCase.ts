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
      // console.log("user exists", userExists);
      if (userExists) {
        return {
          success: true,
          message: otpMessages.USER_VERFIED,
          data: userExists,
        };
      }
      // const googleUser = await this.googleAuthService.verifyGoogleToken(token);
      // console.log("goodgle user", googleUser);
      await this.addUserUseCase.execute(user);
      // console.log("done in use case", response);
      const newUser = await this.userRepository.findByEmail(user.email!);
      // return response;
      return {
        success: true,
        message: otpMessages.USER_VERFIED,
        data: newUser,
      };
    } catch (error) {
      console.log("error in google use case", error);
      // throw new Error("Google authentication failed");
      return { success: false, message: miscMessages.UNKNOWN_ERROR };
    }
  }
}
