import { Schema, model } from "mongoose";
import { ICourse, Lesson, Section } from "../../../core/entities/ICourses";

const LecturesSchema = new Schema<Lesson>({
  name: String,
  videoUrl: String,
  pdfUrls: [String],
});

const SectionSchema = new Schema<Section>({
  name: String,
  lectures: [LecturesSchema],
});

const CourseSchema = new Schema<ICourse>(
  {
    basicInfo: {
      title: { type: String },
      subtitle: { type: String },
      category: { type: String },
      topic: { type: String },
      language: { type: String },
      duration: { type: String },
    },
    advanceInfo: {
      thumbnail: { type: String, default: null },
      description: { type: String },
    },
    curriculum: [SectionSchema],
    tutors: { type: Array, default: [] },
    isActive: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

export const Course = model<ICourse>("Course", CourseSchema);
