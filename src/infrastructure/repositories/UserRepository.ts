import { UserRepositoryInterface } from "../../core/interfaces/user/UserRepositoryInterface";
import { User } from "../../core/entities/User";
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

  async updatee(user: User): Promise<User | null> {
    return await UserModel.findOneAndUpdate({ _id: user._id }, user, {
      new: true,
    });
  }

  async update(
    userData: Partial<User> & { _id: string }
  ): Promise<User | null> {
    return await UserModel.findByIdAndUpdate(
      userData._id,
      { $set: userData },
      { new: true }
    );
  }

  async delete(id: string): Promise<void> {
    await UserModel.findByIdAndDelete(id);
  }

  async saveOTP(email: string, otp: string, expiration: Date): Promise<void> {
    await UserModel.updateOne(
      { email },
      { otp, otpExpiration: expiration },
      { upsert: true }
    );
  }

  async verifyOTP(email: string, otp: string): Promise<boolean> {
    const user: User | null = await UserModel.findOne({ email });
    if (!user || user.otp !== otp || user.otpExpiration! < new Date()) {
      return false;
    }
    return true;
  }
}
