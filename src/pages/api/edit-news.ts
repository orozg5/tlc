import { NextApiRequest, NextApiResponse } from "next";
import { query } from "@/lib/postgres";

/**
 * @swagger
 * /api/edit-news:
 *   patch:
 *     responses:
 *       200:
 *         description: Successfully edited the news.
 *       500:
 *         description: Internal server error.
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { newsId, news } = req.body;
    const {news_name, description, end_date} = news;

    await query("UPDATE news SET news_name = $2, description = $3, end_date = $4 WHERE news_id = $1", [
      newsId,
      news_name,
      description,
      end_date,
    ]);

    res.status(200).json({ message: "Successfully edited the news." });
  } catch (error) {
    res.status(500).json({ message: "Internal server error." });
  }
}
