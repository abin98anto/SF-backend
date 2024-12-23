import { ICourse } from "../entities/ICourses";

export interface CourseRepositoryInterface {
  createCourse(course: Partial<ICourse>): Promise<ICourse>;
  getCourseById(_id: string): Promise<ICourse | null>;
  updateCourse(updates: Partial<ICourse>): Promise<ICourse | null>;
  deleteCourse(courseId: string): Promise<boolean>;
  listCourses(): Promise<ICourse[]>;
}
