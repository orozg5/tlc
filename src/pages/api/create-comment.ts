import { NextApiRequest, NextApiResponse } from "next";
import { query } from "@/lib/postgres";

/**
 * @swagger
 * /api/create-comment:
 *   patch:
 *     responses:
 *       200:
 *         description: Comment created successfully.
 *       500:
 *         description: Internal server error.
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { user_id, forum_category_id, forum_post_id, content } = req.body;

    await query(
      `INSERT INTO forum_comments (user_id, date, forum_comment_content, forum_category_id, forum_post_id) VALUES ($1, CURRENT_TIMESTAMP, $2, $3, $4)`,
      [user_id, content, forum_category_id, forum_post_id]
    );

    res.status(200).json({ message: "Comment created successfully." });
  } catch (error) {
    res.status(500).json({ message: "Internal server error." });
  }
}
