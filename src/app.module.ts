import { Module } from '@nestjs/common';
import { KafkaModule } from './kafka/kafka.module';
import { DetectionModule } from './detection/detection.module';

@Module({
  imports: [KafkaModule, DetectionModule],
})
export class AppModule {}
