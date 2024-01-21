import { z } from 'zod';
import { FastifyReply, FastifyRequest } from 'fastify';
import { registerService } from '../../../services/User';

export async function register (request: FastifyRequest, response: FastifyReply) {
    const registerBodySchema = z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(6)
    });

    const { name, email, password } = registerBodySchema.parse(request.body);

    try {
        await registerService({name, email, password});
    } catch (error) {
        return response.status(409).send();
    }

    return response.status(201).send();
}