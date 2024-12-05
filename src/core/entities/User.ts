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

// export interface User {
//   name: string;
//   email: string;
//   password: string;
//   role: UserRole;
//   profilePicture?: string | null | undefined;
//   subscription: SubscriptionType;
//   dateJoined?: Date;
//   isActive: boolean = false;
//   otp?:string;
//   otpExpiration?: Date;
// }

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
    public otpExpiration?: Date | null | undefined
  ) {}
}
