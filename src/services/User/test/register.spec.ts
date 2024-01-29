import { describe, expect, it } from 'vitest';
import { UserService } from '../index';
import { compare } from 'bcryptjs';
import { InMemoryUsersRepository } from '../../../repositories/in-memory/in-memory-users-repository';
import { userAlreadyExistsError } from '../../../services/Errors/userAlreadyExist';

describe('Register use case - service', () => {
    const usersRepository = new InMemoryUsersRepository();
    const sut = new UserService(usersRepository);

    it('should hash user password upon registration' , async () => {
        const { user } = await sut.register({
            name: 'Lucas',
            email: 'lucas.magaldi@hotmail.com',
            password: '123456'
        });

        const isPasswordCorrectHashed = await compare('123456', user.password);

        expect(isPasswordCorrectHashed).toBe(true);
    });

    it('should not be able to register same e-mail twice' , async () => {
        await sut.register({
            name: 'Lucas',
            email: 'lucas.magaldddi@hotmail.com', //Every time it be executed change the E-mail
            password: '123456'
        });

        expect(async () =>  await sut.register({
            name: 'Lucas',
            email: 'lucas.magaldddi@hotmail.com', //Every time it be executed change the E-mail
            password: '123456'
        })).rejects.toBeInstanceOf(userAlreadyExistsError);
    });

    it('should be able to register an user' , async () => {
        const { user } = await sut.register({
            name: 'Lucas',
            email: 'lucas.magalddddi@hotmail.com', //Every time it be executed change the E-mail
            password: '123456'
        });

        expect(user.id).toEqual(expect.any(String));
    });
});