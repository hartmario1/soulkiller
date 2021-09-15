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

export enum Category {
  all,
  new,
  jackets,
  shirts,
  topsOrSweaters,
  sweatshirts,
  pants,
  shorts,
  hats,
  bags,
  accessories,
  shoes,
  skate
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
  category: Category;
  name: string;
  profile: number;
  proxy: number;
  size: number;
  created_at: Date;
  status: Status;
  recurring: boolean;
}

export interface Profile {
  user_id: `${bigint}`;
  profile_name: string;
  email: string;
  first_name: string;
  last_name: string;
  phone: string;
  username: string | null;
  password: string | null;
  address1: string;
  address2: string | null;
  city: string;
  zip: number;
  country: string;
  state: string | null;
  cname: string;
  cnumber: string;
  month: number;
  year: number;
  cvv: number;
}

export interface Proxy {
  user_id: `${bigint}`;
  proxy_group: string;
  ip: string;
  port: string;
  username: string;
  password: string;
}
