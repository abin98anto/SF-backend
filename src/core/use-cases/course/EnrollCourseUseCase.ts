import { miscMessages } from "../../../shared/constants/constants";
import { IChat } from "../../entities/IChat";
import { UserRepositoryInterface } from "../../interfaces/UserRepositoryInterface";
import { GetCourseById } from "./GetCourseUseCase";
import ChatRepository from "../../../infrastructure/repositories/chat/ChatRepository";

// interface CourseEnrollment {
//   _id: string;
//   courseId: string;
//   tutorId: string;
//   lastCompletedChapter: any[];
//   progressPercentage: number;
//   startDate: Date;
//   endDate: Date | null;
// }

export class EnrollCourseUseCase {
  constructor(
    private userRepository: UserRepositoryInterface,
    private getCourseUseCase: GetCourseById,
    private chatRepository: ChatRepository
  ) {}

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

    const course = await this.getCourseUseCase.execute(courseId);
    // console.log("couese ", course);
    if (course?.tutors) {
      const newRoom: IChat = {
        _id: `{${_id}-${course?.tutors[2]}-${course?._id}}`,  
        studentId: _id,
        tutorId: course?.tutors[2] as string,
        courseId: course?._id as string,
        messages: [],
      };
      // console.log("new room ", newRoom);
      await this.chatRepository.createChat(newRoom);
      console.log("chat room created.");
    }

    await this.userRepository.addCourseToUser(_id, courseData);
  }
}
