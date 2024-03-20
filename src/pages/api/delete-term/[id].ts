import { NextApiRequest, NextApiResponse } from "next";
import { query } from "@/lib/postgres";

/**
 * @swagger
 * /api/delete-term/[id]:
 *   delete:
 *     responses:
 *       200:
 *         description: Successfully deleted the term.
 *       500:
 *         description: Internal server error.
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { id } = req.query;

    await query("DELETE FROM terms WHERE term_id = $1", [id]);

    res.status(200).json({ message: "Successfully deleted the term." });
  } catch (error) {
    res.status(500).json({ message: "Internal server error." });
  }
}
