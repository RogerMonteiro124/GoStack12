import { Router } from 'express';
import {startOfHour, parseISO} from 'date-fns';
import AppointmentsRepositoriy from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';


const appointmentsRouter = Router();

const appointmentsRepositoriy = new AppointmentsRepositoriy();

appointmentsRouter.get('/',(request,response)=>{
    const appointments = appointmentsRepositoriy.all();

    return response.json(appointments);
})

appointmentsRouter.post('/',(request, response)=>{
    
    try{
        const { provider, date } = request.body;
    
        const parsedDate = parseISO(date);
    
        const creatAppointment = new CreateAppointmentService(appointmentsRepositoriy);
    
        const appointment = creatAppointment.execute({date: parsedDate, provider});
    
        return response.json(appointment)
        
    }catch(err){
        return response.status(400).json({error: err.message})
    }
    
});

export default appointmentsRouter;