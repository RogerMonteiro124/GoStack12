import { Router } from 'express';
import AuthtenticateUserService from '../services/AuthtenticateUserService';
import usersRouter from './users.routes';

const sessionsRouter = Router();
sessionsRouter.post('/', async (request, response)=>{
    
    try{
        const { email, password } = request.body;

        const authtenticateUser = new AuthtenticateUserService();

        const {user, token} = await authtenticateUser.execute({
            email,
            password
        });
        delete user.password;
        
        return response.json({user, token});
        
    }catch(err){
        return response.status(400).json({error: err.message})
    }
});

export default sessionsRouter;