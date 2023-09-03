import { Page } from 'puppeteer';
import { JobStatus, TaskRunner } from '../TaskRunner';
import { EventType, Message } from '../workerTypes';
import { parentPort } from 'worker_threads';
import { Category, Task } from '@soulkiller/common';
import levenshtein from 'js-levenshtein';

export interface Serialized {
  keywords: string[];
  href: string;
}

export class SupremeRunner extends TaskRunner {
  private getCategory(category: Category) {
    switch (category) {
      case Category.all: {
        return 'all';
      }
      case Category.new: {
        return 'new';
      }
      case Category.jackets: {
        return 'all/jackets';
      }
      case Category.shirts: {
        return 'all/shirts';
      }
      case Category.topsOrSweaters: {
        return 'all/tops_sweaters';
      }
      case Category.sweatshirts: {
        return 'all/sweatshirts';
      }
      case Category.pants: {
        return 'all/pants';
      }
      case Category.tShirts: {
        return 'all/t-shirts';
      }
      case Category.hats: {
        return 'all/hats';
      }
      case Category.bags: {
        return 'all/bags';
      }
      case Category.accessories: {
        return 'all/accessories';
      }
      case Category.skate: {
        return 'all/skate';
      }
    }
  }

  protected async *doJobs(task: Task, page: Page) {
    try {
      await page.goto(`https://www.supremenewyork.com/shop/${this.getCategory(task.category)}`);
      yield JobStatus.ok;

      const [container] = await page.$x('//*[@id="container"]');
      const searchKeywords = task.name.toLowerCase().split(' ');
      const nodes: { keywords: string[]; href: string }[] = await container!
        .$$eval(
          '.inner-article',
          nodes => nodes.map(node => ({
            // @ts-expect-error
            keywords: node.innerText
              .trim()
              .toLowerCase()
              .replaceAll(/®|\//g, '')
              .replaceAll(/( +)|\n/g, ' ')
              .replaceAll('  ', ' ')
              .split(' '),
            // @ts-expect-error
            href: node.children[0]!.href
          }))
        );

      const found = nodes.reduce<Serialized & { lev?: number }>((acc, { keywords, href }) => {
        const getLev = (keywords: string[]) => {
          let lev = 0;

          for (let i = 0; i < Math.max(keywords.length, searchKeywords.length); i++) {
            const keyword = keywords[i];

            const searchKeyword = searchKeywords[i];

            if (keyword && searchKeyword) {
              lev += levenshtein(keyword, searchKeyword);
            }
          }
          return lev;
        };

        const lev = getLev(keywords);

        if (lev < (acc.lev ??= getLev(acc.keywords))) {
          return {
            keywords,
            href,
            lev
          };
        }
        return acc;
      }, nodes[0]!);
      yield JobStatus.ok;

      await page.goto(found.href);
      console.log('on item page');

      await page.screenshot({
        path: './screenshots/screeshot.png',
        fullPage: true
      });

      await page.type('#size', 'Large');

      await page.screenshot({
        path: './screenshots/shot.png',
        fullPage: true
      });

      await page.click('[name="commit"]');
      console.log('going to purchase');

      // make time based on user input
      await page.waitForTimeout(1000);

      await page.goto('https://www.supremenewyork.com/checkout');
      await page.type('#order_billing_name', 'Mario');
      await page.type('#order_email', 'mariohart@gmail.com');
      await page.type('#order_tel', '0732057756');
      await page.type('#order_billing_address', 'Macesului 9, Bl.A20, Sc.F, Ap.24');
      await page.type('#order_billing_city', 'Brasov');
      await page.type('#order_billing_zip', '500256');
      await page.type('#order_billing_country', 'ROMANIA');
      await page.type('#credit_card_number', '0000 0000 0000 0000');
      await page.type('#credit_card_verification_value', '000');
      await page.type('#credit_card_year', '2023');
      const [month] = await page.$x('//*[@id="credit_card_month"]');
      await month!.type('04');
      console.log('finished purchase form');

      await page.click('[id="order_terms"]');

      yield JobStatus.ok;
      await page.click('[name="commit"]');

      await page.screenshot({
        path: './screenshots/shot.png',
        fullPage: true
      });
      console.log('done');
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
}
