import { ICourse } from "../entities/ICourses";

export interface ICourseRepository {
  createCourse(course: Partial<ICourse>): Promise<ICourse>;
  getCourseById(_id: string): Promise<ICourse | null>;
  updateCourse(updates: Partial<ICourse>): Promise<ICourse | null>;
  deleteCourse(courseId: string): Promise<boolean>;
  listCourses(): Promise<ICourse[]>;
  //   addSection(
  //     courseId: string,
  //     section: { title: string; lessons: any[] }
  //   ): Promise<ICourse | null>;
  //   addLesson(
  //     courseId: string,
  //     sectionId: string,
  //     lesson: { title: string; content: string }
  //   ): Promise<ICourse | null>;
}
