import { NextApiRequest, NextApiResponse } from "next";
import { query } from "@/lib/postgres";

/**
 * @swagger
 * /api/pay-tutor:
 *   patch:
 *     responses:
 *       200:
 *         description: Successfully payed the tutor.
 *       500:
 *         description: Internal server error.
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { productId } = req.body;

    await query("UPDATE terms SET payed = $2 WHERE term_id = $1", [productId, true]);

    res.status(200).json({ message: "Successfully payed the tutor." });
  } catch (error) {
    res.status(500).json({ message: "Internal server error." });
  }
}
