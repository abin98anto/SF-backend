import { User, UserRole } from "../../entities/User";

export interface UserRepositoryInterface {
  add(user: User): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
  // update(userData: Partial<User> & { _id: string }): Promise<User | null>;
  update(user: User): Promise<User | null>;
  delete(id: string): Promise<void>;
  users(role: UserRole): Promise<User[]>;

  // saveOTP(email: string, otp: string, expiration: Date): Promise<void>;
  verifyOTP(email: string, otp: string): Promise<boolean>;
}
