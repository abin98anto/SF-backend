import bcrypt from "bcrypt";

import { UserRepositoryInterface } from "../../../interfaces/user/UserRepositoryInterface";
import { JWTService } from "../../../../infrastructure/external-services/JWTService";
import { userMessages } from "../../../../shared/constants/constants";
import { Token } from "../../../entities/Token";
import { JwtPayload } from "../../../entities/JwtPayload";

export class LoginUseCase {
  constructor(
    private userRepository: UserRepositoryInterface,
    private jwtService: JWTService
  ) {}

  async execute(email: string, password: string): Promise<Token> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new Error(userMessages.INVALID_CRED);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error(userMessages.INVALID_CRED);
    }

    let arg: JwtPayload = { email: user.email, role: user.role, user: user };

    const accessToken = this.jwtService.generateAccessToken(arg);
    const refreshToken = this.jwtService.generateRefreshToken(arg);

    return { accessToken, refreshToken, user };
  }
}
