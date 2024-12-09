import { UserRole } from "./User";

export interface JwtPayload {
  email: string;
  role: UserRole;
}
