import mongoose, { Schema, Document } from "mongoose";

export interface User extends Document {
  email: string;
  password: string;
  profileUrl: string;
  createdAt: Date;
}

const UserSchema: Schema = new Schema<User>({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  profileUrl: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const UserSchemaModel = mongoose.model<User>("User", UserSchema);
