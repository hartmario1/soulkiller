import 'reflect-metadata';

// Begin data collection
import { collectDefaultMetrics } from 'prom-client';

collectDefaultMetrics();

import createLogger from '@soulkiller/logger';
import postgres from 'postgres';
import { initConfig, kSql } from '@soulkiller/injection';
import { Worker, isMainThread, parentPort } from 'worker_threads';
import { Status, Store, Task } from '@soulkiller/common';
import { EventType, kBrowser, Message } from './workerTypes';
import puppeteer from 'puppeteer';
import { container } from 'tsyringe';
import { SupremeRunner } from './tasks/Supreme';
import { TaskRunner } from './TaskRunner';

void (async () => {
  const config = initConfig();

  if (isMainThread) {
    const logger = createLogger('JOB-CHECKER');
    const sql = postgres(config.dbUrl, {
      onnotice: notice => logger.debug(JSON.stringify(notice, null, 2), { topic: 'DB NOTICE' })
    });

    const WORKER_COUNT = 4;
    const workers = Array<Worker>(WORKER_COUNT).fill(new Worker(__filename));
    const taskWorkers = new Map<number, number>();
    let i = 0;
    const getWorker = (): [number, Worker] => {
      const index = ++i;

      if (index === WORKER_COUNT) {
        i = 0;
        return [0, workers[0]!];
      }

      return [i, workers[i]!];
    };

    for (const worker of workers) {
      worker.on('message', (message: Message) => {
        switch (message.type) {
          case EventType.log: {
            logger[message.data.type]!(message.data.data, message.data.message);
            break;
          }

          default: {
            break;
          }
        }
      });
    }

    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    setInterval(async () => {
      const tasks = await sql<Task[]>`SELECT * FROM tasks WHERE status = ${Status.waiting} OR status = ${Status.waitingForCancel}`;

      for (const task of tasks) {
        if (task.status === Status.waiting && !taskWorkers.has(task.id)) {
          const [i, worker] = getWorker();
          const message: Message = {
            type: EventType.start,
            data: task
          };

          taskWorkers.set(task.id, i);
          worker.postMessage(message);
        } else if (task.status === Status.waitingForCancel) {
          const message: Message = {
            type: EventType.cancel,
            data: {
              id: task.id
            }
          };

          const worker = taskWorkers.has(task.id)
            ? workers[taskWorkers.get(task.id)!]!
            : getWorker()[1];

          worker.postMessage(message);
        }
      }
    }, 15e3).unref();
  } else {
    const sql = postgres(config.dbUrl, {
      onnotice: notice => {
        const log: Message = {
          type: EventType.log,
          data: {
            type: 'debug',
            message: JSON.stringify(notice, null, 2),
            data: { topic: 'DB NOTICE' }
          }
        };

        parentPort!.postMessage(log);
      }
    });

    const browser = await puppeteer.launch({
      args: ['--no-sandbox'],
      defaultViewport: { height: 1080, width: 1920 }
    });

    container.register(kSql, { useValue: sql });
    container.register(kBrowser, { useValue: browser });

    const getTask = (data: Task): TaskRunner | null => {
      switch (data.store) {
        case Store.supreme: {
          return new SupremeRunner();
        }

        default: {
          const log: Message = {
            type: EventType.log,
            data: {
              type: 'warn',
              message: 'Unrecognized task store',
              data: { data }
            }
          };

          parentPort!.postMessage(log);
          return null;
        }
      }
    };

    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    parentPort!.on('message', async (message: Message) => {
      switch (message.type) {
        case EventType.start: {
          await sql`UPDATE tasks SET status = ${Status.loading} WHERE id = ${message.data.id}`;
          const task = getTask(message.data);
          await task?.run(message.data);
          break;
        }

        case EventType.cancel: {
          await sql`UPDATE tasks SET status = ${Status.stopped} WHERE id = ${message.data.id}`;
          break;
        }

        default: {
          break;
        }
      }
    });
  }
})();
