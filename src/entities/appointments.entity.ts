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

  @Column()
  createdAt: string;

  @Column()
  createdBy: string;

  @Column()
  doctorId: string;

  @Column()
  symptoms: string;

  @Column()
  slotId: string;

  @Column()
  doctorName: string;

  @Column()
  doctorImage: string;

  @Column()
  patientImage: string;

  @Column()
  patientName: string;

  @Column()
  updatedAt: string;

  @Column()
  isExist: string;

  @Column()
  connectyCubeId: string;


  static fromJSON(json: Record<string, any>): Appointments {
    const appointments = new Appointments();
    appointments.id = json?.id;
    appointments.appointmentDate = json?.appointmentDate;
    appointments.appointmentStatus = json?.appointmentStatus;
    appointments.appointmentType = json?.appointmentType;
    appointments.connectyCubeId = json?.connectyCubeId;
    appointments.createdAt = json?.createdAt;
    appointments.createdBy = json?.createdBy;
    appointments.doctorId = json?.doctorId;
    appointments.doctorImage = json?.doctorImage;
    appointments.doctorName = json?.doctorName;
    appointments.isExist = json?.isExist;
    appointments.patientId = json?.patientId;
    appointments.patientImage = json?.patientImage;
    appointments.patientName = json?.patientName;
    appointments.slotId = json?.slotId;
    appointments.slotTime = json?.slotTime;
    appointments.symptoms = json?.symptoms;
    appointments.updatedAt = json?.updatedAt;
    return appointments;
    
  }
}
