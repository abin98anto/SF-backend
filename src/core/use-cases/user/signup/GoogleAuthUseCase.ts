import { User } from "../../../entities/User";
import {
  GoogleAuthResponse,
  IGoogleAuthService,
} from "../../../interfaces/GoogleAuthInterface";
import { AddUserUseCase } from "./AddUserUseCase";

export class GoogleAuthUseCase {
  constructor(
    private googleAuthService: IGoogleAuthService,
    private addUserUseCase: AddUserUseCase
  ) {}

  async execute(token: string): Promise<User> {
    try {
      const googleUser = await this.googleAuthService.verifyGoogleToken(token);
      console.log("goodgle user", googleUser);
      const response = await this.addUserUseCase.execute(googleUser);
      return response;
    } catch (error) {
      throw new Error("Google authentication failed");
    }
  }
}
