import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

const SALT = Number(process.env.SALT!);

export async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, SALT);
}
