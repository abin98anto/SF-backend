import { ICourse } from "../../entities/ICourses";
import { CourseRepositoryInterface } from "../../interfaces/CourseRepositoryInterface";

export class GetCourseById {
  constructor(private courseRepository: CourseRepositoryInterface) {}

  async execute(_id: string): Promise<ICourse | null> {
    if (!_id) {
      throw new Error("Course ID is required.");
    }

    return await this.courseRepository.getCourseById(_id);
  }
}
