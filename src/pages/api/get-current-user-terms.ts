import { NextApiRequest, NextApiResponse } from "next";
import { query } from "@/lib/postgres";
import { getMe } from "@/utils/getMe";

/**
 * @swagger
 * /api/get-current-user-terms:
 *   get:
 *     responses:
 *       200:
 *         description: Successfully got current user terms.
 *       500:
 *         description: Internal server error.
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const userData = await getMe(req);
    const id = userData?.id;
    const role = userData?.role;

    let terms;
    if (role == "tutor"){
      terms = await query("SELECT * FROM terms WHERE instructor_id = $1", [id]);
    } else {
      terms = await query("SELECT * FROM terms WHERE student_id = $1", [id]);
    }
    
    res.status(200).json(terms.rows);
  } catch (error) {
    res.status(500).json({ message: "Internal server error." });
  }
}
