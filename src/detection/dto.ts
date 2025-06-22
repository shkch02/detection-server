export enum EventType {
  EVT_CLONE = 0,
  EVT_UNSHARE = 1,
  EVT_OPENAT2 = 2,
  EVT_CAPSET = 3,
  EVT_MOUNT = 4,
  EVT_PIVOT_ROOT = 5,
  EVT_PTRACE = 6,
  EVT_SETNS = 7,
  EVT_SYMLINKAT = 8
}

export interface CapData {
  effective: number;
  permitted: number;
  inheritable: number;
}

export interface SyscallEventDto {
  pid: number;
  type: EventType;
  ts_ns: number;
  data?: {
    clone?: { flags: number; comm: string };
    unshare?: { flags: number; comm: string };
    openat2?: { comm: string; filename: string };
    mount?: { flags: number; comm: string; source: string; target: string };
    pivot_root?: { comm: string; new_root: string; put_old: string };
    ptrace?: { target_pid: number; request: number; comm: string };
    setns?: { fd: number; nstype: number; comm: string };
    symlinkat?: { comm: string; source: string; target: string };
    capset?: { comm: string; caps: [CapData, CapData] };
  }
}
