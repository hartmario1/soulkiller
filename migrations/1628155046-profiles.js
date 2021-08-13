export async function up(sql) {
  await sql.unsafe(`
		CREATE TABLE IF NOT EXISTS profiles (
			profile_name text NOT NULL,
			user_id bigint NOT NULL REFERENCES users ON DELETE CASCADE,
			email text NOT NULL,
			firts_name text NOT NULL,
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
		)
  `);
}

export async function down(sql) {
  await sql.unsafe('DROP TABLE profiles');
}
