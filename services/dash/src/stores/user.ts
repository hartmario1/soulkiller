import create, { State } from 'zustand';

export interface UserData {
  id: string | null;
  avatar: string | null;
  email: string | null;
  username: string | null;
}

export interface UserState extends State, UserData {
  loggedIn: boolean | null;
  login: () => void;
  logout: () => void;
  setUser: (data: UserData) => void;
}

export const useUserStore = create<UserState>(
  set => ({
    id: null,
    avatar: null,
    email: null,
    username: null,
    loggedIn: null,
    login: () => set(() => ({ loggedIn: true })),
    logout: () => set(() => ({ loggedIn: false })),
    setUser: (data: UserData) => set(() => ({ ...data }))
  })
);
