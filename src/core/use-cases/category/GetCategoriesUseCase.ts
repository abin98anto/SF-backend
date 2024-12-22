import { ICategory } from "../../entities/ICategory";
import { CategoryRepositoryInterface } from "../../interfaces/CategoryRepositoryInterface";

export class GetCategoriesUseCase {
  constructor(private categoryRepository: CategoryRepositoryInterface) {}

  async execute(): Promise<ICategory[]> {
    return await this.categoryRepository.getCategories();
  }
}
