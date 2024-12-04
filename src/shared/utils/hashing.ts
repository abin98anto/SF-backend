import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

const SALT = process.env.SALT || 5;

export async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, SALT);
}
