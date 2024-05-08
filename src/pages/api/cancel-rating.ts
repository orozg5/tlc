import { NextApiRequest, NextApiResponse } from "next";
import { query } from "@/lib/postgres";

/**
 * @swagger
 * /api/cancel-rating:
 *   patch:
 *     responses:
 *       200:
 *         description: Successfully canceled rating.
 *       500:
 *         description: Internal server error.
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { termId } = req.body;

    await query(
      "UPDATE terms SET rated = $2 WHERE term_id = $1",
      [termId, true]
    );

    res.status(200).json({ message: "Successfully canceled rating." });
  } catch (error) {
    res.status(500).json({ message: "Internal server error." });
  }
}
