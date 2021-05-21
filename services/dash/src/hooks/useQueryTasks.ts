import useSWR from 'swr';
import { fetchApi } from '../util';
import type { Task } from '@soulkiller/common';

export const useQueryTasks = (): Task[] => {
  const { data, error } = useSWR<Task[]>(
    '/api/tasks',
    (url: string) => fetchApi<Task[]>(url), { refreshInterval: 5e3 }
  );

  if (error) return [];
  return data ?? [];
};
