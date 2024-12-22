export interface ICategory extends Document {
  _id?: string;
  name: string;
  image?: string;
  isActive: boolean;
  createdAt: Date;
}
