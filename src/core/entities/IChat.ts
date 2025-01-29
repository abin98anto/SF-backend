import { IMessage } from "./IMessages";

export interface IChat {
  _id?: string;
  tutorId: string;
  studentId: string;
  courseId: string;
  messages: IMessage[];
}
