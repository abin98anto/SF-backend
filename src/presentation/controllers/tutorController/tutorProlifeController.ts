import { Request, Response } from "express";
import { errorObjectCatch } from "../../../shared/utils/errorObjectCatch";
import { miscMessages } from "../../../shared/constants/constants";
import { UpdateDetailsUseCase } from "../../../core/use-cases/user/update/UpdateDetailsUseCase";

export class TutorProfileUpdate {
  constructor(private updateDetailsUseCase: UpdateDetailsUseCase) {}

  updateProfile = async (req: Request, res: Response): Promise<void> => {
    try {
      const updateData = req.body;

      if (!updateData) {
        res.status(400).send("Missing updateData in request body!");
        return;
      }

      const { id } = req.query;
      if (!id) {
        res.status(400).send("Missing user ID in query!");
        return;
      }

      const user = { ...updateData, _id: id };
      const result = await this.updateDetailsUseCase.execute(user);

      res
        .status(200)
        .json({ message: "User updation successful!", user: result });
    } catch (error) {
      errorObjectCatch(error);
      res.status(500).json({
        message:
          error instanceof Error
            ? error.message
            : miscMessages.INTERNAL_SERVER_ERROR,
      });
    }
  };
}
