import mongoose, { UpdateResult } from "mongoose";
import { User, UserRole } from "../entities/User";

export interface UserRepositoryInterface {
  add(user: User): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
  update(user: User): Promise<User | null>;
  delete(id: string): Promise<void>;
  users(role: UserRole): Promise<User[]>;
  isCourseEnrolled(userId: string, courseId: string): Promise<boolean>;
  addCourseToUser(userId: string, course: any): Promise<void>;
  progress(userId: string, courseId: string, lesson: string): Promise<void>;
  completedChapters(userId: string, courseId: string): Promise<string[]>;
  findExpiredSubscriptions(currentDate: Date): Promise<any>;
  markSubscriptionAsCancelled(
    userId: mongoose.Types.ObjectId,
    cancelledDate: Date
  ): Promise<UpdateResult>;
  getEnrolledCourses(userId: string): Promise<string[]>;
}
