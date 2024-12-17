import { Request, Response, NextFunction } from "express";
import logger from "../../infrastructure/external-services/winston";

export const requestLogger = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.info({
    type: "request",
    method: req.method,
    path: req.path,
    body: req.body,
    query: req.query,
    ip: req.ip,
  });

  next();
};

export const responseLogger = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const start = Date.now();

  res.on("finish", () => {
    const duration = Date.now() - start;
    logger.info({
      type: "response",
      method: req.method,
      path: req.path,
      status: res.statusCode,
      duration: `${duration}ms`,
    });
  });

  next();
};
