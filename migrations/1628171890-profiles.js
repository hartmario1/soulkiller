export async function up(sql) {
  await sql.unsafe('ALTER TABLE profiles RENAME firts_name TO first_name');
}
