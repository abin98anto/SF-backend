import { Request, Response } from "express";
import {
  miscMessages,
  userMessages,
} from "../../../shared/constants/constants";
import { errorObjectCatch } from "../../../shared/utils/errorObjectCatch";
import { LoginUseCase } from "../../../core/use-cases/user/user-login/LoginUseCase";
import { JWTService } from "../../../infrastructure/external-services/JWTService";
import { JwtPayload } from "../../../core/entities/JwtPayload";
import { UserRole } from "../../../core/entities/User";

export class AdminAuthController {
  constructor(
    private loginUseCase: LoginUseCase,
    private jwtService: JWTService
  ) {
    this.Login = this.Login.bind(this);
    this.refreshAccessToken = this.refreshAccessToken.bind(this);
  }

  Login = async (req: Request, res: Response): Promise<void> => {
    try {
    //   console.log("first");
      const { email, password } = req.body;

      const { accessToken, refreshToken, user } =
        await this.loginUseCase.execute(email, password);

    //   console.log("admin going in ", user);
      if (user?.role !== UserRole.ADMIN) {
        res.status(403).json({ message: miscMessages.ACCESS_DENIED });
        return;
      }

      res
        .cookie("adminAccess", accessToken, {
          httpOnly: true,
          secure: true,
          sameSite: "strict",
          maxAge: 15 * 60 * 1000,
        })
        .cookie("adminRefresh", refreshToken, {
          httpOnly: true,
          secure: true,
          sameSite: "strict",
          maxAge: 7 * 24 * 60 * 60 * 1000,
        })
        .status(200)
        .json({
          message: userMessages.LOGIN_SUCCESS,
          user: user,
        });
    } catch (error) {
      const errMsg =
        error instanceof Error
          ? error.message
          : miscMessages.INTERNAL_SERVER_ERROR;

      if (errMsg === userMessages.INVALID_CRED) {
        res.status(401).json({ message: userMessages.INVALID_CRED });
      } else {
        errorObjectCatch(error);
        res.status(500).json({ message: miscMessages.INTERNAL_SERVER_ERROR });
      }
    }
  };

  refreshAccessToken = (req: Request, res: Response): void => {
    try {
      const refreshToken = req.cookies.adminRefresh;
      if (!refreshToken) {
        res.status(401).json({ message: userMessages.TOKEN_NOT_FOUND });
        return;
      }

      const decoded: JwtPayload =
        this.jwtService.verifyRefreshToken(refreshToken)!;

      const newAccessToken = this.jwtService.generateAccessToken({
        _id: decoded._id,
        role: decoded.role,
      });

      res
        .cookie("adminAccess", newAccessToken, {
          httpOnly: true,
          secure: true,
          maxAge: 15 * 60 * 1000,
        })
        .status(200)
        .json({ message: userMessages.ACCESS_REFRESHED });
      return;
    } catch (error) {
      errorObjectCatch(error);
      res.status(403).json({ message: userMessages.INVALID_TOKEN });
      return;
    }
  };

  logout = async (req: Request, res: Response): Promise<void> => {
    try {
      res
        .clearCookie("adminAccess", {
          httpOnly: true,
          secure: true,
          sameSite: "strict",
        })
        .clearCookie("adminRefresh", {
          httpOnly: true,
          secure: true,
          sameSite: "strict",
        })
        .status(200)
        .json({ message: userMessages.LOGOUT_SUCCESS });
    } catch (error) {
      res.status(500).json({ message: miscMessages.INTERNAL_SERVER_ERROR });
    }
  };
}
