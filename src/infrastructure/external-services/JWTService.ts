import jwt from "jsonwebtoken";

import { errorObjectCatch } from "../../shared/utils/errorObjectCatch";
import { JwtPayload } from "../../core/entities/JwtPayload";

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

  verifyAccessToken(token: string): JwtPayload | null {
    try {
      return jwt.verify(token, ACCESS_TOKEN_SECRET) as JwtPayload;
    } catch (error) {
      errorObjectCatch(error);
      return null;
    }
  }

  verifyRefreshToken(token: string): JwtPayload | null {
    try {
      return jwt.verify(token, REFRESH_TOKEN_SECRET) as JwtPayload;
    } catch (error) {
      return null;
    }
  }
}
