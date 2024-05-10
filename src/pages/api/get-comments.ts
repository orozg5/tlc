import { NextApiRequest, NextApiResponse } from "next";
import { query } from "@/lib/postgres";
import { getMe } from "@/utils/getMe";

/**
 * @swagger
 * /api/get-comments:
 *   get:
 *     responses:
 *       200:
 *         description: Successfully got current tutor comments.
 *       500:
 *         description: Internal server error.
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const userData = await getMe(req);
    const id = userData?.id;

    const rated = await query("SELECT * FROM student_comments WHERE instructor_id = $1 ORDER BY date DESC", [id]);

    res.status(200).json(rated.rows);
  } catch (error) {
    res.status(500).json({ message: "Internal server error." });
  }
}
