import { Request, Response } from "express";
import { UserRole } from "../../../core/entities/User";
import { errorObjectCatch } from "../../../shared/utils/errorObjectCatch";
import { GetUsersList } from "../../../core/use-cases/admin/GetUsersList";
import { ToogleUserStatus } from "../../../core/use-cases/admin/ToogleUserStatus";

export class UserManagementController {
  constructor(
    private getUsersList: GetUsersList,
    private toogleUserStatus: ToogleUserStatus
  ) {}

  userList = async (req: Request, res: Response): Promise<void> => {
    try {
      // console.log("first");
      let result = await this.getUsersList.execute(UserRole.USER);
      // console.log("second", result);
      res.status(200).json(result);
    } catch (error) {
      errorObjectCatch(error);
    }
  };

  userStatusToogle = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.query;

      if (typeof id === "string") {
        const result = await this.toogleUserStatus.execute(id);
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
}
