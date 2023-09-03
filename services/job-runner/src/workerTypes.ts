import { Task } from '@soulkiller/common';
import { Logger, LeveledLogMethod } from 'winston';

type Filtered = { [K in keyof Logger]: Logger[K] extends LeveledLogMethod ? K : never };
type LogLevel = Exclude<Filtered[keyof Filtered], never | undefined>;

export enum EventType {
  log,
  start,
  cancel
}

export type Message =
| { type: EventType.log; data: { type: LogLevel; message: string; data: Record<string, any> } }
| { type: EventType.start; data: Task }
| { type: EventType.cancel; data: { id: number } };

export const kBrowser = Symbol('browser');
