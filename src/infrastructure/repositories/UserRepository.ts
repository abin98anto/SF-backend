import { UserRepositoryInterface } from "../../core/interfaces/UserRepositoryInterface";
import { User } from "../../core/entities/User";
import { UserModel } from "../database/mongoose-schemas/UserSchema";

export class UserRepository implements UserRepositoryInterface {
  async add(user: User): Promise<User> {
    const newUser = new UserModel(user);
    return await newUser.save();
  }

  async findByEmail(email: string): Promise<User | null> {
    return await UserModel.findOne({ email });
  }

  async findById(id: string): Promise<User | null> {
    return await UserModel.findById(id);
  }

  async update(user: User): Promise<User | null> {
    return await UserModel.findOneAndUpdate({ email: user.email }, user, {
      new: true,
    });
  }

  async delete(id: string): Promise<void> {
    await UserModel.findByIdAndDelete(id);
  }

  async saveOTP(email: string, otp: string, expiration: Date): Promise<void> {
    await UserModel.updateOne({ email }, { otp, otpExpiration: expiration });
  }

  async verifyOTP(email: string, otp: string): Promise<boolean> {
    const user: User | null = await UserModel.findOne({ email });
    if (!user || user.otp !== otp || user.otpExpiration! < new Date()) {
      return false;
    }
    return true;
  }
}
