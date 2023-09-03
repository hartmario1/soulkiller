import create, { State } from 'zustand';
import type { TaskGroup } from '@soulkiller/common';


export interface TaskGroupState extends State {
  tasks: Map<number, TaskGroup>;
  add: (task: TaskGroup) => void;
  remove: (task: TaskGroup) => void;
  clear: () => void;
}

export const useTaskGroupStore = create<TaskGroupState>(
  set => ({
    tasks: new Map(),
    add: task => set(state => ({ tasks: state.tasks.set(task.id, task) })),
    remove: task => set(state => {
      state.tasks.delete(task.id);
      return {
        tasks: state.tasks
      };
    }),
    clear: () => set(state => {
      state.tasks.clear();
      return {
        tasks: state.tasks
      };
    })
  })
);
