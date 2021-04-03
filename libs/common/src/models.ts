export interface Users {
  user_id: `${bigint}`;
  customer_id: string | null;
}

export interface Subscription {
  user_id: `${bigint}`;
  subscription_id: string | null;
}

export interface Connection {
  user_id: `${bigint}`;
  email: string;
  username: string;
  avatar: string;
}
