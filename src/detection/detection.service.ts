import { Injectable } from '@nestjs/common';
import { SyscallEventDto } from './dto';
import { SyscallFsm } from './fsm';

@Injectable()
export class DetectionService {
  private fsmMap = new Map<number, SyscallFsm>();

  async processEvent(event: SyscallEventDto) {
    let fsm = this.fsmMap.get(event.pid);
    if (!fsm) {
      fsm = new SyscallFsm();
      this.fsmMap.set(event.pid, fsm);
    }

    fsm.handleEvent(event);
  }
}
