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
