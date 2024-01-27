import { z } from 'zod';
import { FastifyReply, FastifyRequest } from 'fastify';
import { UserService } from '../../../services/User';
import { PrismaUsersRepository } from '../../../repositories/prisma-users-repository';
import { userAlreadyExistsError } from '../../../services/Errors/userAlreadyExist';

const prismaUsersRepository = new PrismaUsersRepository();
const usersService = new UserService(prismaUsersRepository);

export async function register (request: FastifyRequest, response: FastifyReply) {
    const registerBodySchema = z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(6)
    });

    const { name, email, password } = registerBodySchema.parse(request.body);

    try {
        await usersService.register({name, email, password});
    } catch (error: unknown) {
        if(error instanceof userAlreadyExistsError) return response.status(409).send({ message: error.message});
        return response.status(500).send();
    }

    return response.status(201).send();
}