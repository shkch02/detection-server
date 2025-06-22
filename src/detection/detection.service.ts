import { Injectable } from '@nestjs/common';
import { SyscallEventDto } from './dto';
import { SyscallFsm } from './fsm';

@Injectable()
export class DetectionService {
  private fsmMap = new Map<number, SyscallFsm>(); // 프로세스별 fsm할당 위한 맵 선언

  async processEvent(event: SyscallEventDto) { //카프카에서 시스템콜 이벤트 함수 여기로 넘어옴 
    let fsm = this.fsmMap.get(event.pid); //해당 프로세스의 fsm 존재하는지 확인
    if (!fsm) { //없으면 맵 할당
      fsm = new SyscallFsm();
      this.fsmMap.set(event.pid, fsm);
    }

    fsm.handleEvent(event); //fsm에 이벤트 전달하여 필터링
  }
}
