import { CourseRepositoryInterface } from "../../interfaces/CourseRepositoryInterface";

export class DeleteCourse {
  constructor(private courseRepository: CourseRepositoryInterface) {}

  async execute(_id: string): Promise<boolean> {
    if (!_id) {
      throw new Error("Course ID is required.");
    }
    return await this.courseRepository.deleteCourse(_id);
  }
}
