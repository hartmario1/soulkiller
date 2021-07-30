import type { Store, Task } from './models';

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

export type ApiGetTasksBody = Task[];

export interface ApiPutTasksBody {
  store: Store;
  name: string;
  size: number;
  profile: number;
  proxy: number;
  recurring: boolean;
}

export type ApiPutTaskResult = Task;
