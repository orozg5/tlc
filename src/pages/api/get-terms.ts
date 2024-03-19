import { NextApiRequest, NextApiResponse } from "next";
import { query } from "@/lib/postgres";

/**
 * @swagger
 * /api/get-terms:
 *   get:
 *     responses:
 *       200:
 *         description: Successfully got all of the terms.
 *       500:
 *         description: Internal server error.
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const terms = await query("SELECT * FROM terms", []);

    res.status(200).json(terms.rows);
  } catch (error) {
    res.status(500).json({ message: "Internal server error." });
  }
}
