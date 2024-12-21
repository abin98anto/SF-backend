import { errorObjectCatch } from "../../../shared/utils/errorObjectCatch";
import { User, UserRole } from "../../entities/User";
import { UserRepositoryInterface } from "../../interfaces/user/UserRepositoryInterface";

export class GetList {
  constructor(private userRepository: UserRepositoryInterface) {}

  async execute(role: UserRole): Promise<User[]> {
    try {
      const res = await this.userRepository.users(role);
    //   console.log("userlist use case", res);
      return res;
    } catch (error) {
      errorObjectCatch(error);
      return [];
    }
  }
}
