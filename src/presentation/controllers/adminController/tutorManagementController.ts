import { Request, Response } from "express";
import { errorObjectCatch } from "../../../shared/utils/errorObjectCatch";
import { VerifyTutorUseCase } from "../../../core/use-cases/admin/VerifyTutorUseCase";
import { DenyTutorUseCase } from "../../../core/use-cases/admin/DenyTutorUseCase";
import { miscMessages } from "../../../shared/constants/constants";

export class TutorManagementController {
  constructor(
    private verifyTutorUseCase: VerifyTutorUseCase,
    private denyTutorUseCase: DenyTutorUseCase
  ) {}

  VerifyTutor = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.query;
      if (typeof id === "string") {
        const result = await this.verifyTutorUseCase.execute(id);
        if (result) {
          res.status(200).json({ success: true });
        } else {
          res.status(400).json({ success: false });
        }
      } else {
        res.status(400).json({ success: false, message: "Invalid ID" });
      }
    } catch (error) {
      errorObjectCatch(error);
      res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }
  };

  DenyTutor = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.query;
      console.log("int the controller", id);

      const result = await this.denyTutorUseCase.execute(id as string);

      if (result) {
        res.status(200).json({
          success: true,
          message:
            "Deny email has been sent to the tutor and deleted from database",
        });
      } else {
        res.status(400).json({ success: false, message: "Tutor not found" });
      }
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ success: false, message: miscMessages.INTERNAL_SERVER_ERROR });
    }
  };
}
