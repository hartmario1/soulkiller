import { ApiUserData, NonNullUserState, useUserStore } from '../stores';
import useSWR from 'swr';
import { fetchApi } from '../util';
import { useEffect } from 'react';

export const useQueryMe = () => {
  const { data, error } = useSWR<ApiUserData>(
    '/api/users/@me',
    (url: string) => fetchApi<ApiUserData>(url), {
      refreshInterval: 5000,
      compare: (a, b) => {
        if (!a) {
          return !Boolean(b);
        }

        if (!b) {
          return !Boolean(a);
        }

        return a.username === b.username && a.discriminator === b.discriminator && a.avatar === b.avatar;
      }
    }
  );

  const user = useUserStore();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => data && user.setUser(data), [data]);

  if (error) return null;
  if (!data) return null;

  return user as NonNullUserState;
};
