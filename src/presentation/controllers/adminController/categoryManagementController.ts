import { Request, Response } from "express";
import { AddCategoryUseCase } from "../../../core/use-cases/category/AddCategoryUseCase";
import { miscMessages } from "../../../shared/constants/constants";
import { ICategory } from "../../../core/entities/ICategory";
import { UpdateCategoryUseCase } from "../../../core/use-cases/category/UpdateCategoryUseCase";
import { GetCategoriesUseCase } from "../../../core/use-cases/category/GetCategoriesUseCase";

export class CategoryManagementController {
  constructor(
    private addCategoryUseCase: AddCategoryUseCase,
    private updateCategoryUseCase: UpdateCategoryUseCase,
    private getCategoriesUseCase: GetCategoriesUseCase
  ) {}

  GetCategories = async (req: Request, res: Response): Promise<void> => {
    try {
      console.log("sleep");
      const categories = await this.getCategoriesUseCase.execute();
      console.log("wakeup", categories);
      res.status(200).json({ success: true, data: categories });
    } catch (error) {
      console.log("error getting categories", error);
      res
        .status(500)
        .json({ success: false, message: miscMessages.INTERNAL_SERVER_ERROR });
    }
  };

  AddCategory = async (req: Request, res: Response): Promise<void> => {
    try {
      const { name } = req.body;
      const category: ICategory = { name };

      await this.addCategoryUseCase.execute(category);

      res.status(201).json({ success: true, message: "Category created" });
    } catch (error) {
      console.log("error adding new category", error);
      res
        .status(500)
        .json({ success: false, message: miscMessages.INTERNAL_SERVER_ERROR });
    }
  };

  updateCategory = async (req: Request, res: Response): Promise<void> => {
    try {
      const { _id, name, isActive } = req.body;
      const categoryUpdate: ICategory = { _id, name, isActive };

      await this.updateCategoryUseCase.execute(categoryUpdate);

      res.status(200).json({ success: true, message: "Category Updated." });
    } catch (error) {
      console.log("error updating category", error);
      res.status(500).json({
        success: false,
        message: miscMessages.INTERNAL_SERVER_ERROR,
      });
    }
  };
}
