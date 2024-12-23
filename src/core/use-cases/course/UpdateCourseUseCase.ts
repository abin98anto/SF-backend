import { ICourse } from "../../entities/ICourses";
import { CourseRepositoryInterface } from "../../interfaces/CourseRepositoryInterface";

export class UpdateCourse {
  constructor(private courseRepository: CourseRepositoryInterface) {}

  async execute(updates: Partial<ICourse>): Promise<ICourse | null> {
    if (!updates || Object.keys(updates).length === 0) {
      throw new Error("No updates provided.");
    }
    return await this.courseRepository.updateCourse(updates);
  }
}
