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
    public _id?: string | null,
    public name?: string,
    public email?: string,
    public password?: string,
    public role?: UserRole,
    public profilePicture?: string | null | undefined,
    public subscription?: SubscriptionType,
    public tutor?: string,
    public resume?: string | null | undefined,
    public tutorRatings?: [],
    public students?: [],
    public reviewsTaken?: number,
    public sessionsTaken?: number,
    public wallet?: number,
    public transactions?: [],
    public isVerified?: boolean,
    public otp?: string | null | undefined,
    public otpExpiration?: Date | null | undefined,
    public dateJoined?: Date,
    public isActive?: boolean // public body?: object | null | undefined,
  ) {}
}
