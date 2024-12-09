import { User } from "../../../entities/User";
import { UserRepositoryInterface } from "../../../interfaces/user/UserRepositoryInterface";
import { userMessages } from "../../../../shared/constants/constants";
import { hashPassword } from "../../../../shared/utils/hashing";
import { errorObjectCatch } from "../../../../shared/utils/errorObjectCatch";

export class AddUserUseCase {
  constructor(private userRepository: UserRepositoryInterface) {}

  async execute(userData: Omit<User, "_id" | "dateJoined">): Promise<User> {
    try {
      const existingUser = await this.userRepository.findByEmail(
        userData.email
      );

      if (existingUser) {
        throw new Error(userMessages.EMAIL_EXISTS);
      }

      const hashedPassword = (await hashPassword(userData.password)).toString();

      const newUser: User = {
        ...userData,
        password: hashedPassword,
        dateJoined: new Date(),
      };

      return await this.userRepository.add(newUser);
    } catch (error) {
      errorObjectCatch(error);
      return userData;
    }
  }
}
