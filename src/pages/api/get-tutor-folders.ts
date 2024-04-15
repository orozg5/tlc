import { NextApiRequest, NextApiResponse } from "next";
import { query } from "@/lib/postgres";
import { getMe } from "@/utils/getMe";

/**
 * @swagger
 * /api/get-tutor-folders:
 *   get:
 *     responses:
 *       200:
 *         description: Successfully got current tutors folders.
 *       500:
 *         description: Internal server error.
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const userData = await getMe(req);
    const id = userData?.id;

    const folders = await query("SELECT * FROM folders WHERE instructor_id = $1", [id]);

    res.status(200).json(folders.rows);
  } catch (error) {
    res.status(500).json({ message: "Internal server error." });
  }
}
