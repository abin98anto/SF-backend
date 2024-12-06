import { User } from "../../../entities/User";
import { UserRepositoryInterface } from "../../../interfaces/UserRepositoryInterface";
import { userMessages } from "../../../../shared/constants/constants";
import { hashPassword } from "../../../../shared/utils/hashing";

export class AddUserUseCase {
  constructor(private userRepository: UserRepositoryInterface) {}

  async execute(userData: Omit<User, "_id" | "dateJoined">): Promise<User> {
    const existingUser = await this.userRepository.findByEmail(userData.email);

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
  }
}
