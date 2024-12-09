import { Request, Response } from "express";
import { miscMessages } from "../../../shared/constants/constants";
import { errorObjectCatch } from "../../../shared/utils/errorObjectCatch";
import { LoginUseCase } from "../../../core/use-cases/user/user-login/LoginUseCase";

export class AuthController {
  constructor(private loginUseCase: LoginUseCase) {}

  Login = async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, password } = req.body;
      console.log(email, password);

      const { accessToken, refreshToken } = await this.loginUseCase.execute(
        email,
        password
      );

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
