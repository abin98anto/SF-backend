import { User } from "../entities/User";

export interface UserRepositoryInterface {
  add(user: User): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
  update(user: User): Promise<User | null>;
  delete(id: string): Promise<void>;

  saveOTP(email: string, otp: string, expiration: Date): Promise<void>;
  toggleUserStatus(email: string): Promise<void>;
}