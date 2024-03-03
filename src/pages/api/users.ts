import type { NextApiRequest, NextApiResponse } from "next";
import { query } from "../../lib/postgres";

type Users = {
  email: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Users>) {
  try {
    const result = await query("SELECT email FROM users", []);
    res.status(200).json({ email: result.rows[0].email });
  } catch (err) {
    res.status(500);
  }
}
