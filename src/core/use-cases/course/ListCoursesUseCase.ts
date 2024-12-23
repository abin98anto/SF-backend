import { ICourse } from "../../entities/ICourses";
import { CourseRepositoryInterface } from "../../interfaces/CourseRepositoryInterface";

export class ListCourses {
  constructor(private courseRepository: CourseRepositoryInterface) {}

  async execute(): Promise<ICourse[]> {
    return await this.courseRepository.listCourses();
  }
}
