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

export interface ApiPatchTaskCancelQuery {
  id: string;
}

export type ApiPatchTaskCancelBody = Task;

export type ApiDeleteTaskQuery = ApiPatchTaskCancelQuery;

export type ApiPatchTaskQuery = ApiPatchTaskCancelQuery;

export interface ApiPatchTaskBody {
  recurring: boolean;
}

export type ApiPatchTaskResult = Task;

export type ApiGetTasksBody = Task[];

export interface ApiPutTasksBody {
  store: Store;
  recurring: boolean;
}

export type ApiPutTaskResult = Task;
