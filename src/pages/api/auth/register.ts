import { NextApiRequest, NextApiResponse } from "next";
import { query } from "@/lib/postgres";
import hashPass from "@/functions/hashPass";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { role, email, password } = req.body;
    const password_hash = await hashPass(password);

    const result = await query(
      `INSERT INTO users (email, password_hash, role) VALUES ($1, $2, $3)`,
      [email, password_hash, role]
    );

    res.status(200).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
}
