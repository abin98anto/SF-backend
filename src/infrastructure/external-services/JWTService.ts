import jwt from "jsonwebtoken";

import { miscMessages } from "../../shared/constants/constants";

const ACCESS_TOKEN_SECRET = process.env.JWT_ACCESS!;
const REFRESH_TOKEN_SECRET = process.env.JWT_REFRESH!;
const ACCESS_TOKEN_EXPIRY = process.env.ACCESS_EXP;
const REFRESH_TOKEN_EXPIRY = process.env.REFRESH_EXP;

export class JWTService {
  static generateAccessToken(payload: object): string {
    try {
      return jwt.sign(payload, ACCESS_TOKEN_SECRET, {
        expiresIn: ACCESS_TOKEN_EXPIRY,
      });
    } catch (error) {
      if (error instanceof Error) {
        console.error(miscMessages.ERROR, error.message);
        return "";
      } else {
        console.error(miscMessages.UNKNOWN_ERROR);
        return "";
      }
    }
  }

  static generateRefreshToken(payload: object): string {
    return jwt.sign(payload, REFRESH_TOKEN_SECRET, {
      expiresIn: REFRESH_TOKEN_EXPIRY,
    });
  }

  //   static verifyAccessToken(token: string): object | null {
  //     try {
  //       return jwt.verify(token, ACCESS_TOKEN_SECRET);
  //     } catch (error) {
  //       return null;
  //     }
  //   }

  //   static verifyRefreshToken(token: string): object | null {
  //     try {
  //       return jwt.verify(token, REFRESH_TOKEN_SECRET);
  //     } catch (error) {
  //       return null;
  //     }
  //   }
}
