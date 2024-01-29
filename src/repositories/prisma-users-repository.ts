import { usersRepository } from '../services/Entities/usersRepository';
import { prisma }  from '../connectors/prisma';
import { Prisma } from '@prisma/client';

export class PrismaUsersRepository implements usersRepository {
    
    async create(data: Prisma.UserCreateInput) {
        const user = await prisma.user.create({
            data,
        });

        return user;
    }

    async findByEmail(email: string) {
        const user = await prisma.user.findUnique({
            where: { email }
        });

        return user;
    }
} 