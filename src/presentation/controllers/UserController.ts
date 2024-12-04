import { Request, Response } from "express";
import { AddUserUseCase } from "../../core/use-cases/user/AddUserUseCase";
import { UserRepository } from "../../infrastructure/repositories/UserRepository";
import { messages } from "../../shared/constants/misc";

export class UserController {
  private addUserUseCase: AddUserUseCase;

  constructor() {
    const userRepository = new UserRepository();
    this.addUserUseCase = new AddUserUseCase(userRepository);
  }

  async register(req: Request, res: Response): Promise<void> {
    try {
      const user = await this.addUserUseCase.execute(req.body);
      res.status(201).json(user);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(400).json({ message: messages.UNKNOWN_ERROR });
      }
    }
  }
}
