import { Schema, model } from "mongoose";
import { ICourse } from "../../../core/entities/ICourses";

const CourseSchema = new Schema<ICourse>(
  {
    _id: String,
    basicInfo: {
      title: { type: String },
      subtitle: { type: String },
      category: {
        type: Schema.Types.ObjectId,
        ref: "Category",
      },
      topic: { type: String },
      language: { type: String },
      duration: { type: String },
    },
    advanceInfo: {
      thumbnail: { type: String, default: null },
      description: { type: String },
    },
    curriculum: {
      sections: [
        {
          title: { type: String },
          lessons: [
            {
              title: { type: String },
              content: { type: String },
            },
          ],
        },
      ],
    },
  },
  {
    timestamps: true,
  }
);

export const Course = model<ICourse>("Course", CourseSchema);
