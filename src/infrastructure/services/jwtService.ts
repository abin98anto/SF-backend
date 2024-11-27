import jwt from "jsonwebtoken";
import { User } from "../../domain/entities/User";

export class JwtService {
  private accessTokenSecret = process.env.JWT_ACCESS_SECRET || "secret-key";
  private refreshTokenSecret = process.env.JWT_REFRESH_SECRET || "secret-key";
  private accessTokenExpiration = process.env.JWT_ACCESS_EXPIRY || "15m";
  private refreshTokenExpiration = process.env.JWT_ACCESS_EXPIRY || "7d";

  generateAccessToken(user: User): string {
    return jwt.sign({ userId: user.id }, this.accessTokenSecret, {
      expiresIn: this.accessTokenExpiration,
    });
  }

  generateRefreshToken(user: User): string {
    return jwt.sign({ userId: user.id }, this.refreshTokenSecret, {
      expiresIn: this.refreshTokenExpiration,
    });
  }

  verifyAccessToken(token: string): any {
    return jwt.verify(token, this.accessTokenSecret);
  }

  verifyRefreshToken(token: string): any {
    return jwt.verify(token, this.refreshTokenSecret);
  }
}
