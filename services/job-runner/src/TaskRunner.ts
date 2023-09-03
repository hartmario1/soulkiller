import { Status, Task } from '@soulkiller/common';
import { kSql } from '@soulkiller/injection';
import { Sql } from 'postgres';
import { Browser, Page } from 'puppeteer';
import { container } from 'tsyringe';
import { parentPort } from 'worker_threads';
import { EventType, kBrowser, Message } from './workerTypes';
import { AbortController } from 'abort-controller';

export const enum JobStatus {
  ok,
  errored
}

export abstract class TaskRunner {
  public readonly controller = new AbortController();
  public canceled = false;

  public constructor() {
    this.controller.signal.addEventListener('abort', () => {
      this.canceled = true;
    }, { once: true });
  }

  protected abstract doJobs(task: Task, page: Page): AsyncIterableIterator<JobStatus>;

  protected async wrapCall(call: () => Promise<any>) {
    try {
      await call();
      return JobStatus.ok;
    } catch (e: any) {
      const log: Message = {
        type: EventType.log,
        data: {
          type: 'error',
          message: 'Something went wrong when executing a task',
          data: e
        }
      };

      parentPort!.postMessage(log);
      return JobStatus.errored;
    }
  }

  public async run(task: Task) {
    const sql = container.resolve<Sql<{}>>(kSql);
    const browser = container.resolve<Browser>(kBrowser);
    const page = await browser.newPage();

    for await (const status of this.doJobs(task, page)) {
      if (status === JobStatus.ok) {
        continue;
      }

      if (this.canceled) {
        await sql`UPDATE tasks SET status = ${Status.stopped} WHERE id = ${task.id}`;
        break;
      }

      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      if (status === JobStatus.errored) {
        await sql`UPDATE tasks SET status = ${Status.failed} WHERE id = ${task.id}`;
        break;
      }
    }

    await page.close();
  }
}
