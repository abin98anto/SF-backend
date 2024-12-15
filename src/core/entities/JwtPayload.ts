import { User, UserRole } from "./User";

export interface JwtPayload {
  email: string;
  role: UserRole;
  user?: User;
}
