import { Request, Response } from "express";
import { AddCategoryUseCase } from "../../../core/use-cases/category/AddCategoryUseCase";
import { miscMessages } from "../../../shared/constants/constants";
import { ICategory } from "../../../core/entities/ICategory";
import { UpdateCategoryUseCase } from "../../../core/use-cases/category/UpdateCategoryUseCase";

export class CategoryManagementController {
  constructor(
    private addCategoryUseCase: AddCategoryUseCase,
    private updateCategoryUseCase: UpdateCategoryUseCase
  ) {}

  AddCategory = async (req: Request, res: Response): Promise<void> => {
    try {
      const { name, image } = req.body;
      const category: ICategory = { name, image };

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
      const { _id, name, image, isActive } = req.body;
      const categoryUpdate: ICategory = { _id, name, image, isActive };

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
