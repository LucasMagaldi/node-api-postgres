import { userAlreadyExistsError } from '../Errors/userAlreadyExist';
import { usersRepository } from '../Entities/usersRepository';
import { hash } from 'bcryptjs';

interface RegisterServiceRequest {
    name: string;
    email: string;
    password: string;
}


export class UserService {

    private usersRepository: usersRepository;
    constructor(usersRepository: usersRepository) {
        this.usersRepository = usersRepository;
    }

    async register({ name, email, password } : RegisterServiceRequest) {
        const emailAlredyExist = await this.usersRepository.findByEmail(email);

        if(emailAlredyExist) throw new userAlreadyExistsError();

        const passwordHash = await hash(password,6);
        
        await this.usersRepository.create({ name, email, password: passwordHash});
    }
}

