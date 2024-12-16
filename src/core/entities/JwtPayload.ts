import { User, UserRole } from "./User";

export interface JwtPayload {
  _id?: string | null;
  role: UserRole;
}
