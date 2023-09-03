import useSWR from 'swr';
import { fetchApi } from '../util';
import type { ProfileGroup } from '@soulkiller/common';
import { useProfileGroupStore } from 'stores';
import { useEffect } from 'react';

export const useQueryProfileGroups = (): ProfileGroup[] => {
  const { data, error } = useSWR<ProfileGroup[]>(
    '/api/profiles/groups',
    (url: string) => fetchApi<ProfileGroup[]>(url), { refreshInterval: 5e3 }
  );

  const extraProfiles = useProfileGroupStore();

  useEffect(() => {
    if (data) {
      for (const profileGroup of data) {
        if (extraProfiles.profiles.has(profileGroup.id)) {
          extraProfiles.remove(profileGroup);
        }
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  if (error) { return []; }
  return data?.concat([...extraProfiles.profiles.values()]) ?? [];
};
