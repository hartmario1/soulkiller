import useSWR from 'swr';
import { fetchApi } from '../util';
import type { ProxyGroup } from '@soulkiller/common';
import { useProxyGroupStore } from 'stores';
import { useEffect } from 'react';

export const useQueryProxyGroups = (): ProxyGroup[] => {
  const { data, error } = useSWR<ProxyGroup[]>(
    '/api/proxies/groups',
    (url: string) => fetchApi<ProxyGroup[]>(url), { refreshInterval: 5e3 }
  );

  const extraProxys = useProxyGroupStore();

  useEffect(() => {
    if (data) {
      for (const proxyGroup of data) {
        if (extraProxys.proxies.has(proxyGroup.id)) {
          extraProxys.remove(proxyGroup);
        }
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  if (error) { return []; }
  return data?.concat([...extraProxys.proxies.values()]) ?? [];
};
