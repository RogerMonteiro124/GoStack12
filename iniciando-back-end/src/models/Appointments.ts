import {Entity, Column,
      PrimaryGeneratedColumn,
      CreateDateColumn, 
      UpdateDateColumn, 
      ManyToMany, 
      JoinColumn} from 'typeorm';
import User from './User';

@Entity('appointments')
class Appointment{
    @PrimaryGeneratedColumn('uuid')
    id: String;

    @Column('varchar')
    provider_id: String;

    @ManyToMany(()=>User)
    @JoinColumn({name: 'provider_id'})
    provider: User;

    @Column('timestamp with time zone')
    date: Date;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated: Date;

}

export default Appointment;