import { miscMessages } from "../../../shared/constants/constants";
import { UserRepositoryInterface } from "../../interfaces/UserRepositoryInterface";

interface CourseEnrollment {
  _id: string;
  courseId: string;
  tutorId: string;
  lastCompletedChapter: any[];
  progressPercentage: number;
  startDate: Date;
  endDate: Date | null;
}

export class EnrollCourseUseCase {
  constructor(private userRepository: UserRepositoryInterface) {}

  async execute(updates: any): Promise<void> {
    const { _id, courseId } = updates;

    const alreadyEnrolled = await this.userRepository.isCourseEnrolled(
      _id,
      courseId
    );

    if (alreadyEnrolled) {
      throw new Error(miscMessages.USER_ENROLL_ERROR);
    }

    const courseData = {
      courseId: updates.courseId,
      tutorId: updates.tutorId,
      startDate: updates.startDate,
      endDate: updates.endDate || null,
      progressPercentage: 0,
      lastCompletedChapter: [],
    };

    await this.userRepository.addCourseToUser(_id, courseData);
  }
}
