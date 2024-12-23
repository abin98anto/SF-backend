import { ICourse } from "../../core/entities/ICourses";
import { CourseRepositoryInterface } from "../../core/interfaces/CourseRepositoryInterface";
import { Course } from "../database/mongoose-schemas/CourseSchema";

export class CourseRepository implements CourseRepositoryInterface {
  async createCourse(course: Partial<ICourse>): Promise<ICourse> {
    const newCourse = new Course(course);
    return await newCourse.save();
  }

  async getCourseById(_id: string): Promise<ICourse | null> {
    return await Course.findById(_id).exec();
  }

  async updateCourse(updates: Partial<ICourse>): Promise<ICourse | null> {
    return await Course.findByIdAndUpdate(updates, {
      new: true,
    }).exec();
  }

  async deleteCourse(_id: string): Promise<boolean> {
    const result = await Course.findByIdAndDelete(_id).exec();
    return result !== null;
  }

  async listCourses(): Promise<ICourse[]> {
    return await Course.find();
  }
}
