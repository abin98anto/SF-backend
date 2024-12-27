import { Request, Response } from "express";
import {
  miscMessages,
  userMessages,
} from "../../../shared/constants/constants";
import { errorObjectCatch } from "../../../shared/utils/errorObjectCatch";
import { LoginUseCase } from "../../../core/use-cases/user/login/LoginUseCase";
import { JWTService } from "../../../infrastructure/external-services/JWTService";
import { JwtPayload } from "../../../core/entities/JwtPayload";
// import { UserRole } from "../../../core/entities/User";

export class AuthController {
  constructor(
    private loginUseCase: LoginUseCase,
    private jwtService: JWTService
  ) {
    this.Login = this.Login.bind(this);
    this.refreshAccessToken = this.refreshAccessToken.bind(this);
  }

  Login = async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, password } = req.body;

      const { accessToken, refreshToken, user } =
        await this.loginUseCase.execute(email, password);

      // console.log("first", user);
      if (user?.isActive === false) {
        res.status(403).json({ message: miscMessages.ACCESS_DENIED });
        return;
      }

      // console.log(user?.role);

      const accessTokenName = "userAccess";

      res
        .cookie(accessTokenName, accessToken, {
          httpOnly: true,
          secure: true,
          sameSite: "strict",
          maxAge: 15 * 60 * 1000,
        })
        .cookie("userRefresh", refreshToken, {
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
      const refreshToken = req.cookies.userRefresh;
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
        .cookie("userAccess", newAccessToken, {
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
      const { role } = req.body;
      if (role === "user") {
        res
          .clearCookie("userAccess", {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
          })
          .clearCookie("userRefresh", {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
          })
          .status(200)
          .json({ message: userMessages.LOGOUT_SUCCESS });
      } else if (role === "tutor") {
        res
          .clearCookie("tutorAccess", {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
          })
          .clearCookie("tutorRefresh", {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
          })
          .status(200)
          .json({ message: userMessages.LOGOUT_SUCCESS });
      } else {
        res.status(400).json({ message: "Invalid role specified for logout." });
      }
    } catch (error) {
      res.status(500).json({ message: miscMessages.INTERNAL_SERVER_ERROR });
    }
  };
}
