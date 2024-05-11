import { NextApiRequest, NextApiResponse } from "next";
import { query } from "@/lib/postgres";

/**
 * @swagger
 * /api/add-news:
 *   post:
 *     responses:
 *       200:
 *         description: News added successfully.
 *       500:
 *         description: Internal server error.
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { news_name, description, end_date } = req.body;

    await query(`INSERT INTO news (news_name, description, end_date, date) VALUES ($1, $2, $3, CURRENT_TIMESTAMP)`, [
      news_name,
      description,
      end_date,
    ]);

    res.status(200).json({ message: "News added successfully." });
  } catch (error) {
    res.status(500).json({ message: "Internal server error." });
  }
}
