import { userAlreadyExistsError } from '../Errors/userAlreadyExist';
import { usersRepository } from '../../Entities/usersRepository';
import { compare, hash } from 'bcryptjs';
import { User } from '@prisma/client';
import { InValidCredentials } from '../Errors/InvalidCredentials';

interface RegisterServiceRequest {
    name: string;
    email: string;
    password: string;
}

interface RegisterServiceResponse {
    user: User
}

interface AuthenticationServiceRequest {
    email: string;
    password: string;
}

interface AuthenticationServiceResponse {
    user_name: string;
    user_email: string;
    user_id: string;
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

    async authentication ({ email, password }: AuthenticationServiceRequest) : Promise<AuthenticationServiceResponse> {
        const user = await this.usersRepository.findByEmail(email);

        if(!user) throw new InValidCredentials();

        const doesPasswordMatch = await compare(password, user.password);
        if(!doesPasswordMatch) throw new InValidCredentials();

        return {
            user_id: user.id,
            user_email: user.email,
            user_name: user.name
        }
    }
}

