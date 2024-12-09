import { Request, Response, NextFunction } from "express";
import { JWTService } from "../../infrastructure/external-services/JWTService";
import { userMessages } from "../../shared/constants/constants";

const jwtService = new JWTService();

export const verifyAccessToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token = req.cookies.userAccess;
    if (!token) {
      res.status(401).json({ message: userMessages.NO_COOKIES });
      return;
    }

    const decoded = jwtService.verifyAccessToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: userMessages.INVALID_TOKEN });
    return;
  }
};

export const verifyRefreshToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token = req.cookies.userRefresh;
    if (!token) {
      res.status(401).json({ message: userMessages.TOKEN_NOT_FOUND });
      return;
    }

    const decoded = jwtService.verifyRefreshToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: userMessages.INVALID_TOKEN });
    return;
  }
};
