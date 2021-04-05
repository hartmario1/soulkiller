CREATE TABLE IF NOT EXISTS users (
  user_id bigint PRIMARY KEY,
  customer_id text,
  email text NOT NULL
);

CREATE TABLE IF NOT EXISTS subscriptions (
  user_id bigint PRIMARY KEY REFERENCES users ON DELETE CASCADE,
  subscription_id text
);
