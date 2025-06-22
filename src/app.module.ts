import { Module } from '@nestjs/common'; //모듈단위임을 선언
import { KafkaModule } from './kafka/kafka.module';
import { DetectionModule } from './detection/detection.module';

@Module({
  imports: [KafkaModule, DetectionModule], //앱 모듈안에 카프카 모듈과 탐지 모듈을 임포트
})
export class AppModule {}
