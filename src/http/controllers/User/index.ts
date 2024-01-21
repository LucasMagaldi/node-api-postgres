import { z } from 'zod';
import { prisma } from '../../../connectors/prisma';
import { FastifyReply, FastifyRequest } from 'fastify';

export async function register (request: FastifyRequest, response: FastifyReply) {
    const registerBodySchema = z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(6)
    });

    const { name, email, password } = registerBodySchema.parse(request.body);

    await prisma.user.create({
        data: {
            name,
            email,
            password
        }
    });

    return response.status(201).send();
}