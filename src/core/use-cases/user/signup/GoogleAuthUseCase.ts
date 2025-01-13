import { UserRepository } from "../../../../infrastructure/repositories/UserRepository";
import {
  miscMessages,
  otpMessages,
} from "../../../../shared/constants/constants";
import { JwtPayload } from "../../../entities/JwtPayload";
import { UseCaseResponse } from "../../../entities/UseCaseResponse";
import { User, UserRole } from "../../../entities/User";
import { AddUserUseCase } from "./AddUserUseCase";
import { JWTService } from "../../../../infrastructure/external-services/JWTService";

export class GoogleAuthUseCase {
  constructor(
    private addUserUseCase: AddUserUseCase,
    private userRepository: UserRepository,
    private jwtService: JWTService
  ) {}

  async execute(user: User): Promise<UseCaseResponse> {
    try {
      (await this.userRepository.findByEmail(user.email!)) ||
        (await this.addUserUseCase.execute(user));

      const data = await this.userRepository.findByEmail(user.email!);

      let arg: JwtPayload = {
        _id: data?._id,
        role: data?.role as UserRole,
      };

      const accessToken = this.jwtService.generateAccessToken(arg);
      const refreshToken = this.jwtService.generateRefreshToken(arg);

      return {
        success: true,
        message: otpMessages.USER_VERFIED,
        data: data,
        tokens: { accessToken: accessToken, refreshToken: refreshToken },
      };
    } catch (error) {
      console.log(miscMessages.GOOGLE_SIGNIN_FAIL, error);
      return { success: false, message: miscMessages.UNKNOWN_ERROR };
    }
  }
}
