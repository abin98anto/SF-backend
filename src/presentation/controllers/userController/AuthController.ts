import { Request, Response } from "express";
import bcrypt from "bcrypt";

import { UserRepository } from "../../../infrastructure/repositories/UserRepository";
import {
  miscMessages,
  otpMessages,
  userMessages,
} from "../../../shared/constants/constants";
import { errorObjectCatch } from "../../../shared/utils/errorObjectCatch";
import { JWTService } from "../../../infrastructure/external-services/JWTService";

export class AuthController {
  constructor(private userRepository: UserRepository) {}

  Login = async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, password } = req.body;

      const user = await this.userRepository.findByEmail(email);
      if (!user) {
        res.status(404).json({ message: otpMessages.USER_NOT_FOUND });
        return;
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        res.status(401).json({ message: userMessages.INVALID_CRED });
        return;
      }

      const accessToken = JWTService.generateAccessToken({
        email: user.email,
        role: user.role,
      });

      const refreshToken = JWTService.generateRefreshToken({
        email: user.email,
        role: user.role,
      });

      res
        .cookie("accessToken", accessToken, {
          httpOnly: true,
          secure: true,
          maxAge: 15 * 60 * 1000,
        })
        .cookie("refreshToken", refreshToken, {
          httpOnly: true,
          secure: true,
          maxAge: 7 * 24 * 60 * 60 * 1000,
        })
        .status(200)
        .json({ message: "Login successful" });
    } catch (error) {
      errorObjectCatch(error);
      res.status(500).json({ message: miscMessages.INTERNAL_SERVER_ERROR });
    }
  };
}
