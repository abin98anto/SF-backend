import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

import { errorObjectCatch } from "./errorObjectCatch";

const SALT = Number(process.env.SALT!);

export async function hashPassword(password: string): Promise<string> {
  try {
    return await bcrypt.hash(password, SALT);
  } catch (error) {
    errorObjectCatch(error);
    return "";
  }
}
