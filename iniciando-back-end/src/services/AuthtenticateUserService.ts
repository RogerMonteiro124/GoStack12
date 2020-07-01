
import {getRepository} from 'typeorm';
import User from '../models/User';
import {hash, compare} from 'bcryptjs';
import {sign, verify} from 'jsonwebtoken';
import authConfig from '../config/auth'


interface Request{
    email: string;
    password: string;
}
interface Response{
    user: User,
    token: string
}
class AuthtenticateUserService{
    public async execute({email, password}: Request): Promise<Response>{
        
        const userRepository = getRepository(User);

        const user  = await userRepository.findOne({
            where:{email}
        });
        if(!user){
            throw new Error('Incorrecct email/password');
        }

        const passwordMached = await compare(password, user.password)

        if(!passwordMached){
            throw new Error('Incorrecct email/password');
        }
        const token = sign({}, authConfig.jwt.secret, {subject: user.id,expiresIn: authConfig.jwt.expiresIn});

        return{
            user,
            token
        }


    }
}

export default AuthtenticateUserService;