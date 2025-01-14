// import { UserRepositoryInterface } from "../../../interfaces/UserRepositoryInterface";
// import { User } from "../../../entities/User";
// import { errorObjectCatch } from "../../../../shared/utils/errorObjectCatch";
// import {
//   miscMessages,
//   userMessages,
// } from "../../../../shared/constants/constants";

// export class TutorUpdateProfile {
//   constructor(private userRepository: UserRepositoryInterface) {}

//   async execute(user: User): Promise<void> {
//     try {
//       const existingUser = await this.userRepository.findById(user._id!);

//       if (!existingUser) {
//         throw new Error(userMessages.USER_NOT_FOUND);
//       }

//       const updatedFields: Partial<User> = {};
//       (Object.keys(user) as (keyof User)[]).forEach((key) => {
//         const newValue = user[key];
//         const oldValue = existingUser[key];

//         if (
//           newValue !== undefined &&
//           newValue !== null &&
//           newValue !== oldValue
//         ) {
//           (updatedFields as any)[key] = newValue;
//         }
//       });

//       if (Object.keys(updatedFields).length === 0) {
//         return;
//       }

//       const { _id, ...fieldsToUpdate } = updatedFields;

//       await this.userRepository.update(user);
//     } catch (error) {
//       console.log(miscMessages.TUTOR_UPDATE_USE_CASE_ERROR, error);
//       errorObjectCatch(error);
//     }
//   }
// }
