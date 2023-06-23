import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Appointments {
  @PrimaryColumn()
  id: string;

  @Column()
  appointmentType: string;

  @Column()
  appointmentStatus: boolean;

  @Column()
  patientId: string;

  @Column()
  appointmentDate: string;

  @Column()
  slotTime: string;

  @Column({ nullable: true })
  createdAt: Date | null;

  @Column()
  createdBy: string;

  @Column()
  doctorId: string;

  @Column()
  symptoms: string;

  @Column()
  slotId: string;

  @Column({  nullable: true })
  doctorName: string | null;

  @Column({ nullable: true })
  doctorImage: string | null;

  @Column({ nullable: true })
  patientImage: string | null;

  @Column({ nullable: true })
  patientName: string | null;

  @Column({ nullable: true })
  updatedAt: Date | null;

  @Column({ nullable: true })
  isExist: boolean | null;

  @Column({ nullable: true })
  connectyCubeId: string | null;

  static dateFunction (date?:string) {
     if(date &&!isNaN(Date.parse(date)) ){
      return new Date(date)
     }
     return null
  }
  static fromJSON(json: Record<string, any>): Appointments {
    const appointments = new Appointments();
    appointments.id = json?.id;
    appointments.appointmentDate = json?.appointmentDate ?? "";
    appointments.appointmentStatus = json?.appointmentStatus ?? false
    appointments.appointmentType = json?.appointmentType ?? "";
    appointments.connectyCubeId = json?.connectyCubeId ?? "";
    appointments.createdAt = this.dateFunction(json?.createdAt) ;
    appointments.createdBy = json?.createdBy ?? "";
    appointments.doctorId = json?.doctorId ?? "";
    appointments.doctorImage = json?.doctorImage ?? "";
    appointments.doctorName = json?.doctorName ?? "";
    appointments.isExist = json?.isExist ??false;
    appointments.patientId = json?.patientId ?? "";
    appointments.patientImage = json?.patientImage ?? "";
    appointments.patientName = json?.patientName ?? "";
    appointments.slotId = json?.slotId ?? "";
    appointments.slotTime = json?.slotTime ?? "";
    appointments.symptoms = json?.symptoms ?? "";
    appointments.updatedAt = this.dateFunction(json?.updatedAt);
    return appointments;
    
  }
}
