import { Prisma, User } from "@prisma/client";
import { usersRepository } from "../../services/Entities/usersRepository";

export class InMemoryUsersRepository implements usersRepository {

    public items: User[] = [];

    async findByEmail(email: string): Promise<User | null> {
        const user = this.items.find(item => item.email === email);

        if(!user) return null;
        return user;
    }

    async create(data: Prisma.UserCreateInput): Promise<User> {
        const user = {
            id: 'test',
            name: data.name,
            email: data.email,
            password: data.password,
            created_at: new Date()
        };

        this.items.push(user);

        return user;
    }
}