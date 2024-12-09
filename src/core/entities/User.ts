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

export class User {
  constructor(
    public name: string,
    public email: string,
    public password: string,
    public role: UserRole,
    public profilePicture: string | null | undefined,
    public subscription?: SubscriptionType,
    public dateJoined?: Date,
    public isActive: boolean = false,
    public otp?: string | null | undefined,
    public otpExpiration?: Date | null | undefined,
    public resumeUrl?: string | null | undefined
  ) {}
}
