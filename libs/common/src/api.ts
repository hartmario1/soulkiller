import { ProfileGroup, ProxyGroup, TaskGroup } from '.';
import type { Category, Profile, Proxy, Store, Task } from './models';

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

export type ApiPatchTaskCancelResult = Task;

export type ApiPatchTaskStartResult = Task;

export type ApiPatchTaskBody = Partial<ApiPutTasksBody>;

export type ApiPatchTaskResult = Task;

export type ApiGetTasksResult = Task[];

export interface ApiPutTasksBody {
  group_id: number;
  store: Store;
  category: Category;
  name: string;
  size: number;
  profile: number;
  proxy: number;
  recurring: boolean;
}

export type ApiPutTaskResult = Task;

export type ApiGetTaskGroupResult = TaskGroup[];

export interface ApiPutTaskGroupBody {
  name: string;
  monitor_delay: number;
  retry_delay: number;
}

export type ApiPutTaskGroupResult = TaskGroup;

export type ApiPatchTaskGroupBody = Partial<ApiPutTaskGroupBody>;

export type ApiPatchTaskGroupResult = TaskGroup;


export type ApiGetProxyGroupResult = ProxyGroup[];

export interface ApiPutProxyGroupBody {
  name: string;
}

export type ApiPutProxyGroupResult = ProxyGroup;

export type ApiPatchProxyGroupBody = Partial<ApiPutProxyGroupBody>;

export type ApiPatchProxyGroupResult = ProxyGroup;


export type ApiGetProfileGroupResult = ProfileGroup[];

export interface ApiPutProfileGroupBody {
  name: string;
}

export type ApiPutProfileGroupResult = ProfileGroup;

export type ApiPatchProfileGroupBody = Partial<ApiPutProfileGroupBody>;

export type ApiPatchProfileGroupResult = ProfileGroup;


export type ApiGetProfileResult = Profile[];

export interface ApiPutProfileBody {
  group_id: number;
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

export type ApiGetProxyResult = (Proxy & {ping: number | null})[];

export interface ApiPutProxyBody {
  group_id: number;
  ip: string;
  port: string;
  username: string;
  password: string;
}

export type ApiPutProxyResult = Proxy;

export interface ApiDeleteProxyBody {
  proxy_group?: string | null;
}

export type ApiDeleteProxyResult = Proxy[];
