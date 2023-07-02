import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Kafka } from 'kafkajs';
import { Repository } from 'typeorm';
import { Appointment } from './entities/appointment.entity';

@Injectable()
export class AppService {
  private kafka: Kafka;

  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(Appointment)
    private readonly appointmentsRepository: Repository<Appointment>,
  ) {
    this.kafka = new Kafka({
      clientId: configService.get<string>('kafka.clientId'),
      brokers: configService.get<string[]>('kafka.brokers'),
    });
  }

  async ingestData() {
    await Promise.all([this.ingestAppointments()]);
    console.log('Data ingestion successful');
  }

  private async ingestAppointments() {
    const topicName = 'appointment';
    const consumerGroupId = 'data-ingestion-service-appointments';

    const consumer = this.kafka.consumer({
      groupId: consumerGroupId,
    });

    await consumer.connect();
    await consumer.subscribe({
      topic: topicName,
      fromBeginning: true,
    });
    await consumer.run({
      eachMessage: async ({ message }) => {
        const [operation, id] = message.key.toString().split('#');
        const value = JSON.parse(message.value.toString());
        if (!Appointment.dateFunction(value?.appointmentDate)) {
          console.log(
            `Skipping ${operation} operation for ${id} due to invalid appointmentDate`,
          );
          return;
        }
        const appointment = Appointment.fromJSON(value);
        const data: Record<string, Appointment> = {};
        if (operation === 'create') {
          data[id] = appointment;
        } else if (operation === 'update') {
          data[id] = {
            ...data[id],
            ...appointment,
          };
        } else if (operation === 'delete') {
          delete data[id];
        }

        await this.appointmentsRepository.save(Object.values(data));
      },
    });

    consumer.seek({
      topic: topicName,
      partition: 0,
      offset: '0',
    });
  }
}
