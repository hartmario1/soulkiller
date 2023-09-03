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
  skate,
  tShirts
}

export enum Status {
  idle,
  stopped,
  failed,
  waiting,
  waitingForCancel,
  loading,
  captcha,
  checkingOut,
  done
}

export interface TaskGroup {
  user_id: `${bigint}`;
  id: number;
  name: string;
  monitor_delay: number;
  retry_delay: number;
}

export interface ProxyGroup {
  user_id: `${bigint}`;
  id: number;
  name: string;
}

export interface ProfileGroup {
  user_id: `${bigint}`;
  id: number;
  name: string;
}

export interface Task {
  id: number;
  user_id: `${bigint}`;
  group_id: number;
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
  group_id: number;
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
  group_id: number;
  ip: string;
  port: string;
  username: string;
  password: string;
}
