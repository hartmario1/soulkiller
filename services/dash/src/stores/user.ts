import create, { State } from 'zustand';

export interface ApiUserData {
  avatar: string | null;
  username: string;
  discriminator: string;
}

export type UserData = { [K in keyof ApiUserData]: ApiUserData[K] | null };

export interface UserState extends State, UserData {
  loggedIn: boolean | null;
  login: () => void;
  logout: () => void;
  setUser: (data: UserData) => void;
}

export type NonNullUserState = {
  [K in keyof UserState]: UserState[K] extends infer E | null
    ? (K extends Exclude<K, 'avatar'> ? E : UserState[K])
    : never
};

export const useUserStore = create<UserState>(
  set => ({
    id: null,
    avatar: null,
    email: null,
    username: null,
    discriminator: null,
    loggedIn: null,
    login: () => set(() => ({ loggedIn: true })),
    logout: () => set(() => ({ loggedIn: false })),
    setUser: (data: UserData) => set(() => ({ ...data }))
  })
);
