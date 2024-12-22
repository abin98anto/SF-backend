import { Request, Response } from "express";
// import { UserRole } from "../../../core/entities/User";
import { errorObjectCatch } from "../../../shared/utils/errorObjectCatch";
import { VerifyTutorUseCase } from "../../../core/use-cases/admin/VerifyTutorUseCase";
import { DenyTutorUseCase } from "../../../core/use-cases/admin/DenyTutorUseCase";
import { miscMessages } from "../../../shared/constants/constants";
// import { GetList } from "../../../core/use-cases/admin/GetList";
// import { ToogleUserStatus } from "../../../core/use-cases/admin/ToogleUserStatus";

export class TutorManagementController {
  constructor(
    // private getList: GetList,
    // private toogleUserStatus: ToogleUserStatus
    private verifyTutorUseCase: VerifyTutorUseCase,
    private denyTutorUseCase: DenyTutorUseCase
  ) {}

  //   tutorList = async (req: Request, res: Response): Promise<void> => {
  //     try {
  //       // console.log("first");
  //       let result = await this.getList.execute(UserRole.TUTOR);
  //       // console.log("second", result);
  //       res.status(200).json(result);
  //     } catch (error) {
  //       errorObjectCatch(error);
  //     }
  //   };

  VerifyTutor = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.query;
      // console.log("verigying tutor", id);
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
