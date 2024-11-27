export interface UserRepositoryInterface {
  createUser(user: User): Promise<User>;
  findUserByEmail(email: string): Promise<User | null>;
}