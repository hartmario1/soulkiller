import useSWR from 'swr';
import { fetchApi } from '../util';
import type { TaskGroup } from '@soulkiller/common';
import { useTaskGroupStore } from 'stores';
import { useEffect } from 'react';

export const useQueryTaskGroups = (): TaskGroup[] => {
  const { data, error } = useSWR<TaskGroup[]>(
    '/api/tasks/groups',
    (url: string) => fetchApi<TaskGroup[]>(url), { refreshInterval: 5e3 }
  );

  const extraTasks = useTaskGroupStore();

  useEffect(() => {
    if (data) {
      for (const taskGroup of data) {
        if (extraTasks.tasks.has(taskGroup.id)) {
          extraTasks.remove(taskGroup);
        }
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  if (error) { return []; }
  return data?.concat([...extraTasks.tasks.values()]) ?? [];
};
