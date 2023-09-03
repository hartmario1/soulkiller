import { Task } from '@soulkiller/common';
import levenshtein from 'js-levenshtein';
import { Page } from 'puppeteer';
import { parentPort } from 'worker_threads';
import { JobStatus, TaskRunner } from '../TaskRunner';
import { EventType, Message } from '../workerTypes';

export interface Serialized {
  keywords: string[];
  href: string;
}

export class UndefeatedRunner extends TaskRunner {
  protected async *doJobs(task: Task, page: Page) {
    try {
      await page.goto('https://undefeated.com/collections/all');
      yield JobStatus.ok;

      const [container] = await page.$x('//*[@id="AjaxinateLoop"]');
      const searchKeywords = task.name.toLowerCase().split(' ');
      const nodes: { keywords: string[]; href: string }[] = await container!
        .$$eval(
          '[class="grid-product__wrapper"]',
          nodes => nodes.map(node => ({
            // @ts-expect-error
            keywords: node.innerText
              .trim()
              .toLowerCase()
              .replaceAll('\n', ' ')
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
      await page.waitForTimeout(2000);
      const [coaie] = await page.$x('//*[@id="globale_popup"]/div/div/div/div/div[2]/div[3]/button');
      await coaie!.click();
      await page.waitForTimeout(2000);

      await page.type('#product-template_un-product-select-option-1', '9');
      await page.waitForTimeout(2000);

      await page.click('#AddToCart--product-template_un');
      await page.waitForTimeout(1000);

      const [cart] = await page.$x('//*[@id="Utility_Nav"]/li[3]');
      await cart!.click();

      await page.waitForTimeout(500);
      await page.click('[name="checkout"]');

      console.log(1);
      await page.waitForTimeout(1000);
      const [email] = await page.$$('#CustomerEmail');
      const [password] = await page.$$('#CustomerPassword');
      await email!.type('mariohart2004@gmail.com', { delay: 35 });
      await password!.type('Lenovo2015@', { delay: 35 });
      await page.keyboard.press('Enter');
      console.log(2);

      // PAGE IFRAME
      await page.waitForTimeout(5000);
      const [checkoutContainer] = await page.$x('//*[@id="checkoutContainer"]');
      const pageFrame = await checkoutContainer!.$('iframe');
      const iframeFocus = await pageFrame!.contentFrame();

      // INFORMATION FILLING
      const [address] = await iframeFocus!.$x('//*[@id="CheckoutData_BillingAddress1"]');
      await address!.type('111');

      const [city] = await iframeFocus!.$x('//*[@id="BillingCity"]');
      await city!.type('111');

      const [zip] = await iframeFocus!.$x('//*[@id="BillingZIP"]');
      await zip!.type('111');

      const [phone] = await iframeFocus!.$x('//*[@id="CheckoutData_BillingPhone"]');
      await phone!.type('111');

      // CARD IFRAME
      const [cardContainer] = await iframeFocus!.$x('//*[@id="ccWrapper"]');
      const cardFrame = await cardContainer!.$('iframe');
      const cardFrameFocus = await cardFrame!.contentFrame();

      // CREDIT CARD FILL
      const [ccNum] = await cardFrameFocus!.$x('//*[@id="cardNum"]');
      await ccNum!.type('0000000000000000');

      const [ccMo] = await cardFrameFocus!.$x('//*[@id="cardExpiryMonth"]');
      await ccMo!.type('111');

      const [ccYear] = await cardFrameFocus!.$x('//*[@id="cardExpiryYear"]');
      await ccYear!.type('2023');

      const [ccCvv] = await cardFrameFocus!.$x('//*[@id="cvdNumber"]');
      await ccCvv!.type('111');

      // place order
      await iframeFocus!.click('#btnPay');
      console.log('on item page');
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
