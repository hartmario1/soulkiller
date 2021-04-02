export interface Customer {
  user_id: `${bigint}`;
  id: string;
}

export interface Subscription {
  user_id: `${bigint}`;
  id: string;
}

export interface Connection {
  user_id: `${bigint}`;
  username: string;
  discriminator: string;
  avatar: string | null;
  access_token: string;
  refresh_token: string | null;
  expires_at: Date;
}
