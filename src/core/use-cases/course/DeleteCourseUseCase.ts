import { CourseRepositoryInterface } from "../../interfaces/CourseRepositoryInterface";

export class DeleteCourse {
  constructor(private courseRepository: CourseRepositoryInterface) {}

  async execute(_id: string): Promise<boolean> {
    return await this.courseRepository.deleteCourse(_id);
  }
}
