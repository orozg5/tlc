import { NextApiRequest, NextApiResponse } from "next";
import { query } from "@/lib/postgres";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const hash = req.url?.replace("/api/auth/verify/", "");

  const userQueryResult = await query(`SELECT * FROM verification WHERE verification_hash = $1`, [hash]);
  const user_id = userQueryResult.rows[0].user_id;
  const expiry_date = userQueryResult.rows[0].expiry_date;

  const date = new Date(Date.now());

  await query(`DELETE FROM verification WHERE verification_hash = $1`, [hash]);
  if (expiry_date > date) {
    await query(`UPDATE users SET is_active = true WHERE id = $1`, [user_id]);
  }

  try {
    res.status(200).redirect("/signin");
  } catch (err) {
    res.status(500);
  }
}
