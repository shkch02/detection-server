import { Module } from '@nestjs/common';
import { KafkaService } from './kafka.service';
import { DetectionModule } from '../detection/detection.module';

@Module({
  imports: [DetectionModule],
  providers: [KafkaService],
})
export class KafkaModule {}
