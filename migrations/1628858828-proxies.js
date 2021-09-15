export async function up(sql) {
  await sql.unsafe(`
		CREATE TABLE IF NOT EXISTS proxies (
			user_id bigint NOT NULL REFERENCES users ON DELETE CASCADE,
			ip text NOT NULL,
			port text NOT NULL,
			username text NOT NULL,
			password text NOT NULL,
			proxy_group text NOT NULL,
			PRIMARY KEY (user_id, ip, port)
		);
	`);
}

export async function down(sql) {
  await sql.unsafe('DROP TABLE proxies');
}
