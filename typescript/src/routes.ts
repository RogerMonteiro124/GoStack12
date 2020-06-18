import{ Request, Response} from 'express';
import createuser from './services/CreateUser';

export function helloWorld(req: Request, res: Response){

    const user = createuser({
        name:"Roger", 
        email:"roger@email.com", 
        password:"1234",
        techs:['Node', 'React', 'React Native',
        {title:'Js', experience: 100}]
    });



    return res.json({message:"Hello WOrld"})
}