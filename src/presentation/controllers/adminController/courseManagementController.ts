import { Request, Response } from "express";
import { CreateCourse } from "../../../core/use-cases/course/CreateCourseUseCase";
import { GetCourseById } from "../../../core/use-cases/course/GetCourseUseCase";
import { UpdateCourse } from "../../../core/use-cases/course/UpdateCourseUseCase";
import { DeleteCourse } from "../../../core/use-cases/course/DeleteCourseUseCase";
import { ListCourses } from "../../../core/use-cases/course/ListCoursesUseCase";

export class CourseManagementController {
  constructor(
    private createCourse: CreateCourse,
    private getCourseById: GetCourseById,
    private updateCourse: UpdateCourse,
    private deleteCourse: DeleteCourse,
    private listCourses: ListCourses
  ) {}

  create = async (req: Request, res: Response): Promise<void> => {
    try {
      const courseData = req.body;

      const course = {
        basicInfo: courseData?.basicInfo,
        advanceInfo: courseData?.advanceInfo,
        curriculum: courseData?.curriculum?.sections,
      };

      await this.createCourse.execute(course);
      res
        .status(201)
        .json({ success: true, message: "Course Added Sucssesfully." });
    } catch (error) {
      console.log("error adding course", error);
      res.status(400).json({ success: false, message: "Error Adding Course." });
    }
  };

  getById = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.query;
      const course = await this.getCourseById.execute(id as string);
      if (!course) {
        res.status(404).json({ success: false, message: "Course not found" });
      }
      res
        .status(200)
        .json({ success: true, message: "Course Found.", data: course });
    } catch (error) {
      console.log("error finding course", error);
      res
        .status(400)
        .json({ success: false, message: "Error Fetching Course." });
    }
  };

  update = async (req: Request, res: Response): Promise<void> => {
    try {
      const updates = req.body;
      console.log("the updates", updates);
      const updatedCourse = await this.updateCourse.execute(updates);
      console.log("updated course", updatedCourse);
      if (!updatedCourse) {
        res.status(404).json({ success: false, message: "Course not found" });
      }
      res
        .status(200)
        .json({ success: true, message: "Course Updated Sucssesfully." });
    } catch (error) {
      console.log("error updating course", error);
      res
        .status(400)
        .json({ success: false, message: "Error Updating Course." });
    }
  };

  delete = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.query;
      const success = await this.deleteCourse.execute(id as string);
      if (!success) {
        res.status(404).json({ success: false, message: "Course Deleted." });
      }
      res.status(204).send({ success: true, message: "Course Deleted." });
    } catch (error) {
      console.log("error updating course", error);
      res
        .status(400)
        .json({ success: false, message: "Error Updating Course." });
    }
  };

  list = async (req: Request, res: Response): Promise<void> => {
    try {
      const courses = await this.listCourses.execute();
      res.status(200).json({
        success: true,
        message: "Course Listing Successful.",
        data: courses,
      });
    } catch (error) {
      console.log("error fetching course", error);
      res
        .status(400)
        .json({ success: false, message: "Error fetching Course List." });
    }
  };
}
