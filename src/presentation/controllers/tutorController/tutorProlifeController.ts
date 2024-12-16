import { Request, Response } from "express";
import { UserRepository } from "../../../infrastructure/repositories/UserRepository";
import { TutorUpdateProfile } from "../../../core/use-cases/tutor/update-profile/TutorUpdateProfile";
import { errorObjectCatch } from "../../../shared/utils/errorObjectCatch";
import { miscMessages } from "../../../shared/constants/constants";
import { User, UserRole } from "../../../core/entities/User";
import { JWTService } from "../../../infrastructure/external-services/JWTService";

export class TutorProfileUpdate {
  constructor(
    private tutorUpdateProfile: TutorUpdateProfile,
    private jwtService: JWTService
  ) {}

  updateProfile = async (req: Request, res: Response): Promise<void> => {
    try {
      const token = req.cookies.tutorAccess;
      // console.log("the toekken", token);
      if (!token) {
        res.status(401).json({ message: "Unauthorized" });
        return;
      }

      // Verify the token and extract the payload
      const payload = this.jwtService.verifyAccessToken(token);
      if (!payload || !payload._id) {
        res.status(401).json({ message: "Invalid token" });
        return;
      }
      const { name, email, password, profilePicture, resume } = req.body;
      const user: User = {
        _id: payload._id,
        name,
        email,
        password,
        role: UserRole.TUTOR,
        isActive: false,
        profilePicture,
        resume,
      };
      // console.log("in the controller", user);
      await this.tutorUpdateProfile.execute(user);
      res.status(200).json({ message: "Profile updated successfully" });
    } catch (error) {
      // console.log("controller");
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
