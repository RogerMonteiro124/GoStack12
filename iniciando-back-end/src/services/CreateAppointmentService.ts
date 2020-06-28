import Appointment from '../models/Appointments';
import {getCustomRepository} from 'typeorm'
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import {startOfHour} from 'date-fns';
interface Request{
    provider: String,
    date: Date;
}

class CreateAppointmentService {

    public async execute({date, provider}: Request): Promise<Appointment>{
        
        const appointmentsRepository = getCustomRepository(AppointmentsRepository);

        const appointmentDate = startOfHour(date);
        
        const findAppointmentsInSameDate =  await appointmentsRepository.findByDate(appointmentDate);
    
        if(findAppointmentsInSameDate){
            throw Error('This appointment is already booked');            
        }
        const appointment = appointmentsRepository.create({
            provider,
            date: appointmentDate,
        });

        await appointmentsRepository.save(appointment);

        return appointment;
    }
}

export default CreateAppointmentService;