import { z } from 'zod'
import { FastifyReply, FastifyRequest } from 'fastify'
import { userAlreadyExistsError } from '../../../services/Errors/userAlreadyExist'
import { userFactory } from 'src/services/Factories/userFactory'

const usersService = userFactory()

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
        throw error;
    }

    return response.status(201).send();
}