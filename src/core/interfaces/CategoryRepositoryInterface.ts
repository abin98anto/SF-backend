import { ICategory } from "../entities/ICategory";

export interface CategoryRepositoryInterface {
  add(category: ICategory): Promise<ICategory>;
  update(category: ICategory): Promise<ICategory | null>;
}
