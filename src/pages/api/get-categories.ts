import { NextApiRequest, NextApiResponse } from "next";
import { query } from "@/lib/postgres";

/**
 * @swagger
 * /api/get-categories:
 *   get:
 *     responses:
 *       200:
 *         description: Successfully got all of the categories.
 *       500:
 *         description: Internal server error.
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const categories = await query("SELECT * FROM forum_categories ORDER BY forum_category_name", []);

    res.status(200).json(categories.rows);
  } catch (error) {
    res.status(500).json({ message: "Internal server error." });
  }
}
