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
