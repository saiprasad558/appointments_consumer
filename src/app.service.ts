import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Kafka } from 'kafkajs';
import { Repository } from 'typeorm';
import { Appointments } from './entities/appointments.entity';

@Injectable()
export class AppService {
  private kafka: Kafka;

  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(Appointments)
    private readonly appointmentsRepository: Repository<Appointments>,
  ) {
    this.kafka = new Kafka({
      clientId: configService.get<string>('kafka.clientId'),
      brokers: configService.get<string[]>('kafka.brokers'),
    });
  }

  async ingestData() {
    await Promise.all([
      this.ingestAppointments(),
    ]);
    console.log('Data ingestion successful');
  }
  private async ingestAppointments(){
    const topicName = 'appoinments';
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
        const appointments = Appointments.fromJSON(value);
        if (operation === 'create') {
          await this.appointmentsRepository.save(appointments);
        } else if (operation === 'update') {
          await this.appointmentsRepository.update(id, appointments);
        } else if (operation === 'delete') {
          await this.appointmentsRepository.delete(id);
        }
      },
    });

    consumer.seek({
      topic: topicName,
      partition: 0,
      offset: '0',
    });

  }
 
}
