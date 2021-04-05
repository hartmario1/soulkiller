/**
 * Copyright (C) Soulkiller App, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by the Soulkiller team <soulkilleroffice@gmail.com>, February 2021
 * @license
 */

import create, { State } from 'zustand';

export interface ApiUserData {
  id: string;
  avatar: string | null;
  email: string;
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
