import { NextApiRequest, NextApiResponse } from "next";
import { query } from "@/lib/postgres";

/**
 * @swagger
 * /api/get-subjects:
 *   get:
 *     responses:
 *       200:
 *         description: Successfully got all of the subjects.
 *       500:
 *         description: Internal server error.
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const subjects = await query("SELECT * FROM subjects_catalog", []);

    res.status(200).json(subjects.rows);
  } catch (error) {
    res.status(500).json({ message: "Internal server error." });
  }
}
