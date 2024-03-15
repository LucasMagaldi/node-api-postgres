import { UserService } from "src/services/User"
import { PrismaUsersRepository } from "src/repositories/prisma-users-repository"

export function userFactory() {
    const userRepository = new PrismaUsersRepository()
    return new UserService(userRepository)
}