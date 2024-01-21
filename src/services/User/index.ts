import { hash } from 'bcryptjs';
import { prisma } from '../../connectors/prisma';
import { PrismaUsersRepository } from '../../repositories/prisma-users-repository';

interface RegisterServiceRequest {
    name: string;
    email: string;
    password: string;
}

const prismaUsersRepository = new PrismaUsersRepository();

export async function registerService({ name, email, password } : RegisterServiceRequest) {
    const emailAlredyExist = await prisma.user.findUnique({
        where: {
            email
        }
    });

    if(emailAlredyExist) throw new Error('E-mail already exists.');

    const passwordHash = await hash(password,6);
    
    await prismaUsersRepository.create({ name, email, password: passwordHash});
}