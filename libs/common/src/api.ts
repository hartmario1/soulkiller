import type { Category, Profile, Store, Task } from './models';

export interface APIGetAuthDiscordQuery {
  redirect_uri: string;
}

export interface APIGetAuthDiscordCallbackQuery {
  code: string;
  state: string;
}

export interface APIGetAuthDiscordRefreshBody {
  refresh_token: string;
}

export interface ApiPostPaymentsCreateResult {
  sessionId: string;
}

export interface ApiPostPaymentsPortalResult {
  url: string;
}

export type ApiPatchTaskCancelResults = Task;

export type ApiPatchTaskBody = Partial<ApiPutTasksBody>;

export type ApiPatchTaskResult = Task;

export type ApiGetTasksResult = Task[];

export interface ApiPutTasksBody {
  store: Store;
  category: Category;
  name: string;
  size: number;
  profile: number;
  proxy: number;
  recurring: boolean;
}

export type ApiPutTaskResult = Task;

export type ApiGetProfileResult = Profile[];

export interface ApiPutProfileBody {
  profile_name: string;
  email: string;
  first_name: string;
  last_name: string;
  phone: string;
  username?: string;
  password?: string;
  address1: string;
  address2?: string;
  city: string;
  zip: number;
  country: string;
  state?: string;
  cname: string;
  cnumber: string;
  month: number;
  year: number;
  cvv: number;
}

export type ApiPutProfileResult = Profile;

export type ApiPatchProfileBody = Partial<ApiPutProfileBody>;

export type ApiPatchProfileResult = Profile;
