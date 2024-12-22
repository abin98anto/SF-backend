import { ICategory } from "../../entities/ICategory";
import { CategoryRepositoryInterface } from "../../interfaces/CategoryRepositoryInterface";

export class AddCategoryUseCase {
  constructor(private categoryRepository: CategoryRepositoryInterface) {}

  async execute(category: ICategory): Promise<ICategory> {
    return await this.categoryRepository.add(category);
  }
}
