import { errorObjectCatch } from "../../../shared/utils/errorObjectCatch";
import { UserRepositoryInterface } from "../../interfaces/UserRepositoryInterface";

export class ToogleUserStatus {
  constructor(private userRepository: UserRepositoryInterface) {}

  async execute(_id: string): Promise<boolean> {
    try {
      const user = await this.userRepository.findById(_id);

      if (!user) {
        return false;
      }

      user.isActive = !user.isActive;
      const updatedUser = await this.userRepository.update(user);

      return updatedUser !== null;
    } catch (error) {
      errorObjectCatch(error);
      return false;
    }
  }
}
