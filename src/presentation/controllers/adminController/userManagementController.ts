import { Request, Response } from "express";
import { User, UserRole } from "../../../core/entities/User";
import { errorObjectCatch } from "../../../shared/utils/errorObjectCatch";
import { GetUsersList } from "../../../core/use-cases/admin/GetUsersList";

export class UserManagementController {
  constructor(private getUsersList: GetUsersList) {}

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
}
