import { ICategory } from "../entities/ICategory";

export interface CategoryRepositoryInterface {
  getCategories(): Promise<ICategory[]>;
  add(category: ICategory): Promise<ICategory>;
  update(category: ICategory): Promise<ICategory | null>;
}
