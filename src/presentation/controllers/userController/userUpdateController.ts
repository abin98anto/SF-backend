import { Request, Response } from "express";
import { UpdateDetailsUseCase } from "../../../core/use-cases/user/update/UpdateDetailsUseCase";

export class UserUpdateController {
  constructor(private updateDetailsUseCase: UpdateDetailsUseCase) {}

  updateUser = async (req: Request, res: Response): Promise<void> => {
    try {
      // console.log("its in the backend!!");
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
      console.log("error updating user", error);
      res
        .status(400)
        .send(error instanceof Error ? error.message : "Error updating user!");
    }
  };
}
