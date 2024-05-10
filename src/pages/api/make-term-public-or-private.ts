import { NextApiRequest, NextApiResponse } from "next";
import { query } from "@/lib/postgres";

/**
 * @swagger
 * /api/make-term-public-or-private:
 *   patch:
 *     responses:
 *       200:
 *         description: Successfully changed is_public for the term.
 *       500:
 *         description: Internal server error.
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { id } = req.body;

    const isPublic = await query("SELECT is_public FROM terms WHERE term_id = $1", [id]);

    await query("UPDATE terms SET is_public = $2 WHERE term_id = $1", [id, !isPublic.rows[0].is_public]);

    res.status(200).json({ message: "Successfully changed is_public for the term." });
  } catch (error) {
    res.status(500).json({ message: "Internal server error." });
  }
}
