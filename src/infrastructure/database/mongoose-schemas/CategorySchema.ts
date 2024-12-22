import mongoose, { Schema } from "mongoose";
import { ICategory } from "../../../core/entities/ICategory";

const CategorySchema: Schema = new Schema<ICategory>(
  {
    name: { type: String, required: true, unique: true, trim: true },
    image: { type: String, trim: true },
    isActive: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export const CategoryModel = mongoose.model<ICategory>(
  "Category",
  CategorySchema
);
