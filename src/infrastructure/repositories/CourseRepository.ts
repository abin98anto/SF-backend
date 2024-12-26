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

  // async updateCourse(updates: Partial<ICourse>): Promise<ICourse | null> {
  //   return await Course.findByIdAndUpdate(updates._id, updates, {
  //     new: true,
  //   }).exec();
  // }

  // async updateCourse(updates: Partial<ICourse>): Promise<ICourse | null> {
  //   const { _id, ...updateFields } = updates;

  //   return await Course.findByIdAndUpdate(
  //     _id,
  //     { $set: updateFields },
  //     { new: true }
  //   ).exec();
  // }

  // async updateCourse(updates: Partial<ICourse>): Promise<ICourse | null> {
  //   const updateObj: any = {};

  //   // Handle top-level fields
  //   for (const [key, value] of Object.entries(updates)) {
  //     if (key !== "_id" && key !== "curriculum") {
  //       updateObj[key] = value;
  //     }
  //   }

  //   // Handle nested fields in basicInfo and advanceInfo
  //   if (updates.basicInfo) {
  //     for (const [key, value] of Object.entries(updates.basicInfo)) {
  //       updateObj[`basicInfo.${key}`] = value;
  //     }
  //   }
  //   if (updates.advanceInfo) {
  //     for (const [key, value] of Object.entries(updates.advanceInfo)) {
  //       updateObj[`advanceInfo.${key}`] = value;
  //     }
  //   }

  //   // Handle curriculum updates
  //   if (updates.curriculum) {
  //     updateObj["curriculum"] = updates.curriculum;
  //   }

  //   return await Course.findByIdAndUpdate(
  //     updates._id,
  //     { $set: updateObj },
  //     {
  //       new: true,
  //     }
  //   ).exec();
  // }

  async updateCourse(updates: Partial<ICourse>): Promise<ICourse | null> {
    if (!updates._id) {
      throw new Error("Course ID (_id) is required for updates.");
    }

    const updateObj: any = {};

    // Update only the fields present in `updates`
    for (const [key, value] of Object.entries(updates)) {
      if (value !== undefined && key !== "_id") {
        if (key === "basicInfo" || key === "advanceInfo") {
          // Handle nested objects
          for (const [nestedKey, nestedValue] of Object.entries(
            value as Record<string, unknown>
          )) {
            if (nestedValue !== undefined) {
              updateObj[`${key}.${nestedKey}`] = nestedValue;
            }
          }
        } else if (key === "curriculum") {
          // Handle curriculum array replacement
          updateObj[key] = value;
        } else {
          // Handle top-level fields
          updateObj[key] = value;
        }
      }
    }

    // Perform the update
    return await Course.findByIdAndUpdate(
      updates._id,
      { $set: updateObj },
      { new: true } // Return the updated document
    ).exec();
  }

  async deleteCourse(_id: string): Promise<boolean> {
    const result = await Course.findByIdAndDelete(_id).exec();
    return result !== null;
  }

  async listCourses(): Promise<ICourse[]> {
    return await Course.find();
  }
}
