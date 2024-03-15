import { beforeEach, describe, expect, it } from 'vitest'
import { UserService } from '../index'
import { InMemoryUsersRepository } from '../../../repositories/in-memory/in-memory-users-repository'
import { InValidCredentials } from '../../Errors/InvalidCredentials'
import { hash } from 'bcryptjs'

let usersRepository: InMemoryUsersRepository
let sut: UserService; // System under test

describe('Authenticate use case - service', () => {

    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository()
        sut = new UserService(usersRepository)
    });
    

    it('Should authenticate the user', async () => {
        await sut.register({
            name: 'Lucas',
            email: 'lucas.magaldddi@hotmail.com', //Every time it be executed change the E-mail
            password: '123456'
        })

        const { 
            user_id, 
            user_name, 
            user_email 
        } = await sut
        .authentication({
            email: 'lucas.magaldddi@hotmail.com', 
            password: '123456'
        });

        expect(user_id).toEqual(expect.any(String))
    })

    it('Should not be able to authenticate with wrong password', async () => {
        await usersRepository.create({
            name: "Lucas Magaldi", 
            email: "lucas@hotmail.com",
            password: await hash("123456", 6)
        })

        expect(() =>
        sut.authentication({
            email: 'johndoe@example.com',
            password: '123123',
        }),
        ).rejects.toBeInstanceOf(InValidCredentials)
    })

    it('Should not be able to authenticate with wrong e-mail', async () => {
        expect(() =>
        sut.authentication({
            email: 'lucas@hotmail.com"',
            password: '123456',
        }),
        ).rejects.toBeInstanceOf(InValidCredentials)
    })
})