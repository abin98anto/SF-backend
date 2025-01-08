import { UserRepositoryInterface } from "../../core/interfaces/UserRepositoryInterface";
import { User, UserRole } from "../../core/entities/User";
import { UserModel } from "../database/mongoose-schemas/UserSchema";

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
}
