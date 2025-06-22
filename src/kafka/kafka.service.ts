import { Injectable, OnModuleInit } from '@nestjs/common';
import { Kafka } from 'kafkajs';
import { DetectionService } from '../detection/detection.service';
import { SyscallEventDto } from '../detection/dto';

@Injectable()
export class KafkaService implements OnModuleInit {
  constructor(private readonly detectionService: DetectionService) {}

  async onModuleInit() {
    const kafka = new Kafka({
      clientId: 'ebpf-detector',
      brokers: ['localhost:9092'],
    });

    const consumer = kafka.consumer({ groupId: 'detector-group' });
    await consumer.connect();
    await consumer.subscribe({ topic: 'syscall_events' });

    await consumer.run({
      eachMessage: async ({ message }) => {
        if (message.value) {
          const event: SyscallEventDto = JSON.parse(message.value.toString());
          await this.detectionService.processEvent(event);
        }
      },
    });

    console.log('Kafka Consumer Started');
  }
}
