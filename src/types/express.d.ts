import { JwtPayload } from "../core/entities/JwtPayload";
import { User } from "../core/entities/User";

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload | User | string | null;
    }
  }
}
