import { Injectable, OnModuleInit } from '@nestjs/common'; 
import { Kafka } from 'kafkajs';
import { DetectionService } from '../detection/detection.service';
import { SyscallEventDto } from '../detection/dto';

@Injectable()
export class KafkaService implements OnModuleInit { //이 클래스는 서비스 클래스,Nest가 초기화 끝나면 onModuleInit 메서드 실행됨
  // KafkaService는 Kafka와 통신하여 syscall 이벤트를 수신하고 처리하는 역할
  constructor(private readonly detectionService: DetectionService) {} //생성자 , 의존성 주입을 통해 DetectionService를 주입받음

  async onModuleInit() { //모듈 초기화시 실행되는 메서드
    const kafka = new Kafka({ //카프카 클라이언트 생성
      clientId: 'ebpf-detector', //이 클라이언트, 컨슈머의 식별자
      brokers: ['localhost:9092'], //카프카 서버주소
    });

    const consumer = kafka.consumer({ groupId: 'detector-group' }); //카프카 컨슈머 생성, 그룹아이디는 'detector-group'
    await consumer.connect(); //카프카 서버에 연결
    await consumer.subscribe({ topic: 'syscall_events' }); //syscall_events 토픽 구독

    await consumer.run({
      eachMessage: async ({ message }) => { //메세지 수신시마다 실행되는 콜백함수
        if (message.value) { // message.value : 카프카가 보낸 메세지 본문
          const event: SyscallEventDto = JSON.parse(message.value.toString()); // json문자열 -> 자바스크립트 객체 변환
          await this.detectionService.processEvent(event); //탐지서비스로 넘겨서 분석 시작
        }
      },
    });

    console.log('Kafka Consumer Started');
  }
}
