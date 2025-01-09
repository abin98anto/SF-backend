import { ICourse } from "../../entities/ICourses";
import { CourseRepositoryInterface } from "../../interfaces/CourseRepositoryInterface";

export class UpdateCourse {
  constructor(private courseRepository: CourseRepositoryInterface) {}

  async execute(updates: Partial<ICourse>): Promise<ICourse | null> {
    return await this.courseRepository.updateCourse(updates);
  }
}
