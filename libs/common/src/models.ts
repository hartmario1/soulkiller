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
  supreme,
  snkrs,
  bodega,
  shoepalace,
  undefeated
}

export enum Status {
  idle,
  stopped,
  checkingOut,
  done
}

export interface Task {
  id: number;
  user_id: `${bigint}`;
  store: Store;
  name: string;
  profile: number;
  proxy: number;
  size: number;
  created_at: Date;
  status: Status;
  recurring: boolean;
}
