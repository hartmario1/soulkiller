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
  created_at timestamptz DEFAULT now() NOT NULL,
  status smallint NOT NULL,
  recurring boolean NOT NULL
);
