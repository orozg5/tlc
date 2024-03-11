import { NextApiRequest, NextApiResponse } from "next";
import { query } from "@/lib/postgres";

/**
 * @swagger
 * /api/get-instructors:
 *   get:
 *     responses:
 *       200:
 *         description: Successfully got all of the instructors.
 *       500:
 *         description: Internal server error.
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const instructors = await query("SELECT * FROM instructors", []);

    res.status(200).json(instructors.rows);
  } catch (error) {
    res.status(500).json({ message: "Internal server error." });
  }
}
