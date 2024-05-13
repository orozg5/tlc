import { NextApiRequest, NextApiResponse } from "next";
import { query } from "@/lib/postgres";

/**
 * @swagger
 * /api/create-category:
 *   patch:
 *     responses:
 *       200:
 *         description: Category created successfully.
 *       500:
 *         description: Internal server error.
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { user_id, name } = req.body;

    await query(
      `INSERT INTO forum_categories (forum_category_name, user_id, date) VALUES ($1, $2, CURRENT_TIMESTAMP)`,
      [name, user_id]
    );

    res.status(200).json({ message: "Category created successfully." });
  } catch (error) {
    res.status(500).json({ message: "Internal server error." });
  }
}
