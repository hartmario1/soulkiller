export interface Users {
  user_id: `${bigint}`;
  customer_id: string | null;
  email: string;
}

export interface Subscription {
  user_id: `${bigint}`;
  subscription_id: string | null;
}
