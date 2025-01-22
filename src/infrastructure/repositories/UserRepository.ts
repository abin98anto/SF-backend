import { UserRepositoryInterface } from "../../core/interfaces/UserRepositoryInterface";
import { User, UserRole } from "../../core/entities/User";
import { UserModel } from "../database/mongoose-schemas/UserSchema";
import { miscMessages } from "../../shared/constants/constants";
import mongoose, { UpdateResult } from "mongoose";

export class UserRepository implements UserRepositoryInterface {
  async add(user: User): Promise<User> {
    const { _id, ...userData } = user;
    const newUser = new UserModel(userData);
    await newUser.save();
    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    return await UserModel.findOne({ email });
  }

  async findById(id: string): Promise<User | null> {
    return await UserModel.findById(id);
  }

  async update(user: User): Promise<User | null> {
    return await UserModel.findByIdAndUpdate(
      user._id,
      { $set: user },
      { new: true }
    );
  }

  async delete(id: string): Promise<void> {
    await UserModel.findByIdAndDelete(id);
  }

  async users(role: UserRole): Promise<User[]> {
    return await UserModel.find({ role: role });
  }

  async isCourseEnrolled(userId: string, courseId: string): Promise<boolean> {
    const user = await UserModel.findById(userId);
    if (!user) throw new Error("User not found");
    return user.coursesEnrolled.some(
      (course: any) => course.courseId === courseId
    );
  }

  async addCourseToUser(userId: string, course: any): Promise<void> {
    await UserModel.findByIdAndUpdate(
      userId,
      { $push: { coursesEnrolled: course } },
      { new: true }
    );
  }

  async progress(
    userId: string,
    courseId: string,
    lesson: string
  ): Promise<void> {
    try {
      const user = await UserModel.findOne({
        _id: userId,
        "coursesEnrolled.courseId": courseId,
      });

      if (!user) {
        console.log("User or course not found");
        return;
      }

      // Find the specific course enrollment object
      const course = user.coursesEnrolled.find(
        (course) => course.courseId === courseId
      );

      if (!course) {
        console.log("Course not found in user's enrolled courses");
        return;
      }

      // Add the lesson to the completedChapters array if it's not already there
      if (!course.completedChapters.includes(lesson)) {
        course.completedChapters.push(lesson);
        course.progressPercentage = this.calculateProgress(
          course.completedChapters.length,
          course
        );

        // Save the user with the updated course
        await user.save();
        console.log("Lesson progress updated successfully.");
      } else {
        console.log("Lesson already completed.");
      }
    } catch (error) {
      console.log(miscMessages.LESSON_UPDATE_FAIL, error);
    }
  }

  private calculateProgress(
    completedChaptersCount: number,
    course: any
  ): number {
    const totalChapters = course.completedChapters.length;
    return (completedChaptersCount / totalChapters) * 100;
  }

  async completedChapters(userId: string, courseId: string): Promise<string[]> {
    const user: User | null = await this.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    const course = user!.coursesEnrolled!.find(
      (course) => course.courseId === courseId
    );
    if (!course) {
      throw new Error("Course not found");
    }
    return course.completedChapters;
  }

  async findExpiredSubscriptions(currentDate: Date): Promise<any> {
    return await UserModel.find({
      role: "user",
      subscription: { $exists: true },
      "subscription.endDate": { $lte: currentDate },
      "subscription.cancelledDate": { $exists: false },
    }).lean();
  }

  async markSubscriptionAsCancelled(
    userId: mongoose.Types.ObjectId,
    cancelledDate: Date
  ): Promise<UpdateResult> {
    return await UserModel.updateOne(
      { _id: userId },
      { $unset: { subscription: "" } }
    );
  }

  async getEnrolledCourses(userId: string): Promise<string[]> {
    const user = await UserModel.findById(userId).select("coursesEnrolled");
    if (!user) return [];
    return user.coursesEnrolled
      .map((course) => course.courseId)
      .filter(Boolean) as string[];
  }
}
