import { UserRepositoryInterface } from "../../../interfaces/UserRepositoryInterface";

export class LessonUpdateUseCase {
  constructor(private userRepository: UserRepositoryInterface) {}

  async execute(userId: string, courseId: string, lesson: string) {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new Error("User not found");
    }

    const course = user.coursesEnrolled!.find(
      (enrollment) => enrollment.courseId === courseId
    );

    if (!course) {
      throw new Error("Course not found in user's enrollment");
    }

    // Type assertion for completedChapters
    if (!course.completedChapters.includes(lesson)) {
      // Add the lesson to the completed chapters
      course.completedChapters.push(lesson);
      course.progressPercentage = this.calculateProgress(
        course.completedChapters.length,
        course
      );

      // Step 4: Save the updated user record
      await this.userRepository.update(user);
    }
  }

  private calculateProgress(
    completedChaptersCount: number,
    course: any
  ): number {
    const totalChapters = course.completedChapters.length;
    return (completedChaptersCount / totalChapters) * 100;
  }
}
