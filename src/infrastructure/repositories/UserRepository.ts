import { UserSchema } from "../database/mongoose-schemas/UserSchema";

export class UserRepository {
  async create(user: { email: string; password: string; profileUrl: string }) {
    return UserSchema.create(user);
  }
}
