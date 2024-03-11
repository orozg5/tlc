import { NextApiRequest, NextApiResponse } from "next";
import { query } from "@/lib/postgres";

/**
 * @swagger
 * /api/get-all-instructions:
 *   get:
 *     responses:
 *       200:
 *         description: Successfully got all of the instructions.
 *       500:
 *         description: Internal server error.
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const instructions = await query("SELECT * FROM instructions", []);

    res.status(200).json(instructions.rows);
  } catch (error) {
    res.status(500).json({ message: "Internal server error." });
  }
}
