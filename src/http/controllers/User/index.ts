import { z } from 'zod';
import { prisma } from '../../../connectors/prisma';
import { FastifyReply, FastifyRequest } from 'fastify';
import { hash } from 'bcryptjs';

export async function register (request: FastifyRequest, response: FastifyReply) {
    const registerBodySchema = z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(6)
    });

    const { name, email, password } = registerBodySchema.parse(request.body);

    const emailAlredyExist = await prisma.user.findUnique({
        where: {
            email
        }
    });

    if(emailAlredyExist) return response.status(409).send();

    const passwordHash = await hash(password,6);

    await prisma.user.create({
        data: {
            name,
            email,
            password: passwordHash
        }
    });

    return response.status(201).send();
}