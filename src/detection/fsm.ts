import { SyscallEventDto, EventType } from './dto';

export class SyscallFsm {
  private state = 0;

  handleEvent(event: SyscallEventDto): boolean {//이벤트 오면 호출됨,fsm진입점
    switch (this.state) {
      case 0:
        if (event.type === EventType.EVT_MOUNT) { //mount 이벤트가 오면
          console.log(`[FSM] MOUNT: target=${event.data?.mount?.target}`);
          this.state = 1; //상태 1로 전이
        }
        break;
      case 1:
        if (event.type === EventType.EVT_SYMLINKAT) { //symlinkat 이벤트가 오면
          console.log(`[FSM] SYMLINKAT: target=${event.data?.symlinkat?.target}`);
          this.state = 2; //상태 2로 전이
        }
        break;
      case 2: // openat2 이벤트가 오면
        if (event.type === EventType.EVT_OPENAT2) {
          console.log(`[FSM] OPENAT2: filename=${event.data?.openat2?.filename}`);
          console.log(`[ALERT] CVE-2024-23651 Race condition 가능성 탐지됨`);
          this.state = 3; //알림 전송후 상태 3으로 전이
          return true;
        }
        break;
    }
    return false;
  }
}
