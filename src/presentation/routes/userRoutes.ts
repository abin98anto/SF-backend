import express from "express";
import { UserController } from "../controllers/userController/userSignupController";
import { UserRepository } from "../../infrastructure/repositories/UserRepository";
import { EmailService } from "../../infrastructure/external-services/EmailService";
import { SendOTPUseCase } from "../../core/use-cases/user/signup/SendOTPUseCase";
import { VerifyOTPUseCase } from "../../core/use-cases/user/signup/VerifyOTPUseCase";
import { AuthController } from "../controllers/userController/userAuthController";
import { LoginUseCase } from "../../core/use-cases/user/login/LoginUseCase";
import { JWTService } from "../../infrastructure/external-services/JWTService";
import {
  verifyRefreshToken,
  verifyAccessToken,
} from "../middleware/authMiddleware";
import { UserUpdateController } from "../controllers/userController/userUpdateController";
import { UpdateDetailsUseCase } from "../../core/use-cases/user/update/UpdateDetailsUseCase";
import { CourseRepository } from "../../infrastructure/repositories/CourseRepository";
import { CreateCourse } from "../../core/use-cases/course/CreateCourseUseCase";
import { GetCourseById } from "../../core/use-cases/course/GetCourseUseCase";
import { UpdateCourse } from "../../core/use-cases/course/UpdateCourseUseCase";
import { DeleteCourse } from "../../core/use-cases/course/DeleteCourseUseCase";
import { ListCourses } from "../../core/use-cases/course/ListCoursesUseCase";
import { CourseManagementController } from "../controllers/adminController/courseManagementController";
import { CourseRepositoryInterface } from "../../core/interfaces/CourseRepositoryInterface";
import { EnrollCourseUseCase } from "../../core/use-cases/course/EnrollCourseUseCase";
import { GoogleAuthUseCase } from "../../core/use-cases/user/signup/GoogleAuthUseCase";
import { AddUserUseCase } from "../../core/use-cases/user/signup/AddUserUseCase";
import { ForgotPasswordUseCase } from "../../core/use-cases/user/login/ForgotPasswordUseCase";
import { SetNewPasswordUseCase } from "../../core/use-cases/user/login/SetNewPasswordUseCase";
import { LessonUpdateUseCase } from "../../core/use-cases/user/update/LessonUpdateUseCase";
import { GetCompletedLessonsUseCase } from "../../core/use-cases/user/update/GetCompletedLessonsUseCase";
import { GetEnrolledCoursesUseCase } from "../../core/use-cases/user/update/GetEnrolledCoursesUseCase";
import ChatRepository from "../../infrastructure/repositories/chat/ChatRepository";

const userRouter = express.Router();

const userRepository = new UserRepository();
const emailService = new EmailService();
const jwtService = new JWTService();
const addUserUseCase = new AddUserUseCase(userRepository);
const lessonUpdateUseCase = new LessonUpdateUseCase(userRepository);
const getCompletedLessonsUseCase = new GetCompletedLessonsUseCase(
  userRepository
);

const chatRepository = new ChatRepository();
const getCourseById = new GetCourseById(new CourseRepository());
const getEnrolledCoursesUseCase = new GetEnrolledCoursesUseCase(userRepository);
const googleAuthUseCase = new GoogleAuthUseCase(
  addUserUseCase,
  userRepository,
  jwtService
);
const enrollCourseUseCase = new EnrollCourseUseCase(
  userRepository,
  getCourseById,
  chatRepository
);
const updateDetailsUseCase = new UpdateDetailsUseCase(userRepository);
const loginUseCase = new LoginUseCase(userRepository, jwtService);
const sendOTPUseCase = new SendOTPUseCase(userRepository, emailService);
const verifyOTPUseCase = new VerifyOTPUseCase(userRepository);
const setNewPasswordUseCase = new SetNewPasswordUseCase(userRepository);
const forgotPasswordUseCase = new ForgotPasswordUseCase(
  userRepository,
  emailService
);
const userController = new UserController(
  sendOTPUseCase,
  verifyOTPUseCase,
  googleAuthUseCase,
  forgotPasswordUseCase,
  setNewPasswordUseCase
);

const authController = new AuthController(loginUseCase, jwtService);
const userUpdateController = new UserUpdateController(
  updateDetailsUseCase,
  enrollCourseUseCase,
  lessonUpdateUseCase,
  getCompletedLessonsUseCase,
  getEnrolledCoursesUseCase
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

// User signup.
userRouter.post("/send-otp", userController.sendOTP);
userRouter.post("/verify-otp", userController.verifyOTP);

// User Auth.
userRouter.post("/login", authController.Login);
userRouter.post(
  "/refresh-token",
  verifyRefreshToken,
  authController.refreshAccessToken
);

// Google Login
userRouter.post("/auth/google", userController.GoogleSignIn);

userRouter.post("/logout", verifyAccessToken, authController.logout);

// User update.
userRouter.patch("/update", verifyAccessToken, userUpdateController.updateUser);
userRouter.patch(
  "/course-enroll",
  verifyAccessToken,
  userUpdateController.enrollCourse
);

// Course Routes
userRouter.get("/courses", courseManagementController.list);
userRouter.get(
  "/course/:id",
  courseManagementController.getByIdUsingPathParams
);
userRouter.post("/lesson", userUpdateController.lessonUpdate);
userRouter.post("/completed-lessons", userUpdateController.completedLessons);
userRouter.post("/my-learning", userUpdateController.enrolledCourses);

// Forgot Password.
userRouter.post("/forgot-password", userController.forgotPassword);
userRouter.patch("/set-password", userController.setPassword);

export default userRouter;
