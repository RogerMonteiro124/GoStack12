import { Router } from 'express';
import {startOfHour, parseISO} from 'date-fns';
import {getCustomRepository} from 'typeorm';
import CreateAppointmentService from '../services/CreateAppointmentService';
import AppointmentsRepository from '../repositories/AppointmentsRepository';


const appointmentsRouter = Router();

appointmentsRouter.get('/',async (request,response)=>{
    const appointmentsRepositoriy = getCustomRepository(AppointmentsRepository);

    const appointments = await appointmentsRepositoriy.find();

    return response.json(appointments);
})

appointmentsRouter.post('/', async (request, response)=>{
    
    try{
        const { provider, date } = request.body;
    
        const parsedDate = parseISO(date);

        const creatAppointment = new CreateAppointmentService();
    
        const appointment = await creatAppointment.execute({date: parsedDate, provider});
    
        return response.json(appointment)
        
    }catch(err){
        return response.status(400).json({error: err.message})
    }
    
});

export default appointmentsRouter;