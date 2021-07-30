import useSWR from 'swr';
import { fetchApi } from '../util';
import type { Task } from '@soulkiller/common';
import { useTasksStore } from 'stores';
import { useEffect } from 'react';

export const useQueryTasks = (): Task[] => {
  const { data, error } = useSWR<Task[]>(
    '/api/tasks',
    (url: string) => fetchApi<Task[]>(url), { refreshInterval: 5e3 }
  );

  const extraTasks = useTasksStore();

  useEffect(() => {
    if (data) {
      for (const task of data) {
        if (extraTasks.tasks.has(task.id)) {
          extraTasks.remove(task);
        }
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  if (error) return [];
  return data?.concat([...extraTasks.tasks.values()]) ?? [];
};
