import Agent from 'https-proxy-agent';
import { Sql } from 'postgres';
import { inject, singleton } from 'tsyringe';
import { kRedis, kSql } from '@soulkiller/injection';
import { Redis } from 'ioredis';
import { RedisStore } from '@cordis/redis-store';
import { Proxy } from '@soulkiller/common';
import fetch from 'node-fetch';
import { Stopwatch } from '@sapphire/stopwatch';

export interface ProxyStatus {
  ping: number;
}

@singleton()
export class Handler {
  public readonly cache = new RedisStore<ProxyStatus>({
    redis: this.redis,
    hash: 'proxy_status',
    decode: status => JSON.parse(status),
    encode: status => JSON.stringify(status)
  });

  public constructor(
    @inject(kSql) public readonly sql: Sql<{}>,
    @inject(kRedis) public readonly redis: Redis
  ) {
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    setInterval(async () => {
      await this.cache.empty();
      return this.populateCache();
    }, 1e4).unref();
  }

  public async getProxyStatus(proxy: Proxy): Promise<ProxyStatus | null> {
    const key = `${proxy.ip}:${proxy.port}`;
    const cached = await this.cache.get(key);

    if (cached) {
      return cached;
    }

    const agent = Agent({ host: proxy.ip, port: proxy.port, auth: `${proxy.username}:${proxy.password}` });

    const stopwatch = new Stopwatch();
    const ok = await fetch('https://google.com', { agent }).then(() => true).catch(() => false);
    const ping = stopwatch.stop().duration;

    if (ok) {
      const data: ProxyStatus = { ping };

      void this.cache.set(key, data);
      return data;
    }

    return null;
  }

  public async populateCache() {
    const proxies = await this.sql<Proxy[]>`SELECT * FROM proxies`;

    for (const proxy of proxies) {
      void this.getProxyStatus(proxy);
    }
  }
}
