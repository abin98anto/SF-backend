import { Request, Response } from "express";
import { UpdateDetailsUseCase } from "../../../core/use-cases/user/update/UpdateDetailsUseCase";
import { EnrollCourseUseCase } from "../../../core/use-cases/course/EnrollCourseUseCase";

export class UserUpdateController {
  constructor(
    private updateDetailsUseCase: UpdateDetailsUseCase,
    private enrollCourseUseCase: EnrollCourseUseCase
  ) {}

  updateUser = async (req: Request, res: Response): Promise<void> => {
    try {
      // console.log("its in the backend!!", req.body);
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

  enrollCourse = async (req: Request, res: Response): Promise<void> => {
    try {
      // console.log("when in back", req.body);
      const { courseId } = req.body.coursesEnrolled;

      if (!courseId) {
        res.status(400).send("Missing cousrseId in request body!");
        return;
      }

      const { id } = req.query;
      if (!id) {
        res.status(400).send("Missing user ID in query!");
        return;
      }

      const updates = {
        _id: id,
        courseId: courseId,
        tutorId: "",
        startDate: new Date(),
        endDate: null,
      };

      const result = await this.enrollCourseUseCase.execute(updates);

      res
        .status(200)
        .json({ message: "User updation successful!", user: result });
    } catch (error) {
      console.log("error enrolling in course", error);
      res
        .status(400)
        .send(error instanceof Error ? error.message : "Error updating user!");
    }
  };
}
