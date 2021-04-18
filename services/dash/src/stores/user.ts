import create, { State } from 'zustand';

export interface ApiUserData {
  id: string;
  avatar: string | null;
  username: string;
  discriminator: string;
  sub: boolean;
}

export type UserData = { [K in keyof ApiUserData]: ApiUserData[K] | null };

interface UserMethods {
  login: () => void;
  logout: () => void;
  setUser: (data: UserData) => void;
}

export interface UserState extends State, UserData, UserMethods {
  loggedIn: boolean | null;
}

export interface NonNullUserState extends State, ApiUserData, UserMethods {
  loggedIn: boolean;
}

export const useUserStore = create<UserState>(
  set => ({
    id: null,
    avatar: null,
    username: null,
    discriminator: null,
    loggedIn: null,
    sub: null,
    login: () => set(() => ({ loggedIn: true })),
    logout: () => set(() => ({ loggedIn: false })),
    setUser: (data: UserData) => set(() => ({ ...data }))
  })
);
