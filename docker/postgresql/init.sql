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
