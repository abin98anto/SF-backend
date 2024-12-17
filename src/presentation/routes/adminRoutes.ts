import experess from "express";

import { AdminAuthController } from "../controllers/adminController/adminAuthController";
import { LoginUseCase } from "../../core/use-cases/user/user-login/LoginUseCase";
import { JWTService } from "../../infrastructure/external-services/JWTService";
import { UserRepository } from "../../infrastructure/repositories/UserRepository";
import { verifyRefreshToken } from "../middleware/authMiddleware";
import { UserManagementController } from "../controllers/adminController/userManagementController";
import { GetUsersList } from "../../core/use-cases/admin/GetUsersList";
import { ToogleUserStatus } from "../../core/use-cases/admin/ToogleUserStatus";
import { TutorManagementController } from "../controllers/adminController/tutorManagementController";

const adminRouter = experess.Router();

const adminRepository = new UserRepository();
const jwtService = new JWTService();

const loginUseCase = new LoginUseCase(adminRepository, jwtService);
const adminAuthController = new AdminAuthController(loginUseCase, jwtService);

const getUsersList = new GetUsersList(adminRepository);
const toogleUserStatus = new ToogleUserStatus(adminRepository);
const userManagementController = new UserManagementController(
  getUsersList,
  toogleUserStatus
);

const tutorManagementController = new TutorManagementController(
  getUsersList,
  toogleUserStatus
);

adminRouter.post("/login", adminAuthController.Login);
adminRouter.post(
  "/refresh-token",
  verifyRefreshToken,
  adminAuthController.refreshAccessToken
);
adminRouter.post("/logout", adminAuthController.logout);

adminRouter.get("/users", userManagementController.userList);
adminRouter.patch("/toggle-status", userManagementController.userStatusToogle);

adminRouter.get("/tutors", tutorManagementController.tutorList);

export default adminRouter;
