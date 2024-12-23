import { CourseRepositoryInterface } from "../../interfaces/CourseRepositoryInterface";
import { ICourse } from "../../entities/ICourses";

export class CreateCourse {
  constructor(private courseRepository: CourseRepositoryInterface) {}

  async execute(courseData: Partial<ICourse>): Promise<ICourse> {
    return await this.courseRepository.createCourse(courseData);
  }
}
