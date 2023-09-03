import create, { State } from 'zustand';
import type { ProxyGroup } from '@soulkiller/common';


export interface ProxyGroupState extends State {
  proxies: Map<number, ProxyGroup>;
  add: (proxy: ProxyGroup) => void;
  remove: (proxy: ProxyGroup) => void;
  clear: () => void;
}

export const useProxyGroupStore = create<ProxyGroupState>(
  set => ({
    proxies: new Map(),
    add: proxy => set(state => ({ proxies: state.proxies.set(proxy.id, proxy) })),
    remove: proxy => set(state => {
      state.proxies.delete(proxy.id);
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
