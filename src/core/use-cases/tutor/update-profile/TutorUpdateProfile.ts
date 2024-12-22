import { UserRepositoryInterface } from "../../../interfaces/UserRepositoryInterface";
import { User } from "../../../entities/User";
import { errorObjectCatch } from "../../../../shared/utils/errorObjectCatch";
import { userMessages } from "../../../../shared/constants/constants";

export class TutorUpdateProfile {
  constructor(private userRepository: UserRepositoryInterface) {}

  async execute(user: User): Promise<void> {
    try {
      // console.log("Received user:", user);

      const existingUser = await this.userRepository.findById(user._id!);

      if (!existingUser) {
        throw new Error(userMessages.USER_NOT_FOUND);
      }

      // console.log("Existing user from database:", existingUser);

      // Create an object with only the fields that have changed
      const updatedFields: Partial<User> = {};

      (Object.keys(user) as (keyof User)[]).forEach((key) => {
        const newValue = user[key];
        const oldValue = existingUser[key];

        // More explicit type checking
        if (
          newValue !== undefined &&
          newValue !== null &&
          newValue !== oldValue
        ) {
          // Type assertion to handle complex types
          (updatedFields as any)[key] = newValue;
        }
      });

      // console.log("Fields to update:", updatedFields);

      if (Object.keys(updatedFields).length === 0) {
        // console.log("No fields to update.");
        return;
      }

      // Ensure _id is a string and remove it from updatedFields
      const { _id, ...fieldsToUpdate } = updatedFields;

      // Update the database with only the changed fields
      const updatedUser = await this.userRepository.update(user);

      // console.log("Updated user:", updatedUser);
    } catch (error) {
      console.log("Error in use-case:");
      errorObjectCatch(error);
    }
  }
}
