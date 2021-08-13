import useSWR from 'swr';
import { fetchApi } from '../util';
import type { Profile } from '@soulkiller/common';
import { useEffect } from 'react';
import { useProfilesStore } from 'stores/profiles';

export const useQueryProfiles = (): Profile[] => {
  const { data, error } = useSWR<Profile[]>(
    '/api/profiles',
    (url: string) => fetchApi<Profile[]>(url), { refreshInterval: 5e3 }
  );

  const extraProfiles = useProfilesStore();

  useEffect(() => {
    if (data) {
      for (const task of data) {
        if (extraProfiles.profiles.has(task.profile_name)) {
          extraProfiles.remove(task);
        }
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  if (error) { return []; }
  return data?.concat([...extraProfiles.profiles.values()]) ?? [];
};
