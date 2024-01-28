import type { IpcHandler, ShellHandler } from '../main/preload';

declare global {
  interface Window {
    ipc: IpcHandler
    shell: ShellHandler
  }
}
