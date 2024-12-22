import { CategoryRepositoryInterface } from "../../core/interfaces/CategoryRepositoryInterface";
import { CategoryModel } from "../database/mongoose-schemas/CategorySchema";
import { ICategory } from "../../core/entities/ICategory";

export class CategoryRepository implements CategoryRepositoryInterface {
  async add(category: ICategory): Promise<ICategory> {
    const newCategory = new CategoryModel(category);
    await newCategory.save();
    return newCategory;
  }

  async update(category: ICategory): Promise<ICategory | null> {
    return await CategoryModel.findByIdAndUpdate(
      category._id,
      { $set: category },
      { new: true }
    );
  }

  async getCategories(): Promise<ICategory[]> {
    return await CategoryModel.find();
  }
}
