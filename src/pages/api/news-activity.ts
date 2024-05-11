import { NextApiRequest, NextApiResponse } from "next";
import { query } from "@/lib/postgres";

/**
 * @swagger
 * /api/news-activity:
 *   patch:
 *     responses:
 *       200:
 *         description: Successfully changed is_active for the news.
 *       500:
 *         description: Internal server error.
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { id } = req.body;

    const isActive = await query("SELECT is_active FROM news WHERE news_id = $1", [id]);

    await query("UPDATE news SET is_active = $2 WHERE news_id = $1", [id, !isActive.rows[0].is_active]);

    res.status(200).json({ message: "Successfully changed is_active for the news." });
  } catch (error) {
    res.status(500).json({ message: "Internal server error." });
  }
}
