import { User } from "../entities/User";

export interface GoogleAuthResponse {
  user: User;
  token: string;
}

export interface IGoogleAuthService {
  verifyGoogleToken(token: string): Promise<User>;
}
