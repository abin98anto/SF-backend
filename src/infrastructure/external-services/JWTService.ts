import jwt from "jsonwebtoken";

import { errorObjectCatch } from "../../shared/utils/errorObjectCatch";

const ACCESS_TOKEN_SECRET = process.env.JWT_ACCESS!;
const REFRESH_TOKEN_SECRET = process.env.JWT_REFRESH!;
const ACCESS_TOKEN_EXPIRY = process.env.ACCESS_EXP;
const REFRESH_TOKEN_EXPIRY = process.env.REFRESH_EXP;

export class JWTService {
  generateAccessToken(payload: object): string {
    try {
      return jwt.sign(payload, ACCESS_TOKEN_SECRET, {
        expiresIn: ACCESS_TOKEN_EXPIRY,
      });
    } catch (error) {
      errorObjectCatch(error);
      return "";
    }
  }

  generateRefreshToken(payload: object): string {
    try {
      return jwt.sign(payload, REFRESH_TOKEN_SECRET, {
        expiresIn: REFRESH_TOKEN_EXPIRY,
      });
    } catch (error) {
      errorObjectCatch(error);
      return "";
    }
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
