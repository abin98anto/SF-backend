export enum UserRole {
  ADMIN = "admin",
  USER = "user",
  TUTOR = "tutor",
}

export enum SubscriptionType {
  FREE = "free",
  MONTHLY = "monthly",
  ANNUAL = "annual",
}

export interface User {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  profilePicture?: string | null | undefined;
  subscription: SubscriptionType;
  dateJoined?: Date;
  isActive: boolean;
  otp?:string;
  otpExpiration?: Date;
}
