export async function up(sql) {
  await sql.unsafe('DELETE FROM tasks');
  await sql.unsafe('ALTER TABLE tasks ADD COLUMN category smallint NOT NULL');
}

export async function down(sql) {
  await sql.unsafe('ALTER TABLE tasks DROP COLUMN category');
}
