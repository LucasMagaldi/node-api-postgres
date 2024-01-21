import { hash } from 'bcryptjs';
import { prisma } from '../../connectors/prisma';

interface RegisterServiceRequest {
    name: string;
    email: string;
    password: string;
}

export async function registerService({ name, email, password } : RegisterServiceRequest) {
    const emailAlredyExist = await prisma.user.findUnique({
        where: {
            email
        }
    });

    if(emailAlredyExist) throw new Error('E-mail already exists.');

    const passwordHash = await hash(password,6);

    await prisma.user.create({
        data: {
            name,
            email,
            password: passwordHash
        }
    });
}