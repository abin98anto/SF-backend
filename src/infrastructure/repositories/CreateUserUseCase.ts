import { UserRepositoryInterface } from "../../interfaces/UserRepositoryInterface";

interface CreateUserRequest {
  email: string;
  password: string;
  profileUrl: string;
}

export class CreateUserUseCase {
  constructor(private userRepository: UserRepositoryInterface) {}

  async execute(request: CreateUserRequest) {
    const hashedPassword = await this.hashPassword(request.password);
    const newUser = await this.userRepository.create({
      email: request.email,
      password: hashedPassword,
      profileUrl: request.profileUrl,
    });

    return newUser;
  }

  private async hashPassword(password: string): Promise<string> {
    const bcrypt = await import("bcrypt");
    return bcrypt.hash(password, 10);
  }
}
