import { userAlreadyExistsError } from '../Errors/userAlreadyExist';
import { usersRepository } from '../Entities/usersRepository';
import { hash } from 'bcryptjs';
import { User } from '@prisma/client';

interface RegisterServiceRequest {
    name: string;
    email: string;
    password: string;
}

interface RegisterServiceResponse {
    user: User
}


export class UserService {

    private usersRepository: usersRepository;
    constructor(usersRepository: usersRepository) {
        this.usersRepository = usersRepository;
    }

    async register({ name, email, password } : RegisterServiceRequest): Promise<RegisterServiceResponse> {
        const emailAlredyExist = await this.usersRepository.findByEmail(email);

        if(emailAlredyExist) throw new userAlreadyExistsError();

        const passwordHash = await hash(password,6);
        
        const user = await this.usersRepository.create({ name, email, password: passwordHash});

        return {
            user
        }
    }
}

