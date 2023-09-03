CREATE TABLE IF NOT EXISTS users (
  user_id bigint PRIMARY KEY,
  email text NOT NULL
);

CREATE TABLE IF NOT EXISTS customers (
  user_id bigint PRIMARY KEY REFERENCES users ON DELETE CASCADE,
  customer_id text NOT NULL
);

CREATE TABLE IF NOT EXISTS subscriptions (
  user_id bigint PRIMARY KEY REFERENCES customers ON DELETE CASCADE,
  subscription_id text NOT NULL
);

CREATE TABLE IF NOT EXISTS tasks (
  id SERIAL PRIMARY KEY,
  user_id bigint NOT NULL REFERENCES users ON DELETE CASCADE,
  group_id int NOT NULL REFERENCES task_groups(id) ON DELETE CASCADE,
  store smallint NOT NULL,
  category smallint NOT NULL,
  name text NOT NULL,
  size smallint NOT NULL,
  profile smallint NOT NULL,
  proxy smallint NOT NULL,
  status smallint NOT NULL,
  created_at timestamptz DEFAULT now() NOT NULL,
  recurring boolean NOT NULL
);

CREATE TABLE IF NOT EXISTS profiles (
  profile_name text NOT NULL,
  user_id bigint NOT NULL REFERENCES users ON DELETE CASCADE,
  group_id int NOT NULL REFERENCES profile_groups(id) ON DELETE CASCADE,
  email text NOT NULL,
  first_name text NOT NULL,
  last_name text NOT NULL,
  phone text NOT NULL,
  username text,
  password text,
  address1 text NOT NULL,
  address2 text,
  city text NOT NULL,
  zip int NOT NULL,
  country text NOT NULL,
  state text,
  cname text NOT NULL,
  cnumber text NOT NULL,
  month int NOT NULL,
  year int NOT NULL,
  cvv int NOT NULL,
  PRIMARY KEY (profile_name, user_id)
);

CREATE TABLE IF NOT EXISTS proxies (
  user_id bigint NOT NULL REFERENCES users ON DELETE CASCADE,
  group_id int NOT NULL REFERENCES proxy_groups(id) ON DELETE CASCADE,
  ip text NOT NULL,
  port text NOT NULL,
  username text NOT NULL,
  password text NOT NULL,
  PRIMARY KEY (user_id, ip, port)
);

CREATE TABLE IF NOT EXISTS task_groups (
  user_id bigint NOT NULL REFERENCES users ON DELETE CASCADE,
  id SERIAL UNIQUE NOT NULL,
  name text NOT NULL,
  monitor_delay int NOT NULL,
  retry_delay int NOT NULL,
  PRIMARY KEY (user_id, name)
);

CREATE TABLE IF NOT EXISTS profile_groups (
  user_id bigint NOT NULL REFERENCES users ON DELETE CASCADE,
  id SERIAL UNIQUE NOT NULL,
  name text NOT NULL,
  PRIMARY KEY (user_id, name)
);

CREATE TABLE IF NOT EXISTS proxy_groups (
  user_id bigint NOT NULL REFERENCES users ON DELETE CASCADE,
  id SERIAL UNIQUE NOT NULL,
  name text NOT NULL,
  PRIMARY KEY (user_id, name)
);
