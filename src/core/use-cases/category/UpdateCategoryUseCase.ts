import { ICategory } from "../../entities/ICategory";
import { CategoryRepositoryInterface } from "../../interfaces/CategoryRepositoryInterface";

export class UpdateCategoryUseCase {
  constructor(private categoryRepository: CategoryRepositoryInterface) {}

  async execute(category: ICategory): Promise<ICategory | null> {
    return await this.categoryRepository.update(category);
  }
}
