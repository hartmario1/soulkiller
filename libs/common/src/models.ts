export interface Users {
  user_id: `${bigint}`;
  email: string;
}

export interface Customers {
  user_id: `${bigint}`;
  customer_id: string;
}

export interface Subscription {
  user_id: `${bigint}`;
  subscription_id: string;
}
