import { NextApiRequest, NextApiResponse } from "next";
import { query } from "@/lib/postgres";

/**
 * @swagger
 * /api/get-all-news:
 *   get:
 *     responses:
 *       200:
 *         description: Successfully got all of the news.
 *       500:
 *         description: Internal server error.
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const news = await query("SELECT * FROM news", []);

    res.status(200).json(news.rows);
  } catch (error) {
    res.status(500).json({ message: "Internal server error." });
  }
}
