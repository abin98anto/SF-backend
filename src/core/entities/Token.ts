import { User } from "./User";

export type Token = {
  accessToken: string;
  refreshToken: string;
  user?: User;
};
