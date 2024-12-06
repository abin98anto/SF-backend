import { miscMessages } from "../constants/constants";

export const errorObjectCatch = (err: any) => {
  try {
    if (err instanceof Error) {
      console.error(miscMessages.ERROR, err.message);
    } else {
      console.error(miscMessages.UNKNOWN_ERROR, err);
    }
  } catch (error) {
    console.log(miscMessages.ERROR_OBJECT, error);
  }
};
