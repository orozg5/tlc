import { NextApiRequest, NextApiResponse } from "next";
import { query } from "@/lib/postgres";
import isSamePass from "@/functions/isSamePass";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { email, password } = req.body;

    const r = await query("SELECT password_hash FROM users WHERE email = $1 && is_active = true", [email]);
    const result = await isSamePass(password, r.rows[0].password_hash);
    
    if (result) {
      res.status(200).json({ message: "User logged in successfully." });
    }
  } catch (error) {
    res.status(500).json({ message: "User doesn't exist. Make sure you verified your account." });
  }
}
