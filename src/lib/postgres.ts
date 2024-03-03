import { Pool } from "pg";

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "tlc",
  password: "bazepodataka",
  port: 5432,
});

export async function query(text: string, params: any[]) {
  return await pool.query(text, params);
}
