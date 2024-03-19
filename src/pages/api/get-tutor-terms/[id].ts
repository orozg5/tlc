import { NextApiRequest, NextApiResponse } from "next";
import { query } from "@/lib/postgres";

/**
 * @swagger
 * /api/get-tutor-terms:
 *   get:
 *     responses:
 *       200:
 *         description: Successfully got tutor terms.
 *       500:
 *         description: Internal server error.
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { id } = req.query;
    const terms = await query("SELECT * FROM terms WHERE instructor_id = $1 and reserved = $2", [id, false]);

    res.status(200).json(terms.rows);
  } catch (error) {
    res.status(500).json({ message: "Internal server error." });
  }
}
