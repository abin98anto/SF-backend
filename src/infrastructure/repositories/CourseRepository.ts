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
    if (!updates._id) {
      throw new Error("Course ID (_id) is required for updates.");
    }

    // Fetch the existing course
    const existingCourse = await Course.findById(updates._id).exec();
    if (!existingCourse) {
      throw new Error("Course not found.");
    }

    // Update the fields present in `updates`
    for (const [key, value] of Object.entries(updates)) {
      if (value !== undefined && key !== "_id") {
        if (key === "basicInfo" || key === "advanceInfo") {
          for (const [nestedKey, nestedValue] of Object.entries(
            value as Record<string, unknown>
          )) {
            if (nestedValue !== undefined) {
              (existingCourse[key] as any)[nestedKey] = nestedValue;
            }
          }
        } else if (key === "curriculum") {
          existingCourse.curriculum = value as ICourse["curriculum"];
        } else {
          (existingCourse as any)[key] = value;
        }
      }
    }

    // Save the updated document
    return await existingCourse.save();
  }

  async deleteCourse(_id: string): Promise<boolean> {
    const result = await Course.findByIdAndDelete(_id).exec();
    return result !== null;
  }

  async listCourses(): Promise<ICourse[]> {
    return await Course.find();
  }
}
