import Appointment from '../models/Appointments';
import {getCustomRepository} from 'typeorm'
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import {startOfHour} from 'date-fns';

import AppError from '../erros/AppError';
interface Request{
    provider_id: String,
    date: Date;
}

class CreateAppointmentService {

    public async execute({date, provider_id}: Request): Promise<Appointment>{
        
        const appointmentsRepository = getCustomRepository(AppointmentsRepository);

        const appointmentDate = startOfHour(date);
        
        const findAppointmentsInSameDate =  await appointmentsRepository.findByDate(appointmentDate);
    
        if(findAppointmentsInSameDate){
            throw new AppError('This appointment is already booked',400);            
        }
        const appointment = appointmentsRepository.create({
            provider_id,
            date: appointmentDate,
        });

        await appointmentsRepository.save(appointment);

        return appointment;
    }
}

export default CreateAppointmentService;