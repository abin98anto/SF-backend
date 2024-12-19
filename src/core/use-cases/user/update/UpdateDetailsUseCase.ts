import { userMessages } from "../../../../shared/constants/constants";
import { User } from "../../../entities/User";
import { UserRepositoryInterface } from "../../../interfaces/user/UserRepositoryInterface";

export class UpdateDetailsUseCase {
  constructor(private userRepository: UserRepositoryInterface) {}

  async execute(user: User): Promise<User> {
    const userInfo = await this.userRepository.findById(user._id!);

    if (!userInfo) {
      throw new Error(userMessages.INVALID_CRED);
    }

    const updatedUser = await this.userRepository.update(user);
    console.log("Updated user:", updatedUser);

    if (!updatedUser) {
      throw new Error("User update failed.");
    }

    return updatedUser;
  }
}
