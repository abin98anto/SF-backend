import { UserRepositoryInterface } from "../../../interfaces/UserRepositoryInterface";

export class GetCompletedLessonsUseCase {
  constructor(private userRepository: UserRepositoryInterface) {}

  async execute(userId: string, courseId: string): Promise<string[]> {
    const data = await this.userRepository.completedChapters(userId, courseId);
    // console.log("the data", data);
    return data;
  }
}
