import create, { State } from 'zustand';
import type { Task } from '@soulkiller/common';


export interface TaskState extends State {
  tasks: Map<number, Task>;
  add: (task: Task) => void;
  remove: (task: Task) => void;
  clear: () => void;
}

export const useTasksStore = create<TaskState>(
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
