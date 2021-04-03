CREATE TABLE IF NOT EXISTS users (
  user_id bigint PRIMARY KEY,
  customer_id text
);

CREATE TABLE IF NOT EXISTS subscriptions (
  user_id bigint PRIMARY KEY REFERENCES users ON DELETE CASCADE,
  subscription_id text
);

CREATE TABLE IF NOT EXISTS connections (
  user_id bigint PRIMARY KEY REFERENCES users ON DELETE CASCADE,
  email text NOT NULL,
  username text NOT NULL,
  avatar text NOT NULL
);
