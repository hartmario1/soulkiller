CREATE TABLE IF NOT EXISTS customers (
  user_id bigint PRIMARY KEY,
  id text UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS subscriptions (
  user_id bigint PRIMARY KEY REFERENCES customers ON DELETE CASCADE,
  id text UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS connections (
  user_id bigint PRIMARY KEY REFERENCES customers ON DELETE CASCADE,
  username text NOT NULL,
  discriminator text NOT NULL,
  avatar text,
  access_token text NOT NULL,
  refresh_token text,
  expires_at timestamp with time zone NOT NULL DEFAULT now()
);
