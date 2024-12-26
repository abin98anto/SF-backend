import experess from "express";

import { AdminAuthController } from "../controllers/adminController/adminAuthController";
import { LoginUseCase } from "../../core/use-cases/user/login/LoginUseCase";
import { JWTService } from "../../infrastructure/external-services/JWTService";
import { UserRepository } from "../../infrastructure/repositories/UserRepository";
import {
  verifyAdminToken,
  verifyRefreshToken,
} from "../middleware/authMiddleware";
import { UserManagementController } from "../controllers/adminController/userManagementController";
import { GetList } from "../../core/use-cases/admin/GetList";
import { ToogleUserStatus } from "../../core/use-cases/admin/ToogleUserStatus";
import { TutorManagementController } from "../controllers/adminController/tutorManagementController";
import { VerifyTutorUseCase } from "../../core/use-cases/admin/VerifyTutorUseCase";
import { DenyTutorUseCase } from "../../core/use-cases/admin/DenyTutorUseCase";
import { EmailService } from "../../infrastructure/external-services/EmailService";
import { CategoryManagementController } from "../controllers/adminController/categoryManagementController";
import { AddCategoryUseCase } from "../../core/use-cases/category/AddCategoryUseCase";
import { CategoryRepositoryInterface } from "../../core/interfaces/CategoryRepositoryInterface";
import { CategoryRepository } from "../../infrastructure/repositories/CategoryRepository";
import { UserRepositoryInterface } from "../../core/interfaces/UserRepositoryInterface";
import { UpdateCategoryUseCase } from "../../core/use-cases/category/UpdateCategoryUseCase";
import { GetCategoriesUseCase } from "../../core/use-cases/category/GetCategoriesUseCase";
import { CreateCourse } from "../../core/use-cases/course/CreateCourseUseCase";
import { CourseRepositoryInterface } from "../../core/interfaces/CourseRepositoryInterface";
import { CourseRepository } from "../../infrastructure/repositories/CourseRepository";
import { GetCourseById } from "../../core/use-cases/course/GetCourseUseCase";
import { UpdateCourse } from "../../core/use-cases/course/UpdateCourseUseCase";
import { DeleteCourse } from "../../core/use-cases/course/DeleteCourseUseCase";
import { ListCourses } from "../../core/use-cases/course/ListCoursesUseCase";
import { CourseManagementController } from "../controllers/adminController/courseManagementController";

const adminRouter = experess.Router();

const adminRepository: UserRepositoryInterface = new UserRepository();
const jwtService = new JWTService();

// User Side.
const loginUseCase = new LoginUseCase(adminRepository, jwtService);
const adminAuthController = new AdminAuthController(loginUseCase, jwtService);
const getUsersList = new GetList(adminRepository);
const toogleUserStatus = new ToogleUserStatus(adminRepository);
const userManagementController = new UserManagementController(
  getUsersList,
  toogleUserStatus
);

// Tutor Side.
const userRepository: UserRepositoryInterface = new UserRepository();
const emailService = new EmailService();
const verifyTutorUseCase = new VerifyTutorUseCase(userRepository);
const denyTutorUseCase = new DenyTutorUseCase(emailService, userRepository);
const tutorManagementController = new TutorManagementController(
  verifyTutorUseCase,
  denyTutorUseCase
);

// Category Side.
const categoryRepository: CategoryRepositoryInterface =
  new CategoryRepository();
const getCategoriesUseCase = new GetCategoriesUseCase(categoryRepository);
const addCategoryUseCase = new AddCategoryUseCase(categoryRepository);
const updateCategoryUseCase = new UpdateCategoryUseCase(categoryRepository);
const categoryManagementController = new CategoryManagementController(
  addCategoryUseCase,
  updateCategoryUseCase,
  getCategoriesUseCase
);

// Course Side.
const courseRepository: CourseRepositoryInterface = new CourseRepository();
const createCourseUseCase = new CreateCourse(courseRepository);
const getByIdUseCase = new GetCourseById(courseRepository);
const updateCourseUseCase = new UpdateCourse(courseRepository);
const deleteCourseUseCase = new DeleteCourse(courseRepository);
const listCourseUseCase = new ListCourses(courseRepository);
const courseManagementController = new CourseManagementController(
  createCourseUseCase,
  getByIdUseCase,
  updateCourseUseCase,
  deleteCourseUseCase,
  listCourseUseCase
);

// Admin Login.
adminRouter.post("/login", adminAuthController.Login);
adminRouter.post(
  "/refresh-token",
  verifyRefreshToken,
  adminAuthController.refreshAccessToken
);

// adminRouter.use(verifyAdminToken);
adminRouter.post("/logout", adminAuthController.logout);

// Management Routes.
adminRouter.get("/list", userManagementController.list);
adminRouter.patch("/toggle-status", userManagementController.userStatusToogle);
adminRouter.patch("/update", tutorManagementController.VerifyTutor);
adminRouter.post("/deny-tutor", tutorManagementController.DenyTutor);

// Category Management.
adminRouter.get("/categories", categoryManagementController.GetCategories);
adminRouter.post("/add-category", categoryManagementController.AddCategory);
adminRouter.patch(
  "/update-category",
  categoryManagementController.updateCategory
);

// Course Management.
adminRouter.post("/add-course", courseManagementController.create);
adminRouter.get("/courses", courseManagementController.list);
adminRouter.get("/get-course", courseManagementController.getById);
adminRouter.put("/update-course", courseManagementController.update);
adminRouter.delete("/delete-course", courseManagementController.delete);

export default adminRouter;
