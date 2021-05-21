export interface User {
  user_id: `${bigint}`;
  email: string;
}

export interface Customer {
  user_id: `${bigint}`;
  customer_id: string;
}

export interface Subscription {
  user_id: `${bigint}`;
  subscription_id: string;
}

export enum Store {
  supreme
}

export enum Status {
  idle,
  canceled,
  failed,
  done
}

export interface Task {
  id: number;
  user_id: `${bigint}`;
  store: Store;
  created_at: Date;
  status: Status;
  recurring: boolean;
}
