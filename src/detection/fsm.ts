import { SyscallEventDto, EventType } from './dto';

export class SyscallFsm {
  private state = 0;

  handleEvent(event: SyscallEventDto): boolean {
    switch (this.state) {
      case 0:
        if (event.type === EventType.EVT_MOUNT) {
          console.log(`[FSM] MOUNT: target=${event.data?.mount?.target}`);
          this.state = 1;
        }
        break;
      case 1:
        if (event.type === EventType.EVT_SYMLINKAT) {
          console.log(`[FSM] SYMLINKAT: target=${event.data?.symlinkat?.target}`);
          this.state = 2;
        }
        break;
      case 2:
        if (event.type === EventType.EVT_OPENAT2) {
          console.log(`[FSM] OPENAT2: filename=${event.data?.openat2?.filename}`);
          console.log(`[ALERT] CVE-2024-23651 Race condition 가능성 탐지됨`);
          this.state = 3;
          return true;
        }
        break;
    }
    return false;
  }
}
