import { UserRepository } from "../../../../infrastructure/repositories/UserRepository";

export class GetEnrolledCoursesUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(userId: string): Promise<string[]> {
    return this.userRepository.getEnrolledCourses(userId);
  }
}
