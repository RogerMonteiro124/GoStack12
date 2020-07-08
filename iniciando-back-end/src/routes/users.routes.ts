import { Router, response } from 'express';

import multer from  'multer';
import uploadConfig from  '../config/uploadConfig';

import CreateUserService from '../services/CreateUserService';

import ensureAuthenticated from '../middleware/ensureAuthenticated';

import UpdateUserAvatarService from '../services/UpdateUserAvatarService';

const usersRouter = Router();

const upload = multer(uploadConfig);


usersRouter.post('/', async (request, response)=>{
    
    try{

        const {name, email, password} = request.body;

        const creatUser = new CreateUserService();

        const user =  await creatUser.execute({
            name, email, password,
        });        
        delete user.password;
        return response.json(user);
        
    }catch(err){
        return response.status(400).json({error: err.message})
    }
    
});

usersRouter.patch('/avatar',
ensureAuthenticated, 
upload.single('avatar'),async(request, response)=>{
    try {        
        const UpdateUserAvatar = new UpdateUserAvatarService();
        const user = await UpdateUserAvatar.execute({
            user_id: request.user.id,
            avatarFilename: request.file.filename
        });

        delete user.password;

        return response.json(user);
    }catch(err){
        return response.status(400).json({error: err.message})
    }
} )

export default usersRouter;