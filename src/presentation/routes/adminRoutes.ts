import experess from "express";

import { AdminAuthController } from "../controllers/adminController/adminAuthController";
import { LoginUseCase } from "../../core/use-cases/user/login/LoginUseCase";
import { JWTService } from "../../infrastructure/external-services/JWTService";
import { UserRepository } from "../../infrastructure/repositories/UserRepository";
import { verifyRefreshToken } from "../middleware/authMiddleware";
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

const adminRouter = experess.Router();

const adminRepository: UserRepositoryInterface = new UserRepository();
const jwtService = new JWTService();

const loginUseCase = new LoginUseCase(adminRepository, jwtService);
const adminAuthController = new AdminAuthController(loginUseCase, jwtService);

const getUsersList = new GetList(adminRepository);
const toogleUserStatus = new ToogleUserStatus(adminRepository);
const userManagementController = new UserManagementController(
  getUsersList,
  toogleUserStatus
);

const userRepository: UserRepositoryInterface = new UserRepository();
const emailService = new EmailService();
const verifyTutorUseCase = new VerifyTutorUseCase(userRepository);
const denyTutorUseCase = new DenyTutorUseCase(emailService, userRepository);
const tutorManagementController = new TutorManagementController(
  verifyTutorUseCase,
  denyTutorUseCase
);

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

// Admin Login.
adminRouter.post("/login", adminAuthController.Login);
adminRouter.post(
  "/refresh-token",
  verifyRefreshToken,
  adminAuthController.refreshAccessToken
);
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

export default adminRouter;
