import useSWR from 'swr';
import { fetchApi } from '../util';
import type { ApiGetProxyResult } from '@soulkiller/common';
import { useProxiesStore } from 'stores';
import { useEffect } from 'react';

export const useQueryProxies = (): Record<string, ApiGetProxyResult> => {
  const { data, error } = useSWR<ApiGetProxyResult>(
    '/api/proxies',
    (url: string) => fetchApi<ApiGetProxyResult>(url), { refreshInterval: 5e3 }
  );
  console.log(data);

  const extraProxies = useProxiesStore();

  useEffect(() => {
    if (data) {
      for (const proxy of data) {
        if (extraProxies.proxies.has(`${proxy.ip}:${proxy.port}`)) {
          extraProxies.remove(proxy);
        }
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  if (error) { return {}; }


  return (data?.concat([...extraProxies.proxies.values()]) ?? []).reduce<Record<string, ApiGetProxyResult>>((acc, proxy) => {
    (acc[proxy.proxy_group] ??= []).push(proxy);
    return acc;
  }, {});
};
