import { NextApiRequest, NextApiResponse } from "next";
import { query } from "@/lib/postgres";

/**
 * @swagger
 * /api/get-active-news:
 *   get:
 *     responses:
 *       200:
 *         description: Successfully got all active news.
 *       500:
 *         description: Internal server error.
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const news = await query(
      "SELECT * FROM news WHERE is_active = $1 AND end_date >= CURRENT_TIMESTAMP ORDER BY date DESC LIMIT 4",
      [true]
    );

    res.status(200).json(news.rows);
  } catch (error) {
    res.status(500).json({ message: "Internal server error." });
  }
}
