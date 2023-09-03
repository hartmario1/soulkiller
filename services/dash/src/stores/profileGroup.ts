import create, { State } from 'zustand';
import type { ProfileGroup } from '@soulkiller/common';


export interface ProfileGroupState extends State {
  profiles: Map<number, ProfileGroup>;
  add: (profile: ProfileGroup) => void;
  remove: (profile: ProfileGroup) => void;
  clear: () => void;
}

export const useProfileGroupStore = create<ProfileGroupState>(
  set => ({
    profiles: new Map(),
    add: profile => set(state => ({ profiles: state.profiles.set(profile.id, profile) })),
    remove: profile => set(state => {
      state.profiles.delete(profile.id);
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
