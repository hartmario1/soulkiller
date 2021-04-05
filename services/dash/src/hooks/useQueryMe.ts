import { ApiUserData, UserState, useUserStore } from 'stores';
import useSWR from 'swr';
import { fetchApi } from '../util';

type RevertNull<T extends Record<string, any>> = {
  [K in keyof T]: T[K] extends infer E | null
    ? (K extends Exclude<K, 'avatar'> ? E : T[K])
    : never
};

export const useQueryMe = () => {
  const { data, error } = useSWR<ApiUserData>('/api/users/@me', (url: string) => fetchApi<ApiUserData>(url), { refreshInterval: 3000 });
  const user = useUserStore();

  if (error) return null;
  if (!data) return null;

  user.setUser(data);
  return user as RevertNull<UserState>;
};
