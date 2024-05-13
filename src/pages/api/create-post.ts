import { NextApiRequest, NextApiResponse } from "next";
import { query } from "@/lib/postgres";

/**
 * @swagger
 * /api/create-post:
 *   patch:
 *     responses:
 *       200:
 *         description: Post created successfully.
 *       500:
 *         description: Internal server error.
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { user_id, name, content, forum_category_id } = req.body;

    await query(
      `INSERT INTO forum_posts (forum_post_name, user_id, date, forum_post_content, forum_category_id) VALUES ($1, $2, CURRENT_TIMESTAMP, $3, $4)`,
      [name, user_id, content, forum_category_id]
    );

    res.status(200).json({ message: "Post created successfully." });
  } catch (error) {
    res.status(500).json({ message: "Internal server error." });
  }
}
