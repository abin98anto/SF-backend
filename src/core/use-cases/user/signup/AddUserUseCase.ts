import { User } from "../../../entities/User";
import { UserRepositoryInterface } from "../../../interfaces/UserRepositoryInterface";
import { userMessages } from "../../../../shared/constants/constants";
import { hashPassword } from "../../../../shared/utils/hashing";
import { errorObjectCatch } from "../../../../shared/utils/errorObjectCatch";

export class AddUserUseCase {
  constructor(private userRepository: UserRepositoryInterface) {}

  async execute(userData: User): Promise<User> {
    try {
      const existingUser = await this.userRepository.findByEmail(
        userData.email as string
      );

      if (existingUser) {
        throw new Error(userMessages.EMAIL_EXISTS);
      }

      const hashedPassword = (
        await hashPassword(userData.password as string)
      ).toString();

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
