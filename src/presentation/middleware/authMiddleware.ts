import { Request, Response, NextFunction } from "express";
import { JWTService } from "../../infrastructure/external-services/JWTService";
import { userMessages } from "../../shared/constants/constants";
import { User } from "../../core/entities/User";

const jwtService = new JWTService();

export const verifyAccessToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // console.log(req.cookies);
    const token = req.cookies.userAccess;
    if (!token) {
      res.status(401).json({ message: userMessages.NO_COOKIES });
      return;
    }

    const decoded: User | null = jwtService.verifyAccessToken(token);
    req.user = decoded;

    if (decoded?.isActive === false) {
      throw new Error("The user is blocked by the admin");
    }
    next();
  } catch (error) {
    res.status(401).json({ message: userMessages.INVALID_TOKEN });
    return;
  }
};

export const verifyTutorToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // console.log(req.cookies);
    const token = req.cookies.tutorAccess;
    if (!token) {
      res.status(401).json({ message: userMessages.NO_COOKIES });
      return;
    }

    const decoded: User | null = jwtService.verifyAccessToken(token);
    req.user = decoded;

    if (decoded?.isActive === false) {
      throw new Error("The tutor is blocked by the admin");
    }
    next();
  } catch (error) {
    res.status(401).json({ message: userMessages.INVALID_TOKEN });
    return;
  }
};

export const verifyAdminToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // console.log(req.cookies);
    const token = req.cookies.tutorAccess;
    if (!token) {
      res.status(401).json({ message: userMessages.NO_COOKIES });
      return;
    }

    const decoded: User | null = jwtService.verifyAccessToken(token);
    req.user = decoded;

    if (decoded?.isActive === false) {
      throw new Error("The tutor is blocked by the admin");
    }
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
