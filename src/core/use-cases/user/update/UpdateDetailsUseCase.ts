import { userMessages } from "../../../../shared/constants/constants";
import { Subscription, User } from "../../../entities/User";
import { UserRepositoryInterface } from "../../../interfaces/UserRepositoryInterface";

export class UpdateDetailsUseCase {
  constructor(private userRepository: UserRepositoryInterface) {}

  async execute(user: User): Promise<User> {
    // console.log("to update ", user);
    const userInfo = await this.userRepository.findById(user._id!);

    if (!userInfo) {
      throw new Error(userMessages.INVALID_CRED);
    }

    if (user.subscription) {
      user.subscription = new Subscription(
        user.subscription.name,
        user.subscription.startDate,
        user.subscription.endDate
      );
    }

    const updatedUser = await this.userRepository.update(user);
    // console.log("Updated user:", updatedUser);

    if (!updatedUser) {
      throw new Error("User update failed.");
    }

    return updatedUser;
  }
}
