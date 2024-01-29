import { beforeEach, describe, expect, it } from 'vitest';
import { UserService } from '../index';
import { InMemoryUsersRepository } from '../../../repositories/in-memory/in-memory-users-repository';

let usersRepository: InMemoryUsersRepository;
let sut: UserService;

describe('Authenticate use case - service', () => {

    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository();
        sut = new UserService(usersRepository);
    });
    

    it('Should authenticate the user', async () => {
        await sut.register({
            name: 'Lucas',
            email: 'lucas.magaldddi@hotmail.com', //Every time it be executed change the E-mail
            password: '123456'
        });

        const { 
            user_id, 
            user_name, 
            user_email 
        } = await sut
        .authentication({
            email: 'lucas.magaldddi@hotmail.com', 
            password: '123456'
        });

        expect(user_id).toEqual(expect.any(String));
    });
})