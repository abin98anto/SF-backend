import { EmailRepositoryInterface } from "../../interfaces/EmailRepositoryInterface";
import { UserRepositoryInterface } from "../../interfaces/user/UserRepositoryInterface";

export class DenyTutorUseCase {
  constructor(
    private emailRepository: EmailRepositoryInterface,
    private userRepository: UserRepositoryInterface
  ) {}

  async execute(id: string): Promise<boolean> {
    try {
      const tutor = await this.userRepository.findById(id);

      if (!tutor) {
        return false;
      }
      await this.emailRepository.sendDenialEmail(
        tutor.email as string,
        tutor.name as string
      );
      await this.userRepository.delete(id);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}
