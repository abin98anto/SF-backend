import experess from "express";

import { AdminAuthController } from "../controllers/adminController/adminAuthController";
import { LoginUseCase } from "../../core/use-cases/user/user-login/LoginUseCase";
import { JWTService } from "../../infrastructure/external-services/JWTService";
import { UserRepository } from "../../infrastructure/repositories/UserRepository";
import { verifyRefreshToken } from "../middleware/authMiddleware";
import { UserManagementController } from "../controllers/adminController/userManagementController";
import { GetUsersList } from "../../core/use-cases/admin/GetUsersList";

const adminRouter = experess.Router();

const adminRepository = new UserRepository();
const jwtService = new JWTService();

const loginUseCase = new LoginUseCase(adminRepository, jwtService);
const adminAuthController = new AdminAuthController(loginUseCase, jwtService);

const getUsersList = new GetUsersList(adminRepository);
const userManagementController = new UserManagementController(getUsersList);

adminRouter.post("/login", adminAuthController.Login);
adminRouter.post(
  "/refresh-token",
  verifyRefreshToken,
  adminAuthController.refreshAccessToken
);
adminRouter.post("/logout", adminAuthController.logout);

adminRouter.get("/users", userManagementController.userList);

export default adminRouter;
