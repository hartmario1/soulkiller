import { ApiUserData, NonNullUserState, UserState, useUserStore } from '../stores';
import useSWR from 'swr';
import { fetchApi } from '../util';
import { useEffect } from 'react';

export const useQueryMe = (): UserState | NonNullUserState | null => {
  const { data, error } = useSWR<ApiUserData>(
    '/api/users/@me',
    (url: string) => fetchApi<ApiUserData>(url), { refreshInterval: 3e4 }
  );

  const user = useUserStore();
  useEffect(() => {
    if (data) {
      user.login();
      user.setUser(data);
    }
  }, [data]); // eslint-disable-line react-hooks/exhaustive-deps

  if (error) { return null; }

  return user;
};
