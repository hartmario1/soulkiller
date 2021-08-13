import create, { State } from 'zustand';
import type { Profile } from '@soulkiller/common';


export interface ProfileState extends State {
  profiles: Map<string, Profile>;
  add: (profile: Profile) => void;
  remove: (profile: Profile) => void;
  clear: () => void;
}

export const useProfilesStore = create<ProfileState>(
  set => ({
    profiles: new Map(),
    add: task => set(state => ({ profiles: state.profiles.set(task.profile_name, task) })),
    remove: task => set(state => {
      state.profiles.delete(task.profile_name);
      return {
        profiles: state.profiles
      };
    }),
    clear: () => set(state => {
      state.profiles.clear();
      return {
        profiles: state.profiles
      };
    })
  })
);
