import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity({ name: 'appointments' })
export class Appointment {
  @PrimaryColumn()
  id: string;

  @Column()
  appointmentType: string;

  @Column()
  appointmentStatus: boolean;

  @Column()
  patientId: string;

  @Column({ type: 'date' })
  appointmentDate: Date;

  @Column()
  slotTime: string;

  @Column()
  createdAt: Date;

  @Column()
  createdBy: string;

  @Column()
  doctorId: string;

  @Column()
  symptoms: string;

  @Column()
  slotId: string;

  @Column({ nullable: true })
  updatedAt: Date | null;

  @Column({ nullable: true })
  isExist: boolean | null;

  static dateFunction(date?: string) {
    if (date && !isNaN(Date.parse(date))) {
      return new Date(date);
    }
    return null;
  }
  static fromJSON(json: Record<string, any>): Appointment {
    const appointments = new Appointment();
    appointments.id = json?.id;
    appointments.appointmentDate = json?.appointmentDate;
    appointments.appointmentStatus = json?.appointmentStatus ?? false;
    appointments.appointmentType = json?.appointmentType ?? '';
    // appointments.connectyCubeId = json?.connectyCubeId ?? '';
    appointments.createdAt = json?.createdAt
      ? this.dateFunction(json?.createdAt)
      : new Date();
    appointments.createdBy = json?.createdBy ?? '';
    appointments.doctorId = json?.doctorId ?? '';
    // appointments.doctorImage = json?.doctorImage ?? '';
    // appointments.doctorName = json?.doctorName ?? '';
    appointments.isExist = json?.isExist ?? false;
    appointments.patientId = json?.patientId ?? '';
    // appointments.patientImage = json?.patientImage ?? '';
    // appointments.patientName = json?.patientName ?? '';
    appointments.slotId = json?.slotId ?? '';
    appointments.slotTime = json?.slotTime ?? '';
    appointments.symptoms = json?.symptoms ?? '';
    appointments.updatedAt = this.dateFunction(json?.updatedAt);
    return appointments;
  }
}
