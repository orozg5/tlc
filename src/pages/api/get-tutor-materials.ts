import { NextApiRequest, NextApiResponse } from "next";
import { query } from "@/lib/postgres";
import { getMe } from "@/utils/getMe";

/**
 * @swagger
 * /api/get-tutor-materials:
 *   get:
 *     responses:
 *       200:
 *         description: Successfully got current tutors materials.
 *       500:
 *         description: Internal server error.
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const userData = await getMe(req);
    const id = userData?.id;

    const materials = await query("SELECT * FROM materials WHERE instructor_id = $1", [id]);

    res.status(200).json(materials.rows);
  } catch (error) {
    res.status(500).json({ message: "Internal server error." });
  }
}
