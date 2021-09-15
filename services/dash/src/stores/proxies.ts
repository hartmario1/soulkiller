import create, { State } from 'zustand';
import type { ApiGetProxyResult } from '@soulkiller/common';

type ExtractArrayT<T> = T extends (infer E)[] ? E : never;
export type ProxyWithStatus = ExtractArrayT<ApiGetProxyResult>;

export interface ProxyState extends State {
  proxies: Map<`${string}:${string}`, ProxyWithStatus>;
  add: (proxy: ProxyWithStatus) => void;
  remove: (proxy: ProxyWithStatus) => void;
  clear: () => void;
}

export const useProxiesStore = create<ProxyState>(
  set => ({
    proxies: new Map(),
    add: proxy => set(state => ({ proxies: state.proxies.set(`${proxy.ip}:${proxy.port}`, proxy) })),
    remove: proxy => set(state => {
      state.proxies.delete(`${proxy.ip}:${proxy.port}`);
      return {
        proxies: state.proxies
      };
    }),
    clear: () => set(state => {
      state.proxies.clear();
      return {
        proxies: state.proxies
      };
    })
  })
);
